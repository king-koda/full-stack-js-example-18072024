import "reflect-metadata";
import { initializeDataSource } from "./data-source.js";
import { ApolloServer } from "@apollo/server";
import resolvers from "./resolver/index.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import typeDefs from "./typeDefs.js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { seedData } from "./utils/seed-data.js";

config();

// ready the DB and data source object for use before starting the application
async function startServer() {
  await initializeDataSource();

  await seedData();
  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/graphql",
  });

  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer);

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.use("/", (req, res) => {
    console.log(`Server ready.`);
  });

  httpServer.listen({ port: parseInt(process.env.PORT ?? "4000") }, () => {
    console.log(`Server ready at :${process.env.PORT ?? "4000"}/graphql`);
  });
}

startServer();

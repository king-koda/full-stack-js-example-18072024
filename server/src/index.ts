import "reflect-metadata";
import { initializeDataSource } from "./data-source";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import fs from "fs";
import path from "path";
import resolvers from "./resolver/index";

// TODO: move to separate file
const __dirname = path.resolve();
const typeDefs = `${fs.readFileSync(__dirname + "/src/schema.graphql")}`;

await initializeDataSource();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 4000 },
});

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import App from "./App";

const urlToUse =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "localhost:4000/graphql"
    : "server-late-meadow-4919.fly.dev/graphql";

const wsUrlToUse =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "ws"
    : "wss";

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wsUrlToUse}://${urlToUse}`,
  })
);

const httpUrlToUse =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http"
    : "https";

const httpLink = new HttpLink({
  uri: `${httpUrlToUse}://${urlToUse}`,
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

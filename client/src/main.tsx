import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:4000", // TODO: replace this in prod
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <div>Hello World</div>
//     </ApolloProvider>
//   );
// };

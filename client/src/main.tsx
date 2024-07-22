import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation,
} from "@apollo/client";
import { UPDATE_POST } from "./components/graphql/post.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // TODO: replace this in prod
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetPosts {
//         getPosts {
//           id
//           title
//           content
//         }
//       }
//     `,
//   })
//   .then((result) => {
//     console.log(result);
//     console.log("hi");
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err));
//     console.log("bye");
//   });

// client.mutate({
//   mutation: UPDATE_POST,
//   variables: { id: 1, title: "new title", content: "new content" },
// });

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

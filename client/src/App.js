import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ExistingUserProvider from "./utils/existingUserContext";

import HomePage from "./pages/Home/HomePage.js";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
    <>
        <ApolloProvider client={client}>
          <ExistingUserProvider>
            <HomePage />
            <h1 class="text-3xl font-bold underline">
              Hello world!
            </h1>            
          </ExistingUserProvider>
        </ApolloProvider>
    </>
  );
}

export default App;

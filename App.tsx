import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apolloClient";
import Apollo from "./src/component/Apollo";

const App = () => {
  return(
  <ApolloProvider client={client}>
    <Apollo/>
  </ApolloProvider>
  );
};

export default App;
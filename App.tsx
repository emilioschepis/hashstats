import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import client from "./src/graphql/client";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationTheme } from "./src/styles/Themes";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={NavigationTheme}>
        <StatusBar style="auto" />
        <TabNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

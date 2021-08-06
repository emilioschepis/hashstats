import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationTheme } from "./src/styles/Themes";

const App = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <StatusBar style="auto" />
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;

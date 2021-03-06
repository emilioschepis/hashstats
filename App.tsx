import { ApolloProvider } from "@apollo/client";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_900Black } from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { FavoritesProvider } from "./src/context/FavoritesContext";
import { UsernameProvider } from "./src/context/UsernameContext";
import client from "./src/graphql/client";
import TabNavigator from "./src/navigation/TabNavigator";
import CommonStyles from "./src/styles/CommonStyles";
import { NavigationTheme } from "./src/styles/Themes";

dayjs.extend(relativeTime);

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={NavigationTheme}>
        <UsernameProvider>
          <FavoritesProvider>
            <StatusBar style="auto" />
            <TabNavigator />
          </FavoritesProvider>
        </UsernameProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useUsername } from "../context/UsernameContext";
import HomeScreen from "../screens/HomeScreen";
import UsernameScreen from "../screens/UsernameScreen";
import CommonStyles from "../styles/CommonStyles";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const { loading, username } = useUsername();

  if (loading) {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {username ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Username" component={UsernameScreen} />
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;

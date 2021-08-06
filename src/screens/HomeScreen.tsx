import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useUserQuery } from "../graphql/generated";
import CommonStyles from "../styles/CommonStyles";

const HomeScreen = () => {
  const { loading, data } = useUserQuery({ variables: { username: "emilioschepis" } });

  if (loading || !data) {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello, {data.user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

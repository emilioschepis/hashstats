import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useUsername } from "../context/UsernameContext";

const UsernameScreen = () => {
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const { setUsername } = useUsername();
  const [usernameText, setUsernameText] = useState("");

  const handleEndEditing = () => {
    if (usernameText.trim().length > 0) {
      setUsername?.(usernameText.trim().toLowerCase());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Hashstats</Text>
      <Text style={styles.usernameText}>Please insert your Hashnode username to view posts and statistics.</Text>
      <TextInput
        ref={inputRef}
        placeholder="Your username"
        value={usernameText}
        autoCorrect={false}
        style={[{ borderColor: theme.colors.primary }, styles.usernameInput]}
        onChangeText={setUsernameText}
        onEndEditing={handleEndEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "Inter_900Black",
    textAlign: "center",
    color: "#333333",
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 16,
  },
  usernameInput: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
});

export default UsernameScreen;

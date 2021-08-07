import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "../context/FavoritesContext";

export type FavoritesItemProps = {
  username: string;
  onSelect: () => void;
};

const FavoritesItem = ({ username, onSelect }: FavoritesItemProps) => {
  const theme = useTheme();
  const { removeFavorite } = useFavorites();

  return (
    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1.0 })} onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.usernameText}>{username}</Text>
        <View style={styles.iconsContainer}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }, styles.favoritesButton]}
            onPress={() => removeFavorite(username)}
          >
            <Ionicons name="star" size={24} color={theme.colors.primary} />
          </Pressable>
          <Ionicons name="chevron-forward" size={24} color="#333333" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  usernameText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
  },
  favoritesButton: {
    marginRight: 8,
  },
});

export default FavoritesItem;

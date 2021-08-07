import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";

import { useFavorites } from "../context/FavoritesContext";

export type FavoriteButtonProps = {
  username: string;
};

const FavoriteButton = ({ username }: FavoriteButtonProps) => {
  const theme = useTheme();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.includes(username);

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1.0 })}
      onPress={() => (isFavorite ? removeFavorite(username) : addFavorite(username))}
    >
      <Ionicons name={isFavorite ? "star" : "star-outline"} size={24} color={theme.colors.primary} />
    </Pressable>
  );
};

export default FavoriteButton;

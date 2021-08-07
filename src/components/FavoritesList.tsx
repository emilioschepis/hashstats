import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useFavorites } from "../context/FavoritesContext";
import FavoritesItem from "./FavoritesItem";

export type FavoritesListProps = {
  onSelect: (username: string) => void;
};

const Separator = () => {
  return <View style={styles.separator} />;
};

const FavoritesList = ({ onSelect }: FavoritesListProps) => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <FavoritesItem username={item} onSelect={() => onSelect(item)} />}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  separator: {
    borderBottomColor: "rgb(229, 231, 235)",
    borderBottomWidth: 1,
    marginLeft: 8,
  },
});

export default FavoritesList;

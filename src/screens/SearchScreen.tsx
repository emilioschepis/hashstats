import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import FavoritesList from "../components/FavoritesList";
import { SearchNavigatorParamList } from "../navigation/SearchNavigator";

type NavigationProp = NativeStackNavigationProp<SearchNavigatorParamList, "Search">;

const SearchScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim().length === 0) {
      return;
    }

    navigation.navigate("SearchResults", { username: searchText.toLowerCase() });
  };

  const handleSelect = (username: string) => {
    navigation.navigate("SearchResults", { username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Insert the username of another author to view their statistics.</Text>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={[{ borderColor: theme.colors.primary }, styles.searchInput]}
          placeholder="Username"
        />
        <Pressable onPress={handleSearch} style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1.0 })}>
          <View style={[{ backgroundColor: theme.colors.primary }, styles.searchButton]}>
            <Text style={styles.searchButtonText}>Search</Text>
          </View>
        </Pressable>
      </View>
      <FavoritesList onSelect={handleSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  searchText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    marginBottom: 8,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 8,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontFamily: "Inter_900Black",
    color: "white",
    textTransform: "uppercase",
  },
});

export default SearchScreen;

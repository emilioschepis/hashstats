import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import FavoriteButton from "../components/FavoriteButton";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import SearchScreen from "../screens/SearchScreen";

export type SearchNavigatorParamList = {
  Search: undefined;
  SearchResults: { username: string };
};

const Stack = createNativeStackNavigator<SearchNavigatorParamList>();

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({
          title: route.params.username,
          headerRight: () => <FavoriteButton username={route.params.username} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;

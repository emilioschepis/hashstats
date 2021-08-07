import { NetworkStatus } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PostsList from "../components/PostsList";
import { usePostsQuery } from "../graphql/generated";
import { SearchNavigatorParamList } from "../navigation/SearchNavigator";
import CommonStyles from "../styles/CommonStyles";

type ScreenRouteProp = RouteProp<SearchNavigatorParamList, "SearchResults">;

const SearchResultsScreen = () => {
  const theme = useTheme();
  const route = useRoute<ScreenRouteProp>();
  const currentPage = useRef(0);
  const { loading, data, fetchMore, networkStatus } = usePostsQuery({
    variables: { username: route.params.username },
  });

  if (loading || !data) {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={[{ marginBottom: 8 }, styles.infoRow]}>
          <Ionicons name="people" size={24} color={theme.colors.primary} />
          <Text style={styles.infoText}>{data.user?.numFollowers} followers</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="thumbs-up" size={24} color={theme.colors.primary} />
          <Text style={styles.infoText}>{data.user?.numReactions ?? 0} total reactions</Text>
        </View>
      </View>
      <PostsList
        posts={data.user?.publication?.posts ?? []}
        onScroll={() => {}}
        onEndReached={() => {
          if (networkStatus !== NetworkStatus.fetchMore) {
            fetchMore({
              variables: {
                page: ++currentPage.current,
              },
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
    borderBottomColor: "rgb(229, 231, 235)",
    borderBottomWidth: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    marginLeft: 4,
  },
});

export default SearchResultsScreen;

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PostsList from "../components/PostsList";
import { usePostsQuery } from "../graphql/generated";
import CommonStyles from "../styles/CommonStyles";

const HomeScreen = () => {
  const { loading, data } = usePostsQuery({ variables: { username: "emilioschepis" } });

  if (loading || !data) {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello, {data.user?.name}</Text>
      <Text style={styles.taglineText}>Here are your posts and their current levels of engagement.</Text>
      <PostsList posts={data.user?.publication?.posts ?? []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    width: "100%",
    fontSize: 24,
    fontFamily: "Inter_900Black",
    color: "#333333",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  taglineText: {
    width: "100%",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;

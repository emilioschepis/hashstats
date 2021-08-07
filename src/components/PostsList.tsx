import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { PostsQuery } from "../graphql/generated";
import PostItem from "./PostItem";

type Posts = NonNullable<NonNullable<NonNullable<PostsQuery["user"]>["publication"]>["posts"]>;

export type PostsListProps = {
  posts: Posts;
};

const Separator = () => {
  return <View style={styles.separator} />;
};

const PostsList = ({ posts }: PostsListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post?._id ?? ""}
        renderItem={({ item }) => <PostItem post={item} />}
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
    padding: 16,
  },
  separator: {
    height: 8,
  },
});

export default PostsList;

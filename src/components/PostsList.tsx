import React from "react";
import { FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { PostsQuery } from "../graphql/generated";
import PostItem from "./PostItem";

type Posts = NonNullable<NonNullable<NonNullable<PostsQuery["user"]>["publication"]>["posts"]>;

export type PostsListProps = {
  posts: Posts;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onEndReached: () => void;
};

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<Posts[number]>>(FlatList);

const Separator = () => {
  return <View style={styles.separator} />;
};

const PostsList = ({ posts, onScroll, onEndReached }: PostsListProps) => {
  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={posts}
        keyExtractor={(post) => post?._id ?? ""}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={Separator}
        scrollEventThrottle={1}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
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

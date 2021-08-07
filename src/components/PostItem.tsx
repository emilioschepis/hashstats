import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { PostsQuery } from "../graphql/generated";

type Post = NonNullable<NonNullable<NonNullable<PostsQuery["user"]>["publication"]>["posts"]>[number];

export type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  const theme = useTheme();
  const timeAgo = useMemo(() => dayjs(post?.dateAdded).fromNow(), [post?.dateAdded]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: post?.coverImage, height: 64 }} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{post?.title}</Text>
        <Text style={styles.timeAgoText}>Posted {timeAgo}</Text>
        <View style={styles.engagementContainer}>
          <View style={[{ backgroundColor: theme.colors.primary }, styles.reactionsContainer]}>
            <Ionicons name="thumbs-up" color="white" size={18} />
            <Text style={styles.reactionsText}>{post?.totalReactions}</Text>
          </View>
          <View style={[{ backgroundColor: theme.colors.primary }, styles.commentsContainer]}>
            <Ionicons name="chatbubbles" color="white" size={18} />
            <Text style={styles.reactionsText}>{post?.responseCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
  },
  contentContainer: {
    padding: 8,
  },
  engagementContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },
  reactionsContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "baseline",
    borderRadius: 4,
  },
  commentsContainer: {
    marginLeft: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "baseline",
    borderRadius: 4,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
  },
  timeAgoText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#616161",
  },
  reactionsText: {
    fontSize: 18,
    fontFamily: "Inter_900Black",
    marginLeft: 4,
    color: "white",
  },
  commentsText: {
    fontSize: 18,
    fontFamily: "Inter_900Black",
    marginLeft: 4,
    color: "white",
  },
});

export default PostItem;

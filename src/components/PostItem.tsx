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
          <View style={styles.reactionsContainer}>
            <Ionicons name="thumbs-up" color={theme.colors.primary} size={18} />
            <Text style={[{ color: theme.colors.primary }, styles.reactionsText]}>{post?.totalReactions}</Text>
          </View>
          <View style={styles.commentsContainer}>
            <Ionicons name="chatbubbles" color={theme.colors.primary} size={18} />
            <Text style={[{ color: theme.colors.primary }, styles.commentsText]}>{post?.responseCount}</Text>
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
    flexDirection: "row",
    alignItems: "baseline",
  },
  commentsContainer: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    marginBottom: 4,
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
  },
  commentsText: {
    fontSize: 18,
    fontFamily: "Inter_900Black",
    marginLeft: 4,
  },
});

export default PostItem;

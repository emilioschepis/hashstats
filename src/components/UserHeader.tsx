import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { PostsQuery } from "../graphql/generated";

type User = PostsQuery["user"];

export type UserHeaderProps = {
  user: User;
  offsetY: Animated.SharedValue<number>;
};

const UserHeader = ({ user, offsetY }: UserHeaderProps) => {
  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [0, 100], [1, 0]),
  }));

  const closedTextContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [90, 100], [0, 1]),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[textContainerStyle, styles.textContainer]}>
        <Animated.Image
          source={user?.coverImage ? { uri: user.coverImage } : require("../../assets/default-cover.jpeg")}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.welcomeText}>Hello, {user?.name}</Text>
        <Text style={styles.taglineText}>Here are your posts and their current levels of engagement</Text>
      </Animated.View>
      <Animated.View style={[closedTextContainerStyle, styles.closedTextContainer]}>
        <Text style={styles.closedText}>{user?.name}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 16,
    overflow: "hidden",
  },
  closedTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 16,
    borderBottomColor: "rgb(229, 231, 235)",
    borderBottomWidth: 2,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "Inter_900Black",
    color: "white",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingRight: 2,
  },
  taglineText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "white",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingRight: 2,
  },
  closedText: {
    height: 24,
    width: "100%",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    textAlign: "center",
  },
});

export default UserHeader;

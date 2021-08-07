import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUsername } from "../context/UsernameContext";
import { PostsQuery } from "../graphql/generated";

type User = PostsQuery["user"];

export type UserHeaderProps = {
  user: User;
  offsetY: Animated.SharedValue<number>;
};

export const MAX_HEADER_HEIGHT = 200;
export const MIN_HEADER_HEIGHT = 56;

const UserHeader = ({ user, offsetY }: UserHeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { resetUsername } = useUsername();

  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [0, MIN_HEADER_HEIGHT + insets.top], [1, 0]),
  }));

  const closedTextContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [MIN_HEADER_HEIGHT, MIN_HEADER_HEIGHT + insets.top], [0, 1]),
  }));

  const handlePress = () => {
    resetUsername?.();
  };

  return (
    <View style={styles.container}>
      <View style={[{ top: insets.top + 8 }, styles.changeUsernameContainer]}>
        <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1.0 })} onPress={handlePress}>
          <View style={[{ backgroundColor: theme.colors.primary }, styles.changeUsernameContent]}>
            <Text style={styles.changeUsernameText}>Change username</Text>
            <Ionicons name="exit" color="white" size={18} />
          </View>
        </Pressable>
      </View>
      <Animated.View style={[textContainerStyle, styles.textContainer]}>
        <Animated.Image
          defaultSource={require("../../assets/placeholder.jpeg")}
          source={user?.coverImage ? { uri: user.coverImage } : require("../../assets/default-cover.jpeg")}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.welcomeText}>Hello, {user?.name}</Text>
        <View style={styles.statsRow}>
          <Ionicons name="people" color="white" size={18} />
          <Text style={styles.statsText}>{user?.numFollowers} followers</Text>
          <Ionicons name="thumbs-up" color="white" size={18} />
          <Text style={styles.statsText}>{user?.numReactions ?? 0} total reactions</Text>
        </View>
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
  changeUsernameContainer: {
    position: "absolute",
    right: 16,
    zIndex: 3,
  },
  changeUsernameContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "Inter_900Black",
    color: "white",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingRight: 2,
    marginBottom: 4,
  },
  statsText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "white",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingRight: 2,
    marginHorizontal: 4,
  },
  closedText: {
    height: 24,
    width: "100%",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#333333",
    textAlign: "center",
  },
  changeUsernameText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "white",
    textShadowColor: "#333",
    paddingRight: 4,
  },
});

export default UserHeader;

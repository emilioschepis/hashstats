import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PostsList from "../components/PostsList";
import UserHeader from "../components/UserHeader";
import { usePostsQuery } from "../graphql/generated";
import CommonStyles from "../styles/CommonStyles";
import { clamp } from "../utils/animationUtils";

const MAX_HEADER_HEIGHT = 180;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const offsetY = useSharedValue(0);
  const { loading, data } = usePostsQuery({ variables: { username: "emilioschepis" } });
  const [statusBarStyle, setStatusBarStyle] = useState<"light" | "auto">("light");

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offsetY.value }],
  }));

  const listStyle = useAnimatedStyle(() => ({
    paddingTop: MAX_HEADER_HEIGHT - offsetY.value,
  }));

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const value = clamp(event.contentOffset.y, 0, MAX_HEADER_HEIGHT - insets.top - 56);
      offsetY.value = value;

      const style = event.contentOffset.y > 100 ? "auto" : "light";
      runOnJS(setStatusBarStyle)(style);
    },
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
      <StatusBar style={statusBarStyle} />
      <Animated.View style={[headerStyle, styles.headerContainer]}>
        <UserHeader user={data.user} offsetY={offsetY} />
      </Animated.View>
      <Animated.View style={listStyle}>
        <PostsList posts={data.user?.publication?.posts ?? []} onScroll={handleScroll} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MAX_HEADER_HEIGHT,
    zIndex: 2,
  },
});

export default HomeScreen;

import { NetworkStatus } from "@apollo/client";
import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PostsList from "../components/PostsList";
import UserHeader, { MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from "../components/UserHeader";
import { useUsername } from "../context/UsernameContext";
import { usePostsQuery } from "../graphql/generated";
import CommonStyles from "../styles/CommonStyles";
import { clamp } from "../utils/animationUtils";

const HomeScreen = () => {
  const { username } = useUsername();
  const insets = useSafeAreaInsets();
  const currentPage = useRef(0);

  const offsetY = useSharedValue(0);
  const { loading, data, fetchMore, networkStatus } = usePostsQuery({
    variables: { username: username ?? "" },
    skip: !username,
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -clamp(offsetY.value, 0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT - insets.top) }],
  }));

  const listStyle = useAnimatedStyle(() => ({
    paddingTop: clamp(MAX_HEADER_HEIGHT - offsetY.value, MIN_HEADER_HEIGHT + insets.top, MAX_HEADER_HEIGHT),
  }));

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      offsetY.value = event.contentOffset.y;
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
      <Animated.View style={[headerStyle, styles.headerContainer]}>
        <UserHeader user={data.user} offsetY={offsetY} />
      </Animated.View>
      <Animated.View style={listStyle}>
        <PostsList
          posts={data.user?.publication?.posts ?? []}
          onScroll={handleScroll}
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

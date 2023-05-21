import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import Tweet from "../../../../components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
// import { useState, useEffect } from "react";
import { useTweetsApi } from "../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";

export default function FeedScreed() {
  const { listTweets } = useTweetsApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error instanceof Error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.page}>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />

      <Link href="/new-tweet" asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingbutton}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  floatingbutton: {
    backgroundColor: "#1C9BF0",

    borderRadius: 25,
    overflow: "hidden",
    position: "absolute",

    padding: 14,
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

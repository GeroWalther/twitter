import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTweetsApi } from "../lib/api/tweets";

const user = {
  id: "123456789",
  name: "Jeff B",
  username: "bezos",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg",
};

export default function NewTweet() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { createTweet } = useTweetsApi();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      queryClient.setQueriesData(["tweets"], (existingTweets) => [
        data,
        ...existingTweets,
      ]);
    },
  });

  async function onTweetPress() {
    if (text.length > 0) {
      try {
        await mutateAsync({ content: text });

        setText("");
        router.back();
      } catch (err) {
        console.log("Error:", err);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.buttonCon}>
          <Link href="../" style={{ fontSize: 18 }}>
            Cancel
          </Link>
          {isLoading && <ActivityIndicator />}
          <Pressable onPress={onTweetPress} style={styles.btn}>
            <Text style={styles.btnTxt}>Tweet</Text>
          </Pressable>
        </View>
        <View style={styles.inpCon}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <TextInput
            placeholder="What is happening?"
            multiline
            numberOfLines={5}
            style={{ flex: 1 }}
            value={text}
            onChangeText={setText}
          />
        </View>

        {isError && <Text>Error: {(error as Error).message}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  inpCon: {
    flexDirection: "row",
  },
  buttonCon: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#1C9BF0",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  btnTxt: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

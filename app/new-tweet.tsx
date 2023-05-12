import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";

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

  function onTweetPress() {
    console.warn(text);

    setText("");
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.buttonCon}>
          <Link href="../" style={{ fontSize: 18 }}>
            Cancel
          </Link>
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

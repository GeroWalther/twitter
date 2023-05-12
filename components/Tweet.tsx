import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { TweetType } from "../types";
import IconBtn from "./IconBtn";
import { Link } from "expo-router";

type TweetProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <Link href={`/feed/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: tweet.user.image }} style={styles.userImg} />
        <View style={styles.mainCon}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>{tweet.user.username} •2h</Text>
            <Entypo
              name="dots-three-vertical"
              size={16}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </View>
          <Text style={styles.content}>{tweet.content}</Text>

          {tweet.image && (
            <Image source={{ uri: tweet.image }} style={styles.img} />
          )}

          <View style={styles.footer}>
            <IconBtn iconName="comment" text={tweet.numberOfComments} />
            <IconBtn iconName="retweet" text={tweet.numberOfRetweets} />
            <IconBtn iconName="heart" text={tweet.numberOfLikes} />
            <IconBtn iconName="chart" text={tweet.impressions || 0} />
            <IconBtn iconName="share-apple" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
  },
  userImg: { width: 50, height: 50, borderRadius: 50 },
  img: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  mainCon: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  username: {
    color: "grey",
    marginLeft: 5,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
export default Tweet;

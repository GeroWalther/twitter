import { StyleSheet, View, FlatList, Pressable } from "react-native";
import Tweet from "../../../../components/Tweet";
import tweets from "../../../../assets/data/tweets";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabOneScreen() {
  function onPress() {}
  return (
    <View style={styles.page}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />

      <Link href="/new-tweet" asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingbutton}
          onPress={onPress}
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

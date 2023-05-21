import { withLayoutContext } from "expo-router";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { Text, Linking, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ alignSelf: "center", fontSize: 20 }}>Gero</Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="View in Browser"
        onPress={() => Linking.openURL("https://Twitter.com/")}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { authToken } = useAuth();
  if (!authToken) {
    return <ActivityIndicator />;
  }
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Drawer.Screen
        name="bookmarks"
        options={{ headerShown: false, title: "Bookmarks" }}
      />
      <Drawer.Screen
        name="twitter-blue"
        options={{ headerShown: false, title: "Twitter Blue" }}
      />
    </Drawer>
  );
}

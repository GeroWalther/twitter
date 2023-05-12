import { View, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

type IconBtnProps = {
  iconName: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconBtn = ({ iconName, text }: IconBtnProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <EvilIcons name={iconName} size={22} color="grey" />
      <Text style={{ fontSize: 12, color: "grey" }}>{text}</Text>
    </View>
  );
};

export default IconBtn;

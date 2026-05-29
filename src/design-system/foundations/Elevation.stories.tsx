import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Text from "../components/Text";
import { shadow } from "../tokens";

const meta: Meta = { title: "Foundations/Elevation" };
export default meta;

export const Shadows: StoryObj = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 32, padding: 16 }}>
      {Object.entries(shadow).map(([name, s]) => (
        <View key={name} style={{ alignItems: "center", gap: 10 }}>
          <View style={[{ width: 96, height: 96, borderRadius: 16, backgroundColor: "#FFFFFF" }, s]} />
          <Text variant="caption">{name}</Text>
        </View>
      ))}
    </View>
  ),
};

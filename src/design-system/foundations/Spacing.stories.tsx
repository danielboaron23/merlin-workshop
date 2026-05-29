import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Text from "../components/Text";
import { spacing, radius } from "../tokens";

const meta: Meta = { title: "Foundations/Spacing & Radius" };
export default meta;

export const Spacing: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      {Object.entries(spacing).map(([name, v]) => (
        <View key={name} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text variant="paragraphSm" style={{ width: 80 }}>
            {name} ({v})
          </Text>
          <View style={{ width: v, height: 16, backgroundColor: "#5287E1" }} />
        </View>
      ))}
    </View>
  ),
};

export const Radius: StoryObj = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
      {Object.entries(radius).map(([name, v]) => (
        <View key={name} style={{ alignItems: "center", gap: 6 }}>
          <View style={{ width: 72, height: 72, backgroundColor: "#ECEFEA", borderRadius: v as number }} />
          <Text variant="caption">
            {name} ({v})
          </Text>
        </View>
      ))}
    </View>
  ),
};

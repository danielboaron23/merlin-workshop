import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Text from "../components/Text";
import { typography, TypographyVariant } from "../tokens";

const meta: Meta = { title: "Foundations/Typography" };
export default meta;

export const Scale: StoryObj = {
  render: () => (
    <View style={{ gap: 18 }}>
      {(Object.keys(typography) as TypographyVariant[]).map((v) => (
        <View key={v} style={{ gap: 2 }}>
          <Text variant="caption" tone="input">
            {v} · {typography[v].fontSize}/{typography[v].lineHeight}
          </Text>
          <Text variant={v}>The quick brown fox jumps</Text>
        </View>
      ))}
    </View>
  ),
};

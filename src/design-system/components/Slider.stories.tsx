import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Slider from "./Slider";
import Text from "./Text";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  args: { value: 50 },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
};
export default meta;
type S = StoryObj<typeof Slider>;

export const Default: S = {};
export const States: S = {
  render: () => (
    <View style={{ gap: 20, width: 320 }}>
      {[10, 25, 50, 75, 100].map((p) => (
        <View key={p} style={{ gap: 6 }}>
          <Text variant="caption" tone="input">{p}%</Text>
          <Slider value={p} />
        </View>
      ))}
    </View>
  ),
};

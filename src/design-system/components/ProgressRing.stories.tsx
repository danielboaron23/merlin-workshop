import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import ProgressRing from "./ProgressRing";

const meta: Meta<typeof ProgressRing> = {
  title: "Components/ProgressRing",
  component: ProgressRing,
  args: { percent: 78, size: 45 },
  argTypes: { percent: { control: { type: "range", min: 0, max: 100 } } },
};
export default meta;
type S = StoryObj<typeof ProgressRing>;

export const Default: S = {};
export const Steps: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
      {[0, 25, 50, 78, 100].map((p) => (
        <ProgressRing key={p} percent={p} />
      ))}
    </View>
  ),
};
export const Large: S = { args: { size: 96, stroke: 8 } };

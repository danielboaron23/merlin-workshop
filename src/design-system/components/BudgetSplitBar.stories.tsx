import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import BudgetSplitBar from "./BudgetSplitBar";

const meta: Meta<typeof BudgetSplitBar> = {
  title: "Components/BudgetSplitBar",
  component: BudgetSplitBar,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
type S = StoryObj<typeof BudgetSplitBar>;

export const TwoChannels: S = {
  args: { total: 600, segments: [{ channel: "google", pct: 60 }, { channel: "instagram", pct: 40 }] },
};

export const ThreeChannels: S = {
  args: {
    total: 900,
    segments: [
      { channel: "google", pct: 50 },
      { channel: "instagram", pct: 30 },
      { channel: "facebook", pct: 20 },
    ],
  },
};

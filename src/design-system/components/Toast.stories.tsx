import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
type S = StoryObj<typeof Toast>;

export const Positive: S = { args: { type: "positive", message: "Desktop editing isn't supported on mobile." } };
export const Negative: S = { args: { type: "negative", message: "Desktop editing isn't supported on mobile." } };

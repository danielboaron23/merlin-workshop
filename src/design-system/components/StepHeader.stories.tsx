import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import StepHeader from "./StepHeader";

const meta: Meta<typeof StepHeader> = {
  title: "Components/StepHeader",
  component: StepHeader,
  decorators: [(Story) => <View style={{ width: 390 }}><Story /></View>],
  args: { step: 2, total: 6, onBack: () => {}, onClose: () => {} },
};
export default meta;
type S = StoryObj<typeof StepHeader>;

export const Middle: S = {};
export const FirstStep: S = { args: { step: 1, total: 6, onBack: undefined } };
export const LastStep: S = { args: { step: 6, total: 6 } };
export const NoCount: S = { args: { hideCount: true } };

import type { Meta, StoryObj } from "@storybook/react";
import { Confetti, Globe } from "phosphor-react-native";
import { View } from "react-native";
import StepCard from "./StepCard";

const meta: Meta<typeof StepCard> = {
  title: "Components/StepCard",
  component: StepCard,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
type S = StoryObj<typeof StepCard>;

export const ToDo: S = {
  args: { icon: <Globe size={32} color="#2A2929" />, title: "Get a custom domain", sub: "www.mormakiri.com" },
};
export const Done: S = {
  args: { icon: <Confetti size={32} color="#2A2929" />, title: "Publish your site", done: true },
};

export const States: S = {
  render: () => (
    <View style={{ gap: 8, width: 360 }}>
      <StepCard icon={<Globe size={32} color="#2A2929" />} title="Get a custom domain" sub="www.mormakiri.com" />
      <StepCard icon={<Confetti size={32} color="#2A2929" />} title="Publish your site" done />
    </View>
  ),
};

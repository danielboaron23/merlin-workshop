import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Bell, FunnelSimple } from "phosphor-react-native";
import { View } from "react-native";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
};
export default meta;
type S = StoryObj<typeof IconButton>;

export const Variants: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 16, padding: 8 }}>
      <IconButton variant="plain" icon={<Bell size={24} color="#201F1F" />} />
      <IconButton variant="surface" icon={<FunnelSimple size={24} color="#2A2929" />} />
      <IconButton variant="glass" icon={<ArrowRight size={20} color="#201F1F" weight="bold" />} size={36} />
    </View>
  ),
};

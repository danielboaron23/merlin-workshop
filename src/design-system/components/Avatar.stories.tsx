import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  args: { initials: "EC", size: 50 },
};
export default meta;
type S = StoryObj<typeof Avatar>;

export const Initials: S = {};
export const Sizes: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <Avatar initials="EC" size={24} />
      <Avatar initials="JM" size={36} />
      <Avatar initials="AT" size={50} />
      <Avatar initials="OB" size={64} />
    </View>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  args: { label: "Coming soon", variant: "light" },
};
export default meta;
type S = StoryObj<typeof Tag>;

export const Light: S = {};
export const Solid: S = { args: { variant: "solid" } };
export const Examples: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, backgroundColor: "#E5EFE6", padding: 16, borderRadius: 16 }}>
      <Tag label="Coming soon" />
      <Tag label="New" />
      <Tag label="PRO" variant="solid" />
    </View>
  ),
};

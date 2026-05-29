import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Chip from "./Chip";

const meta: Meta<typeof Chip> = { title: "Components/Chip", component: Chip, args: { label: "Label" } };
export default meta;
type S = StoryObj<typeof Chip>;

export const Default: S = {};
export const Selected: S = { args: { selected: true } };
export const Removable: S = { args: { onRemove: () => {} } };

export const Examples: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
      <Chip label="Label" />
      <Chip label="Label" selected />
      <Chip label="Label" onRemove={() => {}} />
      <Chip label="Selected" selected onRemove={() => {}} />
    </View>
  ),
};

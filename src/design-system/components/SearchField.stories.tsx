import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import SearchField from "./SearchField";

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  args: { placeholder: "Search your leads" },
};
export default meta;
type S = StoryObj<typeof SearchField>;

export const Empty: S = {
  render: (args) => (
    <View style={{ width: 320 }}>
      <SearchField {...args} />
    </View>
  ),
};

export const Interactive: S = {
  render: (args) => {
    const [v, setV] = useState("");
    return (
      <View style={{ width: 320 }}>
        <SearchField {...args} value={v} onChangeText={setV} />
      </View>
    );
  },
};

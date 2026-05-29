import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = { title: "Components/Toggle", component: Toggle };
export default meta;
type S = StoryObj<typeof Toggle>;

export const On: S = { args: { value: true } };
export const Off: S = { args: { value: false } };
export const Disabled: S = { args: { value: true, disabled: true } };

export const Interactive: S = {
  render: () => {
    const [v, setV] = useState(true);
    return (
      <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
        <Toggle value={v} onValueChange={setV} />
        <Toggle value={false} />
        <Toggle value={true} disabled />
      </View>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import Radio from "./Radio";

const meta: Meta<typeof Radio> = { title: "Components/Radio", component: Radio };
export default meta;
type S = StoryObj<typeof Radio>;

export const Selected: S = { args: { selected: true } };
export const Default: S = { args: { selected: false } };

export const Group: S = {
  render: () => {
    const [sel, setSel] = useState(0);
    return (
      <View style={{ flexDirection: "row", gap: 24 }}>
        {[0, 1, 2].map((i) => (
          <Radio key={i} selected={sel === i} onPress={() => setSel(i)} />
        ))}
      </View>
    );
  },
};

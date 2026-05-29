import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import TabBar, { TabKey } from "./TabBar";

const meta: Meta<typeof TabBar> = { title: "Components/TabBar", component: TabBar };
export default meta;
type S = StoryObj<typeof TabBar>;

export const Interactive: S = {
  render: () => {
    const [tab, setTab] = useState<TabKey>("home");
    return (
      <View style={{ width: 390, borderWidth: 1, borderColor: "#eee" }}>
        <TabBar active={tab} onChange={setTab} />
      </View>
    );
  },
};

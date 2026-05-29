import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import ChannelCard from "./ChannelCard";
import { ChannelKey } from "./ChannelGlyph";

const meta: Meta<typeof ChannelCard> = {
  title: "Components/ChannelCard",
  component: ChannelCard,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
  args: { channel: "google", description: "Get found when people search", tagline: "High intent" },
};
export default meta;
type S = StoryObj<typeof ChannelCard>;

export const Google: S = {};
export const Selected: S = { args: { selected: true } };

export const MultiSelectHub: S = {
  render: () => {
    const [sel, setSel] = useState<ChannelKey[]>(["google"]);
    const toggle = (c: ChannelKey) =>
      setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
    const data: { channel: ChannelKey; description: string; tagline: string }[] = [
      { channel: "google", description: "Get found when people search", tagline: "High intent" },
      { channel: "instagram", description: "Reach people scrolling nearby", tagline: "Visual" },
      { channel: "facebook", description: "Reach local customers and communities", tagline: "Local reach" },
    ];
    return (
      <View style={{ gap: 12, width: 360 }}>
        {data.map((d) => (
          <ChannelCard key={d.channel} {...d} selected={sel.includes(d.channel)} onPress={() => toggle(d.channel)} />
        ))}
      </View>
    );
  },
};

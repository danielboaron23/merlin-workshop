import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import ChannelGlyph from "./ChannelGlyph";
import SegmentedControl from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
};
export default meta;
type S = StoryObj<typeof SegmentedControl>;

export const TextOnly: S = {
  render: () => {
    const [v, setV] = useState("google");
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        segments={[
          { key: "google", label: "Google" },
          { key: "instagram", label: "Instagram" },
          { key: "facebook", label: "Facebook" },
        ]}
      />
    );
  },
};

export const WithIcons: S = {
  render: () => {
    const [v, setV] = useState("instagram");
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        segments={[
          { key: "google", label: "Google", icon: <ChannelGlyph channel="google" size={16} /> },
          { key: "instagram", label: "Instagram", icon: <ChannelGlyph channel="instagram" size={16} /> },
          { key: "facebook", label: "Facebook", icon: <ChannelGlyph channel="facebook" size={16} /> },
        ]}
      />
    );
  },
};

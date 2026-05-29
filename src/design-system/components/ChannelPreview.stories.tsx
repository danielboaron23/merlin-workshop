import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { FacebookPreview, InstagramPreview } from "./ChannelPreview";

// Reuse a bundled image so the story renders without extra assets.
const photo = require("../../../assets/figma/nail-photo.jpg");

const common = {
  handle: "artup.nails",
  photo,
  headline: "Book your nails today",
  caption: "Gel manicures, nail art and natural nail care in Manhattan.",
};

const meta: Meta = {
  title: "Components/ChannelPreview",
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
};
export default meta;

export const Instagram: StoryObj = { render: () => <InstagramPreview {...common} /> };
export const Facebook: StoryObj = { render: () => <FacebookPreview {...common} /> };

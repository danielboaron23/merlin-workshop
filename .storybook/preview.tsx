import type { Preview } from "@storybook/react";
import { View } from "react-native";
import { color } from "../src/design-system/tokens";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: color.surface.bg },
        { name: "card", value: color.surface.card },
        { name: "dark", value: color.surface.btnPrimary },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 24, alignItems: "flex-start", backgroundColor: "transparent" }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;

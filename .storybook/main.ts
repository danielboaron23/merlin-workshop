import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["./public"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
};

export default config;

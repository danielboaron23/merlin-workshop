import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "phosphor-react-native";
import { View } from "react-native";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { label: "Check it out", variant: "primary", size: "default" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
    size: { control: "select", options: ["default", "subtle"] },
  },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Primary: S = {};
export const Secondary: S = { args: { variant: "secondary" } };
export const Tertiary: S = { args: { variant: "tertiary", label: "Edit" } };
export const Subtle: S = { args: { size: "subtle", label: "Share" } };
export const WithIcon: S = { args: { leftIcon: <ArrowRight size={18} color="#fff" weight="bold" /> } };
export const Loading: S = { args: { loading: true } };
export const Disabled: S = { args: { disabled: true } };

export const AllStates: S = {
  render: () => (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Tertiary" variant="tertiary" />
      <Button label="Subtle" size="subtle" variant="secondary" />
      <Button label="Loading" loading />
      <Button label="Disabled" disabled />
    </View>
  ),
};

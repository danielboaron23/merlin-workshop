import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
  args: { label: "Email", placeholder: "Enter your email address" },
};
export default meta;
type S = StoryObj<typeof TextField>;

export const Default: S = {};
export const Active: S = { args: { state: "active", value: "design_by_makini" } };
export const Completed: S = { args: { state: "completed", value: "hello@merlin.com" } };
export const Disabled: S = { args: { state: "disabled", value: "locked@merlin.com", editable: false } };
export const Error: S = { args: { state: "error", value: "not-an-email", errorText: "Enter a valid email address" } };
export const Small: S = { args: { size: "small", label: undefined, placeholder: "Add value" } };

export const AllStates: S = {
  render: () => (
    <View style={{ gap: 16, width: 360 }}>
      <TextField label="Default" placeholder="Enter your address" />
      <TextField label="Active" state="active" value="design_by_makini" />
      <TextField label="Completed" state="completed" value="hello@merlin.com" />
      <TextField label="Disabled" state="disabled" value="locked" editable={false} />
      <TextField label="Error" state="error" value="bad" errorText="Enter a valid email address" />
    </View>
  ),
};

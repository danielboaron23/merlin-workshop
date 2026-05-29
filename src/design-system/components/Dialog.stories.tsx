import type { Meta, StoryObj } from "@storybook/react";
import Dialog from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  args: {
    title: "Are you sure you want to end this campaign?",
    confirmLabel: "End campaign",
    cancelLabel: "Cancel",
  },
};
export default meta;
type S = StoryObj<typeof Dialog>;

export const Default: S = {};

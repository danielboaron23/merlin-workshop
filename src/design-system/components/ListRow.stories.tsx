import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import ListRow from "./ListRow";

const meta: Meta<typeof ListRow> = {
  title: "Components/ListRow",
  component: ListRow,
  args: {
    initials: "EC",
    title: "Emily Carter",
    subtitle: "Hi! I was wondering if you have any availability",
    meta: "Sep 19",
    unread: true,
  },
};
export default meta;
type S = StoryObj<typeof ListRow>;

export const Unread: S = {
  render: (args) => (
    <View style={{ width: 360 }}>
      <ListRow {...args} />
    </View>
  ),
};

export const Read: S = {
  args: { unread: false },
  render: (args) => (
    <View style={{ width: 360 }}>
      <ListRow {...args} />
    </View>
  ),
};

export const List: S = {
  render: () => (
    <View style={{ width: 360 }}>
      <ListRow initials="EC" title="Emily Carter" subtitle="Hi! Any availability next week?" meta="Sep 19" unread />
      <ListRow initials="JM" title="Jessica Miller" subtitle="Love your work!" meta="Sep 18" unread />
      <ListRow initials="AT" title="Ashley Thompson" subtitle="Accepting new clients?" meta="Sep 17" />
      <ListRow initials="OB" title="Olivia Brooks" subtitle="Pricing for a full set?" meta="Sep 16" />
    </View>
  ),
};

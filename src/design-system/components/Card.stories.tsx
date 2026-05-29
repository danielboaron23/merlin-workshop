import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Card from "./Card";
import Tag from "./Tag";
import Text from "./Text";

const meta: Meta<typeof Card> = { title: "Components/Card", component: Card };
export default meta;
type S = StoryObj<typeof Card>;

export const Surface: S = {
  render: () => (
    <View style={{ width: 320 }}>
      <Card>
        <Text variant="h6">Next steps to grow</Text>
        <Text variant="paragraphSm" tone="input" style={{ marginTop: 8 }}>
          A grey surface panel.
        </Text>
      </Card>
    </View>
  ),
};

export const FeatureTile: S = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, width: 360 }}>
      <Card background="#DEE5E3" style={{ flex: 1, gap: 24 }}>
        <Text variant="h6">Payments</Text>
        <Tag label="Coming soon" />
      </Card>
      <Card background="#E9F2FF" style={{ flex: 1, gap: 24 }}>
        <Text variant="h6">Booking</Text>
        <Tag label="Coming soon" />
      </Card>
    </View>
  ),
};

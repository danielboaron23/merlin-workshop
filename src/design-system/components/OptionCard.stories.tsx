import type { Meta, StoryObj } from "@storybook/react";
import { CalendarCheck, Phone, TrendUp } from "phosphor-react-native";
import { useState } from "react";
import { View } from "react-native";
import { color } from "../tokens";
import OptionCard from "./OptionCard";

const meta: Meta<typeof OptionCard> = {
  title: "Components/OptionCard",
  component: OptionCard,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
  args: { title: "More bookings", subtitle: "Turn searchers into booked clients" },
};
export default meta;
type S = StoryObj<typeof OptionCard>;

export const Default: S = {};
export const Selected: S = { args: { selected: true, badge: "Recommended" } };
export const WithIcon: S = {
  args: { icon: <CalendarCheck size={22} color={color.content.primary} />, selected: true },
};

export const SingleSelectGroup: S = {
  render: () => {
    const [sel, setSel] = useState(0);
    const opts = [
      { t: "More bookings", s: "Turn searchers into booked clients", I: CalendarCheck },
      { t: "More calls", s: "Get the phone ringing", I: Phone },
      { t: "More website visits", s: "Send people to your site", I: TrendUp },
    ];
    return (
      <View style={{ gap: 12, width: 360 }}>
        {opts.map((o, i) => (
          <OptionCard
            key={o.t}
            title={o.t}
            subtitle={o.s}
            icon={<o.I size={22} color={color.content.primary} />}
            selected={sel === i}
            badge={i === 0 ? "Recommended" : undefined}
            onPress={() => setSel(i)}
          />
        ))}
      </View>
    );
  },
};

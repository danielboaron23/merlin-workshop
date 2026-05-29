import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  Bell,
  CalendarDots,
  ChartBar,
  Check,
  Confetti,
  CreditCard,
  DotsThree,
  EnvelopeSimpleOpen,
  FunnelSimple,
  Globe,
  House,
  MagnifyingGlass,
  OpenAiLogo,
  PencilSimple,
  Question,
  ShareNetwork,
  StarFour,
} from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import Text from "../components/Text";
import { color, iconSize } from "../tokens";

const ICONS = {
  House, EnvelopeSimpleOpen, ChartBar, StarFour, Bell, Question, MagnifyingGlass,
  FunnelSimple, CreditCard, CalendarDots, OpenAiLogo, Globe, Confetti, ArrowRight,
  Check, PencilSimple, ShareNetwork, DotsThree,
};

const meta: Meta = { title: "Foundations/Icons" };
export default meta;

export const Library: StoryObj = {
  render: () => (
    <View style={styles.grid}>
      {Object.entries(ICONS).map(([name, Icon]) => (
        <View key={name} style={styles.cell}>
          <Icon size={iconSize.lg} color={color.content.primary} />
          <Text variant="caption" tone="input">
            {name}
          </Text>
        </View>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 20, maxWidth: 560 },
  cell: { width: 92, alignItems: "center", gap: 8 },
});

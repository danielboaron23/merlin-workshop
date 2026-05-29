import { ChartBar, EnvelopeSimpleOpen, House, IconProps, StarFour } from "phosphor-react-native";
import { ComponentType } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { color, palette, spacing, typography } from "../tokens";
import Text from "./Text";

export type TabKey = "home" | "leads" | "analytics" | "campaigns";

const TABS: { key: TabKey; label: string; Icon: ComponentType<IconProps>; dot?: boolean }[] = [
  { key: "home", label: "Home", Icon: House },
  { key: "leads", label: "Leads", Icon: EnvelopeSimpleOpen, dot: true },
  { key: "analytics", label: "Analytics", Icon: ChartBar },
  { key: "campaigns", label: "Campaigns", Icon: StarFour },
];

export type TabBarProps = {
  active: TabKey;
  onChange: (key: TabKey) => void;
  bottomInset?: number;
};

/** Bottom navigation. Active item is filled + semibold. */
export default function TabBar({ active, onChange, bottomInset = 0 }: TabBarProps) {
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(bottomInset, 8) + 8 }]}>
      {TABS.map(({ key, label, Icon, dot }) => {
        const isActive = key === active;
        return (
          <TouchableOpacity key={key} style={styles.tab} onPress={() => onChange(key)} activeOpacity={0.7}>
            <View>
              <Icon size={24} color={color.content.primary} weight={isActive ? "fill" : "regular"} />
              {dot ? <View style={styles.dot} /> : null}
            </View>
            <Text style={[typography.caption, styles.label, isActive && styles.active]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: color.border.hairline,
    paddingTop: spacing.md,
    backgroundColor: color.surface.bg,
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "space-between", gap: spacing.md, height: 45 },
  label: { color: color.content.primary },
  active: { fontFamily: typography.h7.fontFamily },
  dot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.notification,
  },
});

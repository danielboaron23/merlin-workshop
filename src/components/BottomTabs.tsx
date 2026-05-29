import {
  ChartBar,
  EnvelopeSimpleOpen,
  House,
  IconProps,
  StarFour,
} from "phosphor-react-native";
import { ComponentType } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, font, space, type } from "../theme";

export type TabKey = "home" | "leads" | "analytics" | "campaigns";

const TABS: { key: TabKey; label: string; Icon: ComponentType<IconProps>; dot?: boolean }[] = [
  { key: "home", label: "Home", Icon: House },
  { key: "leads", label: "Leads", Icon: EnvelopeSimpleOpen, dot: true },
  { key: "analytics", label: "Analytics", Icon: ChartBar },
  { key: "campaigns", label: "Campaigns", Icon: StarFour },
];

/** Bottom navigation. Active tab is filled + semibold (matches Figma). */
export default function BottomTabs({
  active,
  onChange,
  bottomInset = 0,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
  bottomInset?: number;
}) {
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(bottomInset, 8) + 8 }]}>
      {TABS.map(({ key, label, Icon, dot }) => {
        const isActive = key === active;
        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => onChange(key)}
            activeOpacity={0.7}
          >
            <View>
              <Icon
                size={24}
                color={colors.primary}
                weight={isActive ? "fill" : "regular"}
              />
              {dot ? <View style={styles.dot} /> : null}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
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
    borderTopColor: colors.line,
    paddingTop: space.md,
    backgroundColor: colors.bg,
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "space-between", gap: space.md, height: 45 },
  label: {
    fontFamily: font.regular,
    fontSize: type.caption.fontSize,
    lineHeight: type.caption.lineHeight,
    letterSpacing: type.caption.letterSpacing,
    color: colors.primary,
  },
  labelActive: { fontFamily: font.semibold },
  dot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#FF3B30",
  },
});

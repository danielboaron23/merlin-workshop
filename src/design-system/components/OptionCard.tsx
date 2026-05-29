import { Check } from "phosphor-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type OptionCardProps = {
  title: string;
  subtitle?: string;
  /** leading icon node (e.g. a Phosphor icon) */
  icon?: ReactNode;
  selected?: boolean;
  /** small "Recommended" style flag shown as a chip on the right */
  badge?: string;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * Selectable option card — title + optional subtitle/icon, with a selected state
 * (blue border + check). Used for single-select choices like the campaign goal.
 */
export default function OptionCard({
  title,
  subtitle,
  icon,
  selected,
  badge,
  onPress,
  disabled,
}: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text variant="h7">{title}</Text>
          {badge ? (
            <View style={styles.badge}>
              <Text variant="caption" tone="onDark">
                {badge}
              </Text>
            </View>
          ) : null}
        </View>
        {subtitle ? (
          <Text variant="paragraphSm" tone="input">
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected ? <Check size={14} color={color.content.onBtnPrimary} weight="bold" /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    backgroundColor: color.surface.bg,
    borderWidth: 1.5,
    borderColor: color.border.row,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  selected: { borderColor: color.accent.blue, backgroundColor: "#F5F8FF" },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.4 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: color.surface.card,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 4 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  badge: {
    backgroundColor: color.accent.blue,
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: color.border.row,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { backgroundColor: color.accent.blue, borderColor: color.accent.blue },
});

import { CaretLeft, X } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type StepHeaderProps = {
  /** 1-based current step */
  step: number;
  /** total steps */
  total: number;
  onBack?: () => void;
  onClose?: () => void;
  /** hide the "Step X of Y" caption (e.g. on the intro) */
  hideCount?: boolean;
};

/**
 * Top bar for a multi-step flow: back chevron, a thin progress track, an optional
 * close (×), and a "Step X of Y" caption. Tokens only.
 */
export default function StepHeader({ step, total, onBack, onClose, hideCount }: StepHeaderProps) {
  const pct = Math.max(0, Math.min(1, step / total));
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
            <CaretLeft size={24} color={color.content.primary} weight="bold" />
          </Pressable>
        ) : (
          <View style={styles.iconSpacer} />
        )}

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>

        {onClose ? (
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close">
            <X size={22} color={color.content.input} weight="bold" />
          </Pressable>
        ) : (
          <View style={styles.iconSpacer} />
        )}
      </View>

      {!hideCount ? (
        <Text variant="caption" tone="input" style={styles.count}>
          Step {step} of {total}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, gap: spacing.md },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  iconSpacer: { width: 24 },
  track: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: color.surface.secondary,
    overflow: "hidden",
  },
  fill: { height: 6, borderRadius: radius.pill, backgroundColor: color.accent.blue },
  count: { marginLeft: 36 },
});

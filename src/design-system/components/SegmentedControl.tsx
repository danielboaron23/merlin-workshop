import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type Segment = { key: string; label: string; icon?: ReactNode };

export type SegmentedControlProps = {
  segments: Segment[];
  value: string;
  onChange: (key: string) => void;
};

/**
 * Pill segmented control — used to switch the per-channel ad preview.
 * The active segment gets a white "thumb" on the grey track. Tokens only.
 */
export default function SegmentedControl({ segments, value, onChange }: SegmentedControlProps) {
  return (
    <View style={styles.track}>
      {segments.map((s) => {
        const active = s.key === value;
        return (
          <Pressable
            key={s.key}
            onPress={() => onChange(s.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.segment, active && styles.segmentActive]}
          >
            {s.icon ? <View style={styles.icon}>{s.icon}</View> : null}
            <Text variant="buttonSubtle" style={active ? undefined : styles.inactiveText}>
              {s.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    backgroundColor: color.surface.card,
    borderRadius: radius.pill,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  segmentActive: {
    backgroundColor: color.surface.bg,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: { marginRight: 0 },
  inactiveText: { color: color.content.input },
});

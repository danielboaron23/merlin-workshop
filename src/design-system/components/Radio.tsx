import { Pressable, StyleSheet, View } from "react-native";
import { color } from "../tokens";

export type RadioProps = {
  selected: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

/** Radio button — mirrors Figma "radio button [Mobile]" (default / selected). */
export default function Radio({ selected, onPress, disabled }: RadioProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.outer, { borderColor: selected ? color.accent.blue : color.border.row }, disabled && styles.disabled]}
    >
      {selected ? <View style={styles.inner} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: { width: 11, height: 11, borderRadius: 999, backgroundColor: color.accent.blue },
  disabled: { opacity: 0.4 },
});

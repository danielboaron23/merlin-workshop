import { Pressable, StyleSheet, View } from "react-native";
import { color, palette } from "../tokens";

export type ToggleProps = {
  value: boolean;
  onValueChange?: (v: boolean) => void;
  disabled?: boolean;
};

/** On/off switch — mirrors the Figma "Toggle" (52×32). */
export default function Toggle({ value, onValueChange, disabled }: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange?.(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? color.accent.blue : "#C9CEC8" },
        disabled && styles.disabled,
      ]}
    >
      <View style={[styles.knob, { alignSelf: value ? "flex-end" : "flex-start" }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 52, height: 32, borderRadius: 999, padding: 3, justifyContent: "center" },
  knob: { width: 26, height: 26, borderRadius: 999, backgroundColor: palette.white },
  disabled: { opacity: 0.4 },
});

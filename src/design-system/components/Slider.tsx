import { StyleSheet, View } from "react-native";
import { color } from "../tokens";

export type SliderProps = {
  /** 0–100 */
  value: number;
};

/**
 * Read-only visual slider track — mirrors the Figma "Slider [Mobile]"
 * states (10/25/50/75/100%). (Interactive dragging is out of scope for the DS demo.)
 */
export default function Slider({ value }: SliderProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%` }]} />
      <View style={[styles.knob, { left: `${pct}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: 999, backgroundColor: "#E2E6E0", justifyContent: "center" },
  fill: { height: 6, borderRadius: 999, backgroundColor: color.accent.blue },
  knob: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: color.accent.blue,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

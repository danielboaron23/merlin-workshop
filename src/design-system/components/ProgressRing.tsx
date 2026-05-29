import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { color, fontFamily, palette } from "../tokens";
import Text from "./Text";

export type ProgressRingProps = {
  percent: number;
  size?: number;
  stroke?: number;
};

/** Circular progress ring with the % centered inside (Figma "precent"). */
export default function ProgressRing({ percent, size = 45, stroke = 4 }: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, percent)) / 100) * c;
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke="#D8E0DA" strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color.accent.green}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.label}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fontFamily.semibold, fontSize: 14, color: palette.ink700, textAlign: "center" },
});

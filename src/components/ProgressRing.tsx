import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors, font } from "../theme";

/**
 * Partial-fill progress ring with the % label centered INSIDE the ring
 * (matches the Figma "78%" component). Grey track + green arc from the top.
 */
export default function ProgressRing({
  percent,
  size = 45,
  stroke = 4,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (percent / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke="#D8E0DA" strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.green}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.text}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: font.semibold, fontSize: 14, color: colors.primary, textAlign: "center" },
});

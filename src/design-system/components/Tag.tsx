import { StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type TagProps = {
  label: string;
  /** light = white pill on colored cards (default), solid = grey pill */
  variant?: "light" | "solid";
};

/** Small pill label — e.g. "Coming soon" on the feature cards. */
export default function Tag({ label, variant = "light" }: TagProps) {
  return (
    <View style={[styles.base, variant === "solid" && styles.solid]}>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    backgroundColor: color.surface.bg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  solid: { backgroundColor: color.surface.secondary },
  label: { color: "#090909", fontFamily: undefined },
});

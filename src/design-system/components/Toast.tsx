import { CheckCircle, WarningCircle } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { radius, spacing } from "../tokens";
import Text from "./Text";

export type ToastProps = {
  message: string;
  type?: "positive" | "negative";
};

/** Inline toast — mirrors Figma "App/Toast [Mobile]" (positive / negative). */
export default function Toast({ message, type = "positive" }: ToastProps) {
  const positive = type === "positive";
  return (
    <View style={[styles.base, { backgroundColor: positive ? "#EEF7C9" : "#FBE3E4" }]}>
      {positive ? (
        <CheckCircle size={20} color="#3D7A1F" weight="fill" />
      ) : (
        <WarningCircle size={20} color="#C0392B" weight="fill" />
      )}
      <Text variant="paragraphSm" style={{ flex: 1, color: positive ? "#2F5314" : "#8B2A20" }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignSelf: "stretch",
  },
});

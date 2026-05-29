import { StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Button from "./Button";
import Text from "./Text";

export type DialogProps = {
  title: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

/** Confirmation dialog — mirrors Figma "Dialog pop-up [Mobile]". */
export default function Dialog({ title, confirmLabel, cancelLabel, onConfirm, onCancel }: DialogProps) {
  return (
    <View style={styles.card}>
      <Text variant="h7" center style={styles.title}>
        {title}
      </Text>
      <Button label={confirmLabel} variant="primary" fullWidth onPress={onConfirm} />
      <Button label={cancelLabel} variant="tertiary" fullWidth onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: color.surface.bg,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    gap: spacing.lg,
    alignItems: "center",
  },
  title: { marginBottom: spacing.md },
});

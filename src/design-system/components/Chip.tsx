import { X } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type ChipProps = {
  label: string;
  /** removable chip shows an × (Figma "Input-tag") */
  onRemove?: () => void;
  selected?: boolean;
};

/** Chip / input-tag — mirrors Figma "Chip [Mobile]" + "Input-tag [Mobile]". */
export default function Chip({ label, onRemove, selected }: ChipProps) {
  return (
    <View style={[styles.base, selected && styles.selected]}>
      <Text variant="caption" style={selected ? styles.selectedText : undefined}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable onPress={onRemove} hitSlop={8}>
          <X size={12} color={selected ? color.content.onBtnPrimary : color.content.primary} weight="bold" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: color.surface.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignSelf: "flex-start",
  },
  selected: { backgroundColor: color.surface.btnPrimary },
  selectedText: { color: color.content.onBtnPrimary },
});

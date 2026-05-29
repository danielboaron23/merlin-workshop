import { MagnifyingGlass } from "phosphor-react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { color, iconSize, radius, spacing, typography } from "../tokens";

export type SearchFieldProps = {
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
};

/** Grey rounded search input — mirrors the Figma "Search Field grey". */
export default function SearchField({
  value,
  onChangeText,
  placeholder = "Search",
}: SearchFieldProps) {
  return (
    <View style={styles.bar}>
      <MagnifyingGlass size={iconSize.lg} color="#2C2C2C" weight="regular" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#2C2C2C"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: color.surface.card,
    borderRadius: 30,
    paddingHorizontal: spacing.xl,
    height: 48,
  },
  input: { flex: 1, ...typography.paragraphMd, color: "#2C2C2C", padding: 0 },
});

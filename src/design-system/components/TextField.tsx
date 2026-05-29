import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { color, radius, spacing, typography } from "../tokens";
import Text from "./Text";

export type TextFieldState = "default" | "active" | "completed" | "disabled" | "error";
export type TextFieldSize = "default" | "small";

export type TextFieldProps = {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  helper?: string;
  errorText?: string;
  state?: TextFieldState; // force a state (otherwise derived from focus/value)
  size?: TextFieldSize;
  editable?: boolean;
};

/**
 * Text field — mirrors the Figma "Text field [Mobile]" set:
 * states default / active / completed / disabled / error, sizes default / small.
 */
export default function TextField({
  label,
  value = "",
  onChangeText,
  placeholder,
  helper,
  errorText,
  state,
  size = "default",
  editable = true,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const resolved: TextFieldState =
    state ??
    (!editable ? "disabled" : focused ? "active" : value ? "completed" : "default");

  const border = BORDER[resolved];
  const small = size === "small";

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text variant="paragraphSm" tone={resolved === "error" ? "primary" : "input"} style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.box,
          small ? styles.small : styles.default,
          { borderColor: border, backgroundColor: resolved === "disabled" ? color.surface.card : color.surface.bg },
        ]}
      >
        <TextInput
          style={[small ? typography.paragraphSm : typography.paragraphMd, styles.input]}
          value={value}
          editable={editable && resolved !== "disabled"}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={color.content.input}
        />
      </View>
      {resolved === "error" && errorText ? (
        <Text variant="caption" style={styles.error}>
          {errorText}
        </Text>
      ) : helper ? (
        <Text variant="caption" tone="input">
          {helper}
        </Text>
      ) : null}
    </View>
  );
}

const BORDER: Record<TextFieldState, string> = {
  default: color.border.row,
  active: color.accent.blue,
  completed: color.border.row,
  disabled: color.border.hairline,
  error: "#E5484D",
};

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm, alignSelf: "stretch" },
  label: {},
  box: { borderWidth: 1, borderRadius: radius.md, paddingHorizontal: spacing.xl, justifyContent: "center" },
  default: { height: 52 },
  small: { height: 38, paddingHorizontal: spacing.lg },
  input: { color: color.content.primary, padding: 0 },
  error: { color: "#E5484D" },
});

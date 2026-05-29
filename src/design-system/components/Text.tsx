import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { color, typography, TypographyVariant } from "../tokens";

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  /** semantic color role; defaults to primary content */
  tone?: "primary" | "heading" | "secondaryHeading" | "input" | "onDark" | "disabled";
  center?: boolean;
};

const toneColor = {
  primary: color.content.primary,
  heading: color.content.heading,
  secondaryHeading: color.content.secondaryHeading,
  input: color.content.input,
  onDark: color.content.onBtnPrimary,
  disabled: color.content.disabled,
};

/** Typed text primitive — always use this instead of raw <Text>. */
export default function Text({
  variant = "paragraphMd",
  tone = "primary",
  center,
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[typography[variant], { color: toneColor[tone] }, center && styles.center, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({ center: { textAlign: "center" } });

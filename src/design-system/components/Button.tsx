import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { color, radius, spacing, typography } from "../tokens";
import Text from "./Text";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "default" | "subtle";

export type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
};

/**
 * App button — mirrors the Figma "App button [Mobile]" component set.
 * Variants: primary (dark), secondary (grey), tertiary (transparent).
 * States: default, pressed (opacity), disabled, loading.
 */
export default function Button({
  label,
  variant = "primary",
  size = "default",
  disabled = false,
  loading = false,
  leftIcon,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const v = VARIANT[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        size === "subtle" ? styles.subtle : styles.default,
        { backgroundColor: v.bg },
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <View style={styles.row}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            style={[
              size === "subtle" ? typography.buttonSubtle : typography.button,
              { color: isDisabled ? color.content.disabled : v.fg },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const VARIANT: Record<ButtonVariant, { bg: string; fg: string }> = {
  primary: { bg: color.surface.btnPrimary, fg: color.content.onBtnPrimary },
  secondary: { bg: color.surface.btnSecondary, fg: color.content.onBtnSecondary },
  tertiary: { bg: "transparent", fg: color.content.onBtnTertiary },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.c40,
    alignItems: "center",
    justifyContent: "center",
  },
  default: { height: 56, paddingHorizontal: spacing.xxxl, minWidth: 234 },
  subtle: { height: 40, paddingHorizontal: spacing.xl },
  fullWidth: { alignSelf: "stretch", minWidth: 0 },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  icon: { marginRight: 2 },
  pressed: { opacity: 0.85 },
  disabled: { backgroundColor: color.surface.secondary },
});

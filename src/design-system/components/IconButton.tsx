import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { color, radius, shadow } from "../tokens";

export type IconButtonProps = Omit<PressableProps, "style"> & {
  icon: ReactNode;
  /** plain (no bg), surface (grey circle), or glass (white w/ shadow) */
  variant?: "plain" | "surface" | "glass";
  size?: number;
  disabled?: boolean;
};

/** Circular icon-only button (bell, help, filter, the editor "+"/arrow). */
export default function IconButton({
  icon,
  variant = "plain",
  size = 48,
  disabled,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: radius.pill },
        variant === "surface" && styles.surface,
        variant === "glass" && styles.glass,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
  surface: { backgroundColor: color.surface.card },
  glass: { backgroundColor: "rgba(254,255,251,0.9)", ...shadow.tertiary },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
});

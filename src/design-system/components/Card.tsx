import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { color, radius, spacing } from "../tokens";

export type CardProps = {
  children: ReactNode;
  /** surface = grey panel (default), plain = app-bg, custom bg via `background` */
  variant?: "surface" | "plain";
  background?: string;
  padding?: number;
  style?: ViewStyle | ViewStyle[];
};

/** Rounded container used for panels, list cards and feature tiles. */
export default function Card({
  children,
  variant = "surface",
  background,
  padding = spacing.xl,
  style,
}: CardProps) {
  const bg = background ?? (variant === "surface" ? color.surface.card : color.surface.bg);
  return <View style={[styles.base, { backgroundColor: bg, padding }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg },
});

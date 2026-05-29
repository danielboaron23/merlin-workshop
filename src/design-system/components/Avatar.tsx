import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { color, radius, typography } from "../tokens";
import Text from "./Text";

export type AvatarProps = {
  /** image takes priority; otherwise initials are shown on a lilac circle */
  source?: ImageSourcePropType;
  initials?: string;
  size?: number;
};

/** Round avatar — photo (profile) or lilac initials (leads). */
export default function Avatar({ source, initials, size = 50 }: AvatarProps) {
  const dim = { width: size, height: size, borderRadius: radius.pill };
  if (source) return <Image source={source} style={dim} />;
  return (
    <View style={[styles.fallback, dim]}>
      <Text style={[typography.h7, styles.initials]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { backgroundColor: color.accent.lilac, alignItems: "center", justifyContent: "center" },
  initials: { color: color.content.primary },
});

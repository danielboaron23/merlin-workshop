import { LinearGradient } from "expo-linear-gradient";
import { Check } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { color, gradient, radius, shadow, spacing } from "../tokens";
import ChannelGlyph, { CHANNEL_LABEL, ChannelKey, channelTint } from "./ChannelGlyph";
import Text from "./Text";

export type ChannelCardProps = {
  channel: ChannelKey;
  description: string;
  selected?: boolean;
  tagline?: string;
  onPress?: () => void;
};

/** Soft channel-tint wash for the selected card background (tokens-derived). */
const WASH: Record<ChannelKey, string> = {
  google: "#EEF3FE",
  instagram: "#FCEEF4",
  facebook: "#EAF1FE",
};

/**
 * Selectable, channel-branded card for the Concept B channel hub (dial 6-7).
 * Expressive: a channel-tinted icon tile (Instagram gets its real gradient), a
 * left accent bar + tint wash + elevation when selected, and a filled check in
 * the channel color. Tokens only.
 */
export default function ChannelCard({
  channel,
  description,
  selected,
  tagline,
  onPress,
}: ChannelCardProps) {
  const tint = channelTint(channel);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!selected }}
      accessibilityLabel={CHANNEL_LABEL[channel]}
      style={({ pressed }) => [
        styles.base,
        selected
          ? { borderColor: tint, backgroundColor: WASH[channel], ...shadow.card }
          : null,
        pressed && styles.pressed,
      ]}
    >
      {/* left accent bar when selected */}
      {selected ? <View style={[styles.accent, { backgroundColor: tint }]} /> : null}

      {/* icon tile: Instagram uses its gradient; others a tinted/solid wash */}
      {channel === "instagram" ? (
        <LinearGradient
          colors={gradient.instagram.colors}
          start={gradient.instagram.start}
          end={gradient.instagram.end}
          style={styles.glyphTile}
        >
          <ChannelGlyph channel="instagram" size={28} color={color.content.onBtnPrimary} />
        </LinearGradient>
      ) : (
        <View style={[styles.glyphTile, { backgroundColor: selected ? tint : color.surface.card }]}>
          <ChannelGlyph channel={channel} size={28} color={selected ? color.content.onBtnPrimary : tint} />
        </View>
      )}

      <View style={styles.body}>
        <Text variant="h7">{CHANNEL_LABEL[channel]}</Text>
        <Text variant="paragraphSm" tone="input">{description}</Text>
        {tagline ? (
          <View style={[styles.tag, { backgroundColor: tint + "1F" }]}>
            <Text variant="caption" style={{ color: tint }}>{tagline}</Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.check, selected ? { backgroundColor: tint, borderColor: tint } : null]}>
        {selected ? <Check size={14} color={color.content.onBtnPrimary} weight="bold" /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    backgroundColor: color.surface.bg,
    borderWidth: 1.5,
    borderColor: color.border.hairline,
    borderRadius: radius.lg,
    padding: spacing.lg,
    paddingLeft: spacing.xl,
    overflow: "hidden",
  },
  pressed: { opacity: 0.9 },
  accent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 5 },
  glyphTile: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 4 },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: color.border.row,
    alignItems: "center",
    justifyContent: "center",
  },
});

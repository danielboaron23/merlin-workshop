import { Check } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import ChannelGlyph, { CHANNEL_LABEL, ChannelKey, channelTint } from "./ChannelGlyph";
import Text from "./Text";

export type ChannelCardProps = {
  channel: ChannelKey;
  description: string;
  selected?: boolean;
  /** shown small under the title, e.g. "High intent" */
  tagline?: string;
  onPress?: () => void;
};

/**
 * Selectable, channel-branded card for the Concept B channel hub.
 * A channel-tinted glyph tile + title + description, with a selected state that
 * adopts the channel's accent (border + check). Tokens only.
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
        selected && { borderColor: tint, backgroundColor: color.surface.bg },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.glyphTile, { backgroundColor: selected ? tint + "1A" : color.surface.card }]}>
        <ChannelGlyph channel={channel} size={28} />
      </View>

      <View style={styles.body}>
        <Text variant="h7">{CHANNEL_LABEL[channel]}</Text>
        <Text variant="paragraphSm" tone="input">{description}</Text>
        {tagline ? (
          <View style={[styles.tag, { backgroundColor: tint + "1A" }]}>
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
    borderColor: color.border.row,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  pressed: { opacity: 0.9 },
  glyphTile: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 4 },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginTop: 2,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: color.border.row,
    alignItems: "center",
    justifyContent: "center",
  },
});

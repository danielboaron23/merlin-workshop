import { StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import ChannelGlyph, { CHANNEL_LABEL, ChannelKey, channelTint } from "./ChannelGlyph";
import Text from "./Text";

export type BudgetSegment = { channel: ChannelKey; pct: number };

export type BudgetSplitBarProps = {
  /** segments should sum to ~100 */
  segments: BudgetSegment[];
  /** monthly total, for the per-channel amount in the legend */
  total: number;
};

/**
 * Segmented bar that visualizes how one budget is split across channels, with a
 * legend (channel glyph, name, % and $). Each segment uses the channel tint.
 * Tokens only.
 */
export default function BudgetSplitBar({ segments, total }: BudgetSplitBarProps) {
  return (
    <View style={{ gap: spacing.lg }}>
      <View style={styles.bar}>
        {segments.map((s, i) => (
          <View
            key={s.channel}
            style={{
              width: `${s.pct}%`,
              backgroundColor: channelTint(s.channel),
              borderRightWidth: i < segments.length - 1 ? 2 : 0,
              borderRightColor: color.surface.bg,
            }}
          />
        ))}
      </View>

      <View style={{ gap: spacing.md }}>
        {segments.map((s) => (
          <View key={s.channel} style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <ChannelGlyph channel={s.channel} size={18} />
              <Text variant="paragraphSm">{CHANNEL_LABEL[s.channel]}</Text>
            </View>
            <Text variant="paragraphSm" tone="input">
              {s.pct}% · ${Math.round((s.pct / 100) * total)}/mo
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 14,
    borderRadius: radius.pill,
    overflow: "hidden",
    backgroundColor: color.surface.card,
  },
  legendRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  legendLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
});

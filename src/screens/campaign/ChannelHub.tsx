import { LinearGradient } from "expo-linear-gradient";
import { Sparkle } from "phosphor-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../../components/AppBar";
import {
  Button,
  ChannelCard,
  ChannelGlyph,
  ChannelKey,
  Text,
  color,
  gradient,
  radius,
  spacing,
} from "../../design-system";
import { CHANNEL_INFO, CHANNEL_ORDER } from "./channelDraft";

/**
 * Concept B signature screen: the channel hub. Pick one channel or combine a few;
 * Merlin builds and runs the ads. Selecting 2+ reveals the smart-combine hint and
 * a stacked-glyph "combined" cue. (docs/PRD-campaigns-concept-b.md §3)
 */
export default function ChannelHub({
  selected,
  onToggle,
  onContinue,
}: {
  selected: ChannelKey[];
  onToggle: (c: ChannelKey) => void;
  onContinue: () => void;
}) {
  const count = selected.length;
  const ordered = CHANNEL_ORDER.filter((c) => selected.includes(c));

  const ctaLabel =
    count === 0
      ? "Pick at least one channel"
      : count === 1
      ? `Set up ${labelFor(selected[0])}`
      : `Combine ${count} channels`;

  return (
    <View style={styles.screen}>
      <AppBar title="Campaigns" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text variant="h3">Where do you want to grow?</Text>
          <Text variant="paragraphMd" tone="secondaryHeading">
            Pick a channel, or combine a few. Merlin builds and runs the ads for you.
          </Text>
        </View>

        <View style={{ gap: spacing.lg }}>
          {CHANNEL_ORDER.map((c) => (
            <ChannelCard
              key={c}
              channel={c}
              description={CHANNEL_INFO[c].description}
              tagline={CHANNEL_INFO[c].tagline}
              selected={selected.includes(c)}
              onPress={() => onToggle(c)}
            />
          ))}
        </View>

        {count >= 2 ? (
          <LinearGradient
            colors={gradient.brand.colors}
            start={gradient.brand.start}
            end={gradient.brand.end}
            style={styles.combine}
          >
            <View style={styles.combineGlyphs}>
              {ordered.map((c, i) => (
                <View key={c} style={[styles.glyphChip, { marginLeft: i === 0 ? 0 : -spacing.md }]}>
                  <ChannelGlyph channel={c} size={18} />
                </View>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h7" tone="onDark">Smart combine</Text>
              <Text variant="paragraphSm" tone="onDark" style={styles.combineSub}>
                One budget. Merlin balances it across the channels you pick.
              </Text>
            </View>
            <Sparkle size={20} color={color.content.onBtnPrimary} weight="fill" />
          </LinearGradient>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button label={ctaLabel} variant="primary" fullWidth disabled={count === 0} onPress={onContinue} />
      </View>
    </View>
  );
}

function labelFor(c: ChannelKey) {
  return c === "google" ? "Google Ads" : c === "instagram" ? "Instagram" : "Facebook";
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.surface.bg },
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.huge, gap: spacing.xl },
  titleBlock: { gap: spacing.md },
  footer: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xl },

  combine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  combineGlyphs: { flexDirection: "row", alignItems: "center" },
  glyphChip: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: color.surface.bg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.surface.bg,
  },
  combineSub: { opacity: 0.92 },
});

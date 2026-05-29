import { LinearGradient } from "expo-linear-gradient";
import { Sparkle } from "phosphor-react-native";
import { useEffect } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
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

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Concept B signature screen — the channel hub (dial 6-7, expressive).
 * Hero header, tactile channel cards (multi-select), a smart-combine banner that
 * animates in at 2+, and a sticky summary footer with the selected channels and
 * an adaptive CTA. (docs/PRD-campaigns-concept-b.md §3)
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

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.create(180, "easeInEaseOut", "opacity"));
  }, [count]);

  const toggle = (c: ChannelKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.create(180, "easeInEaseOut", "opacity"));
    onToggle(c);
  };

  const ctaLabel =
    count === 0
      ? "Pick a channel to start"
      : count === 1
      ? `Set up ${labelFor(selected[0])}`
      : `Combine ${count} channels`;

  return (
    <View style={styles.screen}>
      <AppBar title="Campaigns" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text variant="h3">Where do you{"\n"}want to grow?</Text>
          <Text variant="paragraphMd" tone="secondaryHeading">
            Pick a channel, or combine a few. Merlin builds and runs the ads for you.
          </Text>
        </View>

        <View style={styles.cards}>
          {CHANNEL_ORDER.map((c) => (
            <ChannelCard
              key={c}
              channel={c}
              description={CHANNEL_INFO[c].description}
              tagline={CHANNEL_INFO[c].tagline}
              selected={selected.includes(c)}
              onPress={() => toggle(c)}
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
                <View key={c} style={[styles.glyphChip, i > 0 && styles.glyphChipOverlap]}>
                  <ChannelGlyph channel={c} size={18} />
                </View>
              ))}
            </View>
            <View style={styles.combineText}>
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
        {count > 0 ? (
          <View style={styles.summary}>
            <View style={styles.summaryGlyphs}>
              {ordered.map((c, i) => (
                <View key={c} style={[styles.summaryChip, i > 0 && styles.summaryChipOverlap]}>
                  <ChannelGlyph channel={c} size={15} />
                </View>
              ))}
            </View>
            <Text variant="paragraphSm" tone="input">
              {count === 1 ? "1 channel selected" : `${count} channels selected`}
            </Text>
          </View>
        ) : null}
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
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.huge, gap: spacing.xxl },
  hero: { gap: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs },
  cards: { gap: spacing.lg },

  combine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  combineGlyphs: { flexDirection: "row", alignItems: "center" },
  combineText: { flex: 1 },
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
  glyphChipOverlap: { marginLeft: -spacing.md },
  combineSub: { opacity: 0.92 },

  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: color.border.hairline,
    backgroundColor: color.surface.bg,
  },
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  summaryGlyphs: { flexDirection: "row", alignItems: "center" },
  summaryChip: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: color.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.surface.bg,
  },
  summaryChipOverlap: { marginLeft: -spacing.sm },
});

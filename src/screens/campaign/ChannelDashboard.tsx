import { ArrowRight, Pause, PencilSimple, Play, Sparkle, Stop } from "phosphor-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../../components/AppBar";
import {
  Button,
  Card,
  ChannelGlyph,
  CHANNEL_LABEL,
  Dialog,
  Text,
  color,
  radius,
  spacing,
} from "../../design-system";
import { ChannelDraft, budgetSplit } from "./channelDraft";
import { tierByKey } from "./draft";

type Status = "learning" | "live" | "paused";
const STATUS_META: Record<Status, { label: string; dot: string; note: string }> = {
  learning: { label: "Learning", dot: color.accent.blue, note: "Your ads are optimizing. This usually takes about 7 days." },
  live: { label: "Live", dot: color.accent.green, note: "Your ads are running and finding new customers." },
  paused: { label: "Paused", dot: color.content.input, note: "Your ads are paused. You are not being charged." },
};

export default function ChannelDashboard({
  draft, onEdit, onEnd,
}: {
  draft: ChannelDraft; onEdit: () => void; onEnd: () => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const split = budgetSplit(draft.channels, draft.goal);
  const [status, setStatus] = useState<Status>("learning");
  const [confirmEnd, setConfirmEnd] = useState(false);

  const spent = Math.round(tier.monthly * 0.35);
  const totalLeads = Math.max(2, Math.round(tier.estLeadsLow * 0.4));
  const paused = status === "paused";
  const meta = STATUS_META[status];

  // Per-channel mock figures derived from the split.
  const perChannel = split.map((s, i) => {
    const leads = Math.max(1, Math.round((totalLeads * s.pct) / 100) + (i === 1 ? 1 : 0));
    const cspend = Math.round((spent * s.pct) / 100);
    return { channel: s.channel, pct: s.pct, leads, costPerLead: leads ? Math.round(cspend / leads) : 0 };
  });
  const cheapest = perChannel.reduce((a, b) => (b.costPerLead < a.costPerLead ? b : a), perChannel[0]);

  return (
    <View style={styles.screen}>
      <AppBar title="Campaigns" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Card background={color.surface.card} style={styles.hero}>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: meta.dot }]} />
            <Text variant="h7">{meta.label}</Text>
            <View style={styles.heroGlyphs}>
              {draft.channels.map((c) => <ChannelGlyph key={c} channel={c} size={18} />)}
            </View>
          </View>
          <View style={styles.spendRow}>
            <Text variant="h3">${spent}</Text>
            <Text variant="paragraphMd" tone="input"> of ${tier.monthly} this month</Text>
          </View>
        </Card>

        <View style={styles.noteRow}>
          <Sparkle size={16} color={color.accent.blue} weight="fill" />
          <Text variant="paragraphSm" tone="secondaryHeading" style={{ flex: 1 }}>{meta.note}</Text>
        </View>

        <View style={styles.metricsRow}>
          <Card background={color.surface.card} style={styles.metric}>
            <Text variant="h3">{totalLeads}</Text>
            <Text variant="paragraphSm" tone="input">New leads</Text>
          </Card>
          <Card background={color.surface.card} style={styles.metric}>
            <Text variant="h3">${cheapest.costPerLead}</Text>
            <Text variant="paragraphSm" tone="input">Best cost per lead</Text>
          </Card>
        </View>

        {/* Per-channel breakdown */}
        <Text variant="h6">By channel</Text>
        <View style={{ gap: spacing.lg }}>
          {perChannel.map((p) => (
            <Card key={p.channel} style={styles.channelRow}>
              <View style={styles.channelGlyphTile}>
                <ChannelGlyph channel={p.channel} size={22} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="h7">{CHANNEL_LABEL[p.channel]}</Text>
                <Text variant="paragraphSm" tone="input">{p.leads} leads · ${p.costPerLead}/lead · {p.pct}% of budget</Text>
              </View>
            </Card>
          ))}
        </View>

        {draft.channels.length > 1 ? (
          <Card background={color.surface.card} style={styles.insight}>
            <Sparkle size={16} color={color.accent.blue} weight="fill" />
            <Text variant="paragraphSm" tone="secondaryHeading" style={{ flex: 1 }}>
              {CHANNEL_LABEL[cheapest.channel].replace(" Ads", "")} is bringing the cheapest leads. Merlin
              is shifting more budget there.
            </Text>
          </Card>
        ) : null}

        <View style={{ gap: spacing.lg }}>
          <Button label={paused ? "Resume campaign" : "Pause campaign"} variant="secondary" fullWidth
            leftIcon={paused ? <Play size={18} color={color.content.onBtnSecondary} weight="fill" /> : <Pause size={18} color={color.content.onBtnSecondary} weight="fill" />}
            onPress={() => setStatus(paused ? "live" : "paused")} />
          <Button label="Edit campaign" variant="secondary" fullWidth
            leftIcon={<PencilSimple size={18} color={color.content.onBtnSecondary} />} onPress={onEdit} />
          <Button label="End campaign" variant="tertiary" fullWidth
            leftIcon={<Stop size={18} color={color.content.onBtnTertiary} />} onPress={() => setConfirmEnd(true)} />
        </View>

        <Card background={color.surface.card} style={styles.leadsNudge}>
          <View style={{ flex: 1 }}>
            <Text variant="h7">See who reached out</Text>
            <Text variant="paragraphSm" tone="input">New leads land in your inbox.</Text>
          </View>
          <ArrowRight size={20} color={color.content.primary} weight="bold" />
        </Card>
      </ScrollView>

      {confirmEnd ? (
        <View style={styles.dialogScrim}>
          <Dialog title="End this campaign?" confirmLabel="End campaign" cancelLabel="Keep it running"
            onConfirm={() => { setConfirmEnd(false); onEnd(); }} onCancel={() => setConfirmEnd(false)} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.surface.bg },
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.huge, gap: spacing.xl },

  hero: { gap: spacing.md },
  statusRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  dot: { width: 9, height: 9, borderRadius: radius.pill },
  heroGlyphs: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginLeft: "auto" },
  spendRow: { flexDirection: "row", alignItems: "flex-end" },

  noteRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, paddingHorizontal: spacing.xs },

  metricsRow: { flexDirection: "row", gap: spacing.lg },
  metric: { flex: 1, gap: spacing.xs },

  channelRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  channelGlyphTile: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: color.surface.card,
    alignItems: "center", justifyContent: "center",
  },

  insight: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md },
  leadsNudge: { flexDirection: "row", alignItems: "center", gap: spacing.md },

  dialogScrim: {
    ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(21,21,29,0.45)",
    alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl,
  },
});

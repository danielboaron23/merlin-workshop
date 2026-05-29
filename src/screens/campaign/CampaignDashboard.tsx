import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRight,
  Pause,
  PencilSimple,
  Play,
  Sparkle,
  Stop,
} from "phosphor-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../../components/AppBar";
import GoogleAdCard from "../../components/GoogleAdCard";
import {
  Button,
  Card,
  Dialog,
  Text,
  color,
  gradient,
  radius,
  spacing,
} from "../../design-system";
import { CampaignDraft, tierByKey } from "./draft";

type Status = "learning" | "live" | "paused";

const STATUS_META: Record<Status, { label: string; dot: string; note: string }> = {
  learning: {
    label: "Learning",
    dot: color.accent.blue,
    note: "Google is optimizing your ad. This usually takes about 7 days.",
  },
  live: { label: "Live", dot: color.accent.green, note: "Your ad is running and finding new customers." },
  paused: { label: "Paused", dot: color.content.input, note: "Your ad is paused. You are not being charged." },
};

/** A single plain-language metric tile. */
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <Card background={color.surface.card} style={styles.metric}>
      <Text variant="h3">{value}</Text>
      <Text variant="paragraphSm" tone="input">{label}</Text>
    </Card>
  );
}

export default function CampaignDashboard({
  draft,
  onEdit,
  onEnd,
}: {
  draft: CampaignDraft;
  onEdit: () => void;
  onEnd: () => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const [status, setStatus] = useState<Status>("learning");
  const [confirmEnd, setConfirmEnd] = useState(false);

  // Mock month-to-date figures, consistent with the chosen budget.
  const spent = Math.round(tier.monthly * 0.35);
  const leads = Math.max(2, Math.round(tier.estLeadsLow * 0.4));
  const costPerLead = leads > 0 ? Math.round(spent / leads) : 0;
  const paused = status === "paused";
  const meta = STATUS_META[status];

  return (
    <View style={styles.screen}>
      <AppBar title="Campaigns" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Status + spend hero */}
        <LinearGradient colors={gradient.brand.colors} start={gradient.brand.start} end={gradient.brand.end} style={styles.hero}>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: meta.dot }]} />
            <Text variant="h7" tone="onDark">{meta.label}</Text>
          </View>
          <Text variant="h3" tone="onDark" style={styles.spend}>${spent}</Text>
          <Text variant="paragraphSm" tone="onDark" style={styles.spendSub}>
            spent of ${tier.monthly} this month
          </Text>
        </LinearGradient>

        <View style={styles.noteRow}>
          <Sparkle size={16} color={color.accent.blue} weight="fill" />
          <Text variant="paragraphSm" tone="secondaryHeading" style={{ flex: 1 }}>{meta.note}</Text>
        </View>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <Metric value={`${leads}`} label="New leads" />
          <Metric value={`$${costPerLead}`} label="Cost per lead" />
        </View>

        {/* The running ad */}
        <Text variant="h6">Your ad</Text>
        <Card style={styles.adCard}>
          <GoogleAdCard scale={0.95} title={draft.headline} description={draft.description} />
        </Card>

        {/* Actions */}
        <View style={{ gap: spacing.lg }}>
          <Button
            label={paused ? "Resume campaign" : "Pause campaign"}
            variant="secondary"
            fullWidth
            leftIcon={
              paused ? (
                <Play size={18} color={color.content.onBtnSecondary} weight="fill" />
              ) : (
                <Pause size={18} color={color.content.onBtnSecondary} weight="fill" />
              )
            }
            onPress={() => setStatus(paused ? "live" : "paused")}
          />
          <Button
            label="Edit campaign"
            variant="secondary"
            fullWidth
            leftIcon={<PencilSimple size={18} color={color.content.onBtnSecondary} />}
            onPress={onEdit}
          />
          <Button
            label="End campaign"
            variant="tertiary"
            fullWidth
            leftIcon={<Stop size={18} color={color.content.onBtnTertiary} />}
            onPress={() => setConfirmEnd(true)}
          />
        </View>

        {/* View leads nudge */}
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
          <Dialog
            title="End this campaign?"
            confirmLabel="End campaign"
            cancelLabel="Keep it running"
            onConfirm={() => {
              setConfirmEnd(false);
              onEnd();
            }}
            onCancel={() => setConfirmEnd(false)}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.surface.bg },
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.huge, gap: spacing.xl },

  hero: { borderRadius: radius.xl, padding: spacing.xxl, gap: spacing.sm },
  statusRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  dot: { width: 9, height: 9, borderRadius: radius.pill },
  spend: { marginTop: spacing.md },
  spendSub: { opacity: 0.9 },

  noteRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, paddingHorizontal: spacing.xs },

  metricsRow: { flexDirection: "row", gap: spacing.lg },
  metric: { flex: 1, gap: spacing.xs },

  adCard: { alignItems: "center" },

  leadsNudge: { flexDirection: "row", alignItems: "center", gap: spacing.md },

  dialogScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(21,21,29,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
});

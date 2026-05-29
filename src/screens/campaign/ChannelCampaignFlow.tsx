import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowClockwise,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  Globe,
  MapPin,
  Phone,
  Sparkle,
  TrendUp,
} from "phosphor-react-native";
import { ComponentType, ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { images } from "../../assets";
import GoogleAdCard from "../../components/GoogleAdCard";
import {
  BudgetSplitBar,
  Button,
  Card,
  ChannelGlyph,
  ChannelKey,
  Chip,
  CHANNEL_LABEL,
  FacebookPreview,
  InstagramPreview,
  OptionCard,
  SegmentedControl,
  Slider,
  StepHeader,
  Text,
  TextField,
  color,
  gradient,
  radius,
  spacing,
} from "../../design-system";
import {
  BUDGET_TIERS,
  ChannelDraft,
  budgetSplit,
  monthlyTotal,
} from "./channelDraft";
import { GOALS, Goal, goalByKey, tierByKey } from "./draft";

const GOAL_ICON: Record<Goal, ComponentType<{ size: number; color: string }>> = {
  bookings: CalendarCheck, calls: Phone, visits: TrendUp,
};

type StepKey = "goal" | "review" | "location" | "budget" | "confirm" | "payment" | "success";
const ORDER: StepKey[] = ["goal", "review", "location", "budget", "confirm", "payment", "success"];
const STEP_NUMBER: Record<StepKey, number | undefined> = {
  goal: 1, review: 2, location: 3, budget: 4, confirm: 5, payment: 6, success: undefined,
};
const TOTAL = 6;

function StepFrame({ stepKey, onBack, onClose, children, footer }: {
  stepKey: StepKey; onBack?: () => void; onClose?: () => void; children: ReactNode; footer: ReactNode;
}) {
  return (
    <View style={styles.frame}>
      <StepHeader step={STEP_NUMBER[stepKey] ?? 1} total={TOTAL} onBack={onBack} onClose={onClose} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      <View style={styles.footer}>{footer}</View>
    </View>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.titleBlock}>
      <Text variant="h3">{title}</Text>
      {subtitle ? <Text variant="paragraphMd" tone="secondaryHeading">{subtitle}</Text> : null}
    </View>
  );
}

export default function ChannelCampaignFlow({
  draft, setDraft, onClose, onLaunched,
}: {
  draft: ChannelDraft;
  setDraft: (d: ChannelDraft) => void;
  onClose: () => void;
  onLaunched: (d: ChannelDraft) => void;
}) {
  const [stepKey, setStepKey] = useState<StepKey>("goal");
  const set = (patch: Partial<ChannelDraft>) => setDraft({ ...draft, ...patch });

  const idx = ORDER.indexOf(stepKey);
  const go = (k: StepKey) => setStepKey(k);
  const next = () => go(ORDER[Math.min(idx + 1, ORDER.length - 1)]);
  const back = () => (idx <= 0 ? onClose() : go(ORDER[idx - 1]));

  switch (stepKey) {
    case "goal":
      return <GoalStep draft={draft} onPick={(g) => set({ goal: g })} onBack={onClose} onClose={onClose} onNext={next} />;
    case "review":
      return <ReviewStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "location":
      return <LocationStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "budget":
      return <BudgetStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "confirm":
      return <ConfirmStep draft={draft} onBack={back} onClose={onClose} onNext={next} onEdit={go} />;
    case "payment":
      return <PaymentStep draft={draft} onBack={back} onClose={onClose} onLaunch={() => go("success")} />;
    case "success":
      return <SuccessStep draft={draft} onDone={() => onLaunched(draft)} />;
  }
}

/* ------------------------------------------------------------------ Goal */
function GoalStep({ draft, onPick, onBack, onClose, onNext }: {
  draft: ChannelDraft; onPick: (g: Goal) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  return (
    <StepFrame stepKey="goal" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="What do you want more of?" subtitle="We'll set up your campaign around this goal." />
      <ChannelStrip channels={draft.channels} />
      <View style={{ gap: spacing.lg }}>
        {GOALS.map((g) => {
          const Icon = GOAL_ICON[g.key];
          return (
            <OptionCard key={g.key} title={g.title} subtitle={g.subtitle}
              icon={<Icon size={22} color={color.content.primary} />}
              badge={g.key === "bookings" ? "Recommended" : undefined}
              selected={draft.goal === g.key} onPress={() => onPick(g.key)} />
          );
        })}
      </View>
    </StepFrame>
  );
}

/* ------------------------------------------------------------ Review ad */
function ReviewStep({ draft, set, onBack, onClose, onNext }: {
  draft: ChannelDraft; set: (p: Partial<ChannelDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const [drafting, setDrafting] = useState(true);
  const [tab, setTab] = useState<ChannelKey>(draft.channels[0]);
  useEffect(() => {
    const t = setTimeout(() => setDrafting(false), 1300);
    return () => clearTimeout(t);
  }, []);

  if (drafting) {
    return (
      <StepFrame stepKey="review" onBack={onBack} onClose={onClose} footer={<Button label="Looks good" variant="primary" fullWidth disabled />}>
        <View style={styles.draftingWrap}>
          <View style={styles.draftingIcon}><Sparkle size={28} color={color.accent.blue} weight="fill" /></View>
          <Text variant="h6" center>Merlin is creating your ads…</Text>
          <Text variant="paragraphSm" tone="input" center>One set of content, ready for every channel.</Text>
          <ActivityIndicator color={color.accent.blue} style={{ marginTop: spacing.md }} />
        </View>
      </StepFrame>
    );
  }

  const multi = draft.channels.length > 1;
  const activeTab = draft.channels.includes(tab) ? tab : draft.channels[0];

  return (
    <StepFrame stepKey="review" onBack={onBack} onClose={onClose}
      footer={<Button label="Looks good" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Review your ads"
        subtitle={multi ? "Same content, shown the way each channel does it. Edit anything." : "Merlin drafted this for you. Edit anything you like."} />

      {multi ? (
        <SegmentedControl
          value={activeTab}
          onChange={(k) => setTab(k as ChannelKey)}
          segments={draft.channels.map((c) => ({
            key: c, label: CHANNEL_LABEL[c].replace(" Ads", ""),
            icon: <ChannelGlyph channel={c} size={16} />,
          }))}
        />
      ) : null}

      <ChannelPreviewFor channel={activeTab} draft={draft} />

      <View style={styles.aiNote}>
        <Sparkle size={14} color={color.accent.blue} weight="fill" />
        <Text variant="caption" tone="input">AI-drafted. Review before you launch.</Text>
      </View>

      <TextField label="Headline" value={draft.headline} onChangeText={(t) => set({ headline: t })} />
      <TextField label="Caption" value={draft.caption} onChangeText={(t) => set({ caption: t })} />

      {draft.channels.includes("google") ? (
        <View style={{ gap: spacing.md }}>
          <Text variant="paragraphSm" tone="input">Google: when people search for these, your ad can show</Text>
          <View style={styles.chipsWrap}>
            {draft.keywordThemes.map((t) => (
              <Chip key={t} label={t} onRemove={() => set({ keywordThemes: draft.keywordThemes.filter((x) => x !== t) })} />
            ))}
          </View>
        </View>
      ) : null}

      <Button label="Regenerate" variant="secondary" size="subtle"
        leftIcon={<ArrowClockwise size={16} color={color.content.onBtnSecondary} weight="bold" />}
        onPress={() => set({ headline: "Book your nails today", caption: "Gel manicures, nail art and natural nail care in Manhattan. Book online in seconds." })} />
    </StepFrame>
  );
}

function ChannelPreviewFor({ channel, draft }: { channel: ChannelKey; draft: ChannelDraft }) {
  if (channel === "google") {
    return (
      <LinearGradient colors={gradient.brand.colors} start={gradient.brand.start} end={gradient.brand.end} style={styles.previewHero}>
        <View style={styles.previewGlass}>
          <GoogleAdCard scale={0.95} title={draft.headline} description={draft.caption} />
        </View>
      </LinearGradient>
    );
  }
  if (channel === "instagram") {
    return <InstagramPreview handle="artup.nails" photo={images.nailPhoto} headline={draft.headline} caption={draft.caption} />;
  }
  return <FacebookPreview handle="Art Up Nail Studio" photo={images.nailPhoto} headline={draft.headline} caption={draft.caption} />;
}

/* -------------------------------------------------------------- Location */
function LocationStep({ draft, set, onBack, onClose, onNext }: {
  draft: ChannelDraft; set: (p: Partial<ChannelDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const radii = [5, 10, 25, 50];
  return (
    <StepFrame stepKey="location" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Who should see it?" subtitle="One audience, across every channel you picked." />
      <ChannelStrip channels={draft.channels} />

      <Card style={{ gap: spacing.lg }}>
        <View style={styles.rowBetween}>
          <View style={styles.locRow}>
            <MapPin size={20} color={color.content.primary} />
            <Text variant="h7">Within {draft.locationRadiusKm} km</Text>
          </View>
          <Text variant="paragraphSm" tone="input">of Manhattan</Text>
        </View>
        <Slider value={(draft.locationRadiusKm / 50) * 100} />
        <View style={styles.radiiRow}>
          {radii.map((r) => (
            <Button key={r} label={`${r} km`} size="subtle"
              variant={draft.locationRadiusKm === r ? "primary" : "secondary"}
              onPress={() => set({ locationRadiusKm: r })} />
          ))}
        </View>
      </Card>

      <View style={styles.audienceRow}>
        <Globe size={20} color={color.content.primary} />
        <Text variant="paragraphSm" tone="input" style={{ flex: 1 }}>
          People interested in beauty and self-care, in English. Merlin picks this automatically.
        </Text>
      </View>
    </StepFrame>
  );
}

/* ---------------------------------------------------------------- Budget */
function BudgetStep({ draft, set, onBack, onClose, onNext }: {
  draft: ChannelDraft; set: (p: Partial<ChannelDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const split = budgetSplit(draft.channels, draft.goal);
  const multi = draft.channels.length > 1;

  return (
    <StepFrame stepKey="budget" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Set your budget"
        subtitle={multi ? "One budget. Merlin splits it across your channels." : "You set the monthly cap. You only pay for results."} />

      <Card style={{ gap: spacing.lg }}>
        <View style={styles.budgetHeadline}>
          <Text variant="h3">${tier.monthly}</Text>
          <Text variant="paragraphMd" tone="input"> / month</Text>
        </View>
        <Slider value={((BUDGET_TIERS.findIndex((t) => t.key === draft.budgetTier) + 1) / BUDGET_TIERS.length) * 100} />
        <View style={styles.estChip}>
          <TrendUp size={16} color={color.accent.green} weight="bold" />
          <Text variant="paragraphSm">~{tier.estLeadsLow}–{tier.estLeadsHigh} new leads / month</Text>
        </View>
      </Card>

      {multi ? (
        <Card background={color.surface.card} style={{ gap: spacing.lg }}>
          <Text variant="h7">How Merlin splits it</Text>
          <BudgetSplitBar segments={split} total={tier.monthly} />
          <Text variant="caption" tone="input">
            Merlin balances your budget automatically, and shifts it toward whatever brings cheaper leads.
          </Text>
        </Card>
      ) : null}

      <View style={{ gap: spacing.lg }}>
        {BUDGET_TIERS.map((t) => (
          <OptionCard key={t.key} title={t.label} subtitle={`$${t.monthly}/mo · about $${t.perDay}/day`}
            badge={t.key === "recommended" ? "Recommended" : undefined}
            selected={draft.budgetTier === t.key} onPress={() => set({ budgetTier: t.key })} />
        ))}
      </View>

      <Text variant="caption" tone="input" center>
        Change or pause anytime. Ads take about 7 days to learn and improve.
      </Text>
    </StepFrame>
  );
}

/* --------------------------------------------------------------- Confirm */
function ConfirmStep({ draft, onBack, onClose, onNext, onEdit }: {
  draft: ChannelDraft; onBack: () => void; onClose: () => void; onNext: () => void; onEdit: (k: StepKey) => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const split = budgetSplit(draft.channels, draft.goal);
  return (
    <StepFrame stepKey="confirm" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue to payment" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Ready to launch" subtitle="Here's everything before your ads go live." />

      <Card style={{ gap: spacing.md }}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text variant="caption" tone="input">Channels</Text>
            <View style={styles.channelLine}>
              {draft.channels.map((c) => <ChannelGlyph key={c} channel={c} size={20} />)}
              <Text variant="h7">{draft.channels.map((c) => CHANNEL_LABEL[c].replace(" Ads", "")).join(", ")}</Text>
            </View>
          </View>
          <Button label="Edit" variant="tertiary" size="subtle" onPress={onClose} />
        </View>
        <View style={styles.divider} />
        <Row label="Goal" value={goalByKey(draft.goal).title} onEdit={() => onEdit("goal")} />
        <View style={styles.divider} />
        <Row label="Where" value={`Within ${draft.locationRadiusKm} km`} onEdit={() => onEdit("location")} />
        <View style={styles.divider} />
        <Row label="Budget" value={`$${tier.monthly}/mo`} onEdit={() => onEdit("budget")} />
      </Card>

      {draft.channels.length > 1 ? (
        <Card background={color.surface.card} style={{ gap: spacing.lg }}>
          <Text variant="h7">Budget split</Text>
          <BudgetSplitBar segments={split} total={tier.monthly} />
        </Card>
      ) : null}

      <View style={styles.learnNote}>
        <Text variant="paragraphSm" tone="secondaryHeading">
          Ads take about 7 days to learn and optimize. Results usually improve after that.
        </Text>
      </View>
    </StepFrame>
  );
}

function Row({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <View style={styles.rowBetween}>
      <View style={{ flex: 1 }}>
        <Text variant="caption" tone="input">{label}</Text>
        <Text variant="h7">{value}</Text>
      </View>
      <Button label="Edit" variant="tertiary" size="subtle" onPress={onEdit} />
    </View>
  );
}

/* --------------------------------------------------------------- Payment */
function PaymentStep({ draft, onBack, onClose, onLaunch }: {
  draft: ChannelDraft; onBack: () => void; onClose: () => void; onLaunch: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const tier = tierByKey(draft.budgetTier);
  const launch = () => { setSubmitting(true); setTimeout(onLaunch, 1400); };
  return (
    <StepFrame stepKey="payment" onBack={onBack} onClose={onClose}
      footer={<Button label={submitting ? "Launching…" : "Launch campaign"} variant="primary" fullWidth loading={submitting} onPress={launch} />}>
      <StepTitle title="Payment" subtitle="You're only charged once your ads start running." />
      <Card style={{ gap: spacing.lg }}>
        <View style={styles.locRow}>
          <CreditCard size={22} color={color.content.primary} />
          <View style={{ flex: 1 }}>
            <Text variant="h7">Visa ending 4242</Text>
            <Text variant="paragraphSm" tone="input">Card on file</Text>
          </View>
          <Button label="Change" variant="tertiary" size="subtle" onPress={() => {}} />
        </View>
      </Card>
      <Card background={color.surface.card} style={{ gap: spacing.md }}>
        <View style={styles.rowBetween}>
          <Text variant="paragraphMd" tone="input">Monthly cap</Text>
          <Text variant="h7">${tier.monthly} / month</Text>
        </View>
        <Text variant="caption" tone="input">
          You only pay for results. Change or pause anytime.
        </Text>
      </Card>
    </StepFrame>
  );
}

/* --------------------------------------------------------------- Success */
function SuccessStep({ draft, onDone }: { draft: ChannelDraft; onDone: () => void }) {
  const plural = draft.channels.length > 1;
  return (
    <View style={styles.frame}>
      <View style={styles.successWrap}>
        <View style={styles.successIcon}><CheckCircle size={56} color={color.accent.green} weight="fill" /></View>
        <View style={styles.channelLine}>
          {draft.channels.map((c) => <ChannelGlyph key={c} channel={c} size={24} />)}
        </View>
        <Text variant="h3" center>{plural ? "Your campaigns are live" : "Your campaign is live"}</Text>
        <Text variant="paragraphMd" tone="secondaryHeading" center>
          Merlin is putting you in front of the right people. We'll learn over the next 7 days, and your
          new leads land right here.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button label={plural ? "See my campaigns" : "See my campaign"} variant="primary" fullWidth onPress={onDone} />
      </View>
    </View>
  );
}

/* ------------------------------------------------------- shared bits */
function ChannelStrip({ channels }: { channels: ChannelKey[] }) {
  return (
    <View style={styles.strip}>
      {channels.map((c) => (
        <View key={c} style={styles.stripChip}>
          <ChannelGlyph channel={c} size={16} />
          <Text variant="caption">{CHANNEL_LABEL[c].replace(" Ads", "")}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1, backgroundColor: color.surface.bg },
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.huge, gap: spacing.xl },
  footer: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  titleBlock: { gap: spacing.md },

  strip: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  stripChip: {
    flexDirection: "row", alignItems: "center", gap: spacing.sm,
    backgroundColor: color.surface.card, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },

  draftingWrap: { alignItems: "center", justifyContent: "center", gap: spacing.md, paddingVertical: spacing.huge * 2 },
  draftingIcon: { width: 64, height: 64, borderRadius: radius.pill, backgroundColor: color.surface.card, alignItems: "center", justifyContent: "center", marginBottom: spacing.md },

  previewHero: { height: 188, borderRadius: radius.xl, alignItems: "center", overflow: "hidden" },
  previewGlass: {
    marginTop: spacing.lg, width: 250, padding: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.2)", borderTopLeftRadius: radius.c32, borderTopRightRadius: radius.c32,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.5)",
  },
  aiNote: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: -spacing.sm },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },

  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  locRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  radiiRow: { flexDirection: "row", gap: spacing.md, flexWrap: "wrap" },
  audienceRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, paddingHorizontal: spacing.xs },
  channelLine: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: 2 },

  budgetHeadline: { flexDirection: "row", alignItems: "flex-end" },
  estChip: {
    flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start",
    backgroundColor: color.surface.card, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.pill,
  },

  divider: { height: 1, backgroundColor: color.border.hairline },
  learnNote: { backgroundColor: color.surface.card, borderRadius: radius.md, padding: spacing.lg },

  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg },
  successIcon: { width: 96, height: 96, borderRadius: radius.pill, backgroundColor: "#E9F7EA", alignItems: "center", justifyContent: "center", marginBottom: spacing.sm },
});

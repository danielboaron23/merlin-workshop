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
import GoogleAdCard from "../../components/GoogleAdCard";
import {
  Button,
  Card,
  Chip,
  OptionCard,
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
  CampaignDraft,
  DEFAULT_DRAFT,
  GOALS,
  Goal,
  goalByKey,
  tierByKey,
} from "./draft";

const TOTAL_STEPS = 6; // Goal, Review, Location, Budget, Confirm, Payment

type StepKey =
  | "intro"
  | "goal"
  | "review"
  | "location"
  | "budget"
  | "confirm"
  | "payment"
  | "success";

const ORDER: StepKey[] = ["intro", "goal", "review", "location", "budget", "confirm", "payment", "success"];
const STEP_NUMBER: Partial<Record<StepKey, number>> = {
  goal: 1, review: 2, location: 3, budget: 4, confirm: 5, payment: 6,
};

const GOAL_ICON: Record<Goal, ComponentType<{ size: number; color: string }>> = {
  bookings: CalendarCheck, calls: Phone, visits: TrendUp,
};

/** Shared step scaffold: progress header + scroll body + pinned footer button. */
function StepFrame({
  stepKey, onBack, onClose, children, footer,
}: {
  stepKey: StepKey;
  onBack?: () => void;
  onClose?: () => void;
  children: ReactNode;
  footer: ReactNode;
}) {
  const n = STEP_NUMBER[stepKey];
  return (
    <View style={styles.frame}>
      <StepHeader
        step={n ?? 1}
        total={TOTAL_STEPS}
        onBack={onBack}
        onClose={onClose}
        hideCount={!n}
      />
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
      <Text variant="h3" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        {title}
      </Text>
      {subtitle ? <Text variant="paragraphMd" tone="secondaryHeading">{subtitle}</Text> : null}
    </View>
  );
}

export default function CreateCampaignFlow({
  onClose,
  onLaunched,
}: {
  onClose: () => void;
  onLaunched: (draft: CampaignDraft) => void;
}) {
  const [stepKey, setStepKey] = useState<StepKey>("intro");
  const [draft, setDraft] = useState<CampaignDraft>(DEFAULT_DRAFT);
  const set = (patch: Partial<CampaignDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const idx = ORDER.indexOf(stepKey);
  const go = (k: StepKey) => setStepKey(k);
  const next = () => go(ORDER[Math.min(idx + 1, ORDER.length - 1)]);
  const back = () => (idx <= 1 ? onClose() : go(ORDER[idx - 1]));

  switch (stepKey) {
    case "intro":
      return <IntroStep onClose={onClose} onStart={next} />;
    case "goal":
      return <GoalStep draft={draft} onPick={(g) => set({ goal: g })} onBack={back} onClose={onClose} onNext={next} />;
    case "review":
      return <ReviewStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "location":
      return <LocationStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "budget":
      return <BudgetStep draft={draft} set={set} onBack={back} onClose={onClose} onNext={next} />;
    case "confirm":
      return <ConfirmStep draft={draft} onBack={back} onClose={onClose} onNext={next} onEdit={go} />;
    case "payment":
      return <PaymentStep onBack={back} onClose={onClose} onLaunch={() => go("success")} />;
    case "success":
      return <SuccessStep draft={draft} onDone={() => onLaunched(draft)} />;
  }
}

/* ----------------------------------------------------------------- Intro */
function IntroStep({ onClose, onStart }: { onClose: () => void; onStart: () => void }) {
  const bullets = [
    { icon: Sparkle, t: "We write it", s: "Merlin drafts your ad and picks your keywords." },
    { icon: CheckCircle, t: "You approve it", s: "Review everything before anything goes live." },
    { icon: CreditCard, t: "Pay for results", s: "You set the budget. Pay only when someone clicks." },
  ];
  return (
    <StepFrame stepKey="intro" onClose={onClose}
      footer={<Button label="Let's go" variant="primary" fullWidth onPress={onStart} />}>
      <LinearGradient colors={gradient.brand.colors} start={gradient.brand.start} end={gradient.brand.end} style={styles.introHero}>
        <View style={styles.introGlass}><GoogleAdCard scale={0.95} /></View>
      </LinearGradient>
      <StepTitle title="Merlin gets you booked" subtitle="Put your business on top of Google. You stay in control, and you can pause anytime." />
      <View style={{ gap: spacing.lg }}>
        {bullets.map((b) => (
          <View key={b.t} style={styles.bulletRow}>
            <View style={styles.bulletIcon}><b.icon size={22} color={color.accent.blue} weight="fill" /></View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="h7">{b.t}</Text>
              <Text variant="paragraphSm" tone="input">{b.s}</Text>
            </View>
          </View>
        ))}
      </View>
    </StepFrame>
  );
}

/* ------------------------------------------------------------------ Goal */
function GoalStep({ draft, onPick, onBack, onClose, onNext }: {
  draft: CampaignDraft; onPick: (g: Goal) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  return (
    <StepFrame stepKey="goal" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="What do you want more of?" subtitle="We'll set up your campaign around this goal." />
      <View style={{ gap: spacing.lg }}>
        {GOALS.map((g) => {
          const Icon = GOAL_ICON[g.key];
          return (
            <OptionCard
              key={g.key}
              title={g.title}
              subtitle={g.subtitle}
              icon={<Icon size={22} color={color.content.primary} />}
              badge={g.key === "bookings" ? "Recommended" : undefined}
              selected={draft.goal === g.key}
              onPress={() => onPick(g.key)}
            />
          );
        })}
      </View>
    </StepFrame>
  );
}

/* ------------------------------------------------------------ Review ad */
function ReviewStep({ draft, set, onBack, onClose, onNext }: {
  draft: CampaignDraft; set: (p: Partial<CampaignDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const [drafting, setDrafting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setDrafting(false), 1300);
    return () => clearTimeout(t);
  }, []);

  if (drafting) {
    return (
      <StepFrame stepKey="review" onBack={onBack} onClose={onClose} footer={<Button label="Continue" variant="primary" fullWidth disabled />}>
        <View style={styles.draftingWrap}>
          <View style={styles.draftingIcon}><Sparkle size={28} color={color.accent.blue} weight="fill" /></View>
          <Text variant="h6" center>Merlin is writing your ad…</Text>
          <Text variant="paragraphSm" tone="input" center>Using your site, photos and services.</Text>
          <ActivityIndicator color={color.accent.blue} style={{ marginTop: spacing.md }} />
        </View>
      </StepFrame>
    );
  }

  const removeTheme = (t: string) => set({ keywordThemes: draft.keywordThemes.filter((x) => x !== t) });

  return (
    <StepFrame stepKey="review" onBack={onBack} onClose={onClose}
      footer={<Button label="Looks good" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Review your ad" subtitle="Merlin drafted this for you. Edit anything you like." />

      {/* Live preview */}
      <LinearGradient colors={gradient.brand.colors} start={gradient.brand.start} end={gradient.brand.end} style={styles.previewHero}>
        <View style={styles.previewGlass}>
          <GoogleAdCard scale={0.95} title={draft.headline} description={draft.description} />
        </View>
      </LinearGradient>
      <View style={styles.aiNote}>
        <Sparkle size={14} color={color.accent.blue} weight="fill" />
        <Text variant="caption" tone="input">AI-drafted. Review before you launch.</Text>
      </View>

      <TextField label="Headline" value={draft.headline} onChangeText={(t) => set({ headline: t })} />
      <TextField label="Description" value={draft.description} onChangeText={(t) => set({ description: t })} />

      <View style={{ gap: spacing.md }}>
        <Text variant="paragraphSm" tone="input">When people search for these, your ad can show</Text>
        <View style={styles.chipsWrap}>
          {draft.keywordThemes.map((t) => (
            <Chip key={t} label={t} onRemove={() => removeTheme(t)} />
          ))}
        </View>
      </View>

      <Button label="Regenerate" variant="secondary" size="subtle"
        leftIcon={<ArrowClockwise size={16} color={color.content.onBtnSecondary} weight="bold" />}
        onPress={() => set({ ...DEFAULT_DRAFT, goal: draft.goal })} />
    </StepFrame>
  );
}

/* -------------------------------------------------------------- Location */
function LocationStep({ draft, set, onBack, onClose, onNext }: {
  draft: CampaignDraft; set: (p: Partial<CampaignDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const radii = [5, 10, 25, 50];
  return (
    <StepFrame stepKey="location" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Who should see it?" subtitle="We'll show your ad to people near your studio." />

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
            <Chip key={r} label={`${r} km`} selected={draft.locationRadiusKm === r} onRemove={undefined} />
          ))}
        </View>
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
  draft: CampaignDraft; set: (p: Partial<CampaignDraft>) => void; onBack: () => void; onClose: () => void; onNext: () => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const tierIndex = BUDGET_TIERS.findIndex((t) => t.key === draft.budgetTier);
  const sliderPct = ((tierIndex + 1) / BUDGET_TIERS.length) * 100;

  return (
    <StepFrame stepKey="budget" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Set your budget" subtitle="You set the monthly cap. You only pay when someone clicks." />

      <Card style={{ gap: spacing.lg }}>
        <View style={styles.budgetHeadline}>
          <Text variant="h3">${tier.monthly}</Text>
          <Text variant="paragraphMd" tone="input"> / month</Text>
        </View>
        <Slider value={sliderPct} />
        <View style={styles.estChip}>
          <TrendUp size={16} color={color.accent.green} weight="bold" />
          <Text variant="paragraphSm">~{tier.estLeadsLow}–{tier.estLeadsHigh} new leads / month</Text>
        </View>
      </Card>

      <View style={{ gap: spacing.lg }}>
        {BUDGET_TIERS.map((t) => (
          <OptionCard
            key={t.key}
            title={t.label}
            subtitle={`$${t.monthly}/mo · about $${t.perDay}/day`}
            badge={t.key === "recommended" ? "Recommended" : undefined}
            selected={draft.budgetTier === t.key}
            onPress={() => set({ budgetTier: t.key })}
          />
        ))}
      </View>

      <Text variant="caption" tone="input" center>
        Change or pause anytime. Google takes about 7 days to learn and improve.
      </Text>
    </StepFrame>
  );
}

/* --------------------------------------------------------------- Confirm */
function ConfirmStep({ draft, onBack, onClose, onNext, onEdit }: {
  draft: CampaignDraft; onBack: () => void; onClose: () => void; onNext: () => void; onEdit: (k: StepKey) => void;
}) {
  const tier = tierByKey(draft.budgetTier);
  const rows: { label: string; value: string; step: StepKey }[] = [
    { label: "Goal", value: goalByKey(draft.goal).title, step: "goal" },
    { label: "Where", value: `Google Search · within ${draft.locationRadiusKm} km`, step: "location" },
    { label: "Budget", value: `$${tier.monthly}/mo`, step: "budget" },
    { label: "Sends people to", value: draft.landingUrl, step: "review" },
  ];
  return (
    <StepFrame stepKey="confirm" onBack={onBack} onClose={onClose}
      footer={<Button label="Continue to payment" variant="primary" fullWidth onPress={onNext} />}>
      <StepTitle title="Ready to launch" subtitle="Here's everything before we go live." />

      <LinearGradient colors={gradient.brand.colors} start={gradient.brand.start} end={gradient.brand.end} style={styles.previewHero}>
        <View style={styles.previewGlass}>
          <GoogleAdCard scale={0.85} title={draft.headline} description={draft.description} />
        </View>
      </LinearGradient>

      <Card style={{ gap: spacing.md }}>
        {rows.map((r, i) => (
          <View key={r.label}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text variant="caption" tone="input">{r.label}</Text>
                <Text variant="h7">{r.value}</Text>
              </View>
              <Button label="Edit" variant="tertiary" size="subtle" onPress={() => onEdit(r.step)} />
            </View>
            {i < rows.length - 1 ? <View style={styles.divider} /> : null}
          </View>
        ))}
      </Card>

      <View style={styles.learnNote}>
        <Text variant="paragraphSm" tone="secondaryHeading">
          Google takes about 7 days to learn and optimize. Results usually improve after that.
        </Text>
      </View>
    </StepFrame>
  );
}

/* --------------------------------------------------------------- Payment */
function PaymentStep({ onBack, onClose, onLaunch }: {
  onBack: () => void; onClose: () => void; onLaunch: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const launch = () => {
    setSubmitting(true);
    setTimeout(onLaunch, 1400);
  };
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
          <Text variant="h7">$600 / month</Text>
        </View>
        <Text variant="caption" tone="input">
          You only pay when someone clicks your ad. Change or pause anytime.
        </Text>
      </Card>
    </StepFrame>
  );
}

/* --------------------------------------------------------------- Success */
function SuccessStep({ draft, onDone }: { draft: CampaignDraft; onDone: () => void }) {
  return (
    <View style={styles.frame}>
      <View style={styles.successWrap}>
        <View style={styles.successIcon}>
          <CheckCircle size={56} color={color.accent.green} weight="fill" />
        </View>
        <Text variant="h3" center numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>Your campaign is live</Text>
        <Text variant="paragraphMd" tone="secondaryHeading" center>
          Merlin is putting you in front of people searching on Google. We'll start learning over
          the next 7 days, and you'll see new leads land right here.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button label="See my campaign" variant="primary" fullWidth onPress={onDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1, backgroundColor: color.surface.bg },
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.huge, gap: spacing.xl },
  footer: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  titleBlock: { gap: spacing.md },

  introHero: { height: 200, borderRadius: radius.c32, alignItems: "center", overflow: "hidden" },
  introGlass: {
    marginTop: spacing.xl, width: 260, padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.2)", borderTopLeftRadius: radius.c40, borderTopRightRadius: radius.c40,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.5)",
  },
  bulletRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  bulletIcon: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: color.surface.card,
    alignItems: "center", justifyContent: "center",
  },

  draftingWrap: { alignItems: "center", justifyContent: "center", gap: spacing.md, paddingVertical: spacing.huge * 2 },
  draftingIcon: {
    width: 64, height: 64, borderRadius: radius.pill, backgroundColor: color.surface.card,
    alignItems: "center", justifyContent: "center", marginBottom: spacing.md,
  },

  previewHero: { height: 188, borderRadius: radius.xl, alignItems: "center", overflow: "hidden" },
  previewGlass: {
    marginTop: spacing.lg, width: 250, padding: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.2)", borderTopLeftRadius: radius.c32, borderTopRightRadius: radius.c32,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.5)",
  },
  aiNote: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: -spacing.md },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },

  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  locRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  radiiRow: { flexDirection: "row", gap: spacing.md, flexWrap: "wrap" },
  audienceRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, paddingHorizontal: spacing.xs },

  budgetHeadline: { flexDirection: "row", alignItems: "flex-end" },
  estChip: {
    flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start",
    backgroundColor: color.surface.card, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.pill,
  },

  divider: { height: 1, backgroundColor: color.border.hairline, marginVertical: spacing.md },
  learnNote: { backgroundColor: color.surface.card, borderRadius: radius.md, padding: spacing.lg },

  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg },
  successIcon: {
    width: 96, height: 96, borderRadius: radius.pill, backgroundColor: "#E9F7EA",
    alignItems: "center", justifyContent: "center", marginBottom: spacing.md,
  },
});

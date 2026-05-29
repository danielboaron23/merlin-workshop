/**
 * Concept B draft model — channel-first campaign builder.
 * Reuses the shared Goal / budget tiers from draft.ts and adds channel selection
 * + smart-split math. Mock content (per docs/PRD-campaigns-concept-b.md).
 */
import { ChannelKey } from "../../design-system";
import { BudgetTierKey, Goal, BUDGET_TIERS, tierByKey } from "./draft";

export type ChannelDraft = {
  channels: ChannelKey[]; // selected, in display order
  goal: Goal;
  headline: string; // CTA / ad headline
  caption: string; // social caption / ad description
  keywordThemes: string[]; // google only
  landingUrl: string;
  locationRadiusKm: number;
  budgetTier: BudgetTierKey;
};

export const CHANNEL_ORDER: ChannelKey[] = ["google", "instagram", "facebook"];

export const CHANNEL_INFO: Record<
  ChannelKey,
  { description: string; tagline: string }
> = {
  google: { description: "Get found when people search", tagline: "High intent" },
  instagram: { description: "Reach people scrolling nearby", tagline: "Visual" },
  facebook: { description: "Reach local customers and communities", tagline: "Local reach" },
};

export const DEFAULT_CHANNEL_DRAFT: ChannelDraft = {
  channels: ["google"],
  goal: "bookings",
  headline: "Book your nails today",
  caption: "Gel manicures, nail art and natural nail care in Manhattan. Book online in seconds.",
  keywordThemes: ["nail studio near me", "gel manicure NYC", "nail art Manhattan"],
  landingUrl: "www.mormakiri.merlin",
  locationRadiusKm: 10,
  budgetTier: "recommended",
};

/**
 * Smart split. Google leans high-intent for booking goals; social leans higher
 * for awareness ("visits"). Weights are normalized across the selected channels.
 */
const WEIGHTS: Record<Goal, Record<ChannelKey, number>> = {
  bookings: { google: 60, instagram: 25, facebook: 15 },
  calls: { google: 55, instagram: 25, facebook: 20 },
  visits: { google: 35, instagram: 40, facebook: 25 },
};

export type Split = { channel: ChannelKey; pct: number };

export function budgetSplit(channels: ChannelKey[], goal: Goal): Split[] {
  const ordered = CHANNEL_ORDER.filter((c) => channels.includes(c));
  const w = WEIGHTS[goal];
  const totalW = ordered.reduce((sum, c) => sum + w[c], 0) || 1;
  // raw percentages, then round so they sum to exactly 100
  const raw = ordered.map((c) => ({ channel: c, exact: (w[c] / totalW) * 100 }));
  const rounded = raw.map((r) => ({ channel: r.channel, pct: Math.round(r.exact) }));
  const drift = 100 - rounded.reduce((s, r) => s + r.pct, 0);
  if (rounded.length) rounded[0].pct += drift; // absorb rounding on the first (largest) channel
  return rounded;
}

export const monthlyTotal = (tier: BudgetTierKey) => tierByKey(tier).monthly;

export { BUDGET_TIERS };

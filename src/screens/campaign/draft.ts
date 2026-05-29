/**
 * Campaign draft model + the "AI-generated" starting content.
 *
 * In the real product these come from Merlin's AI service (site + category +
 * reviews → headlines, descriptions, keyword themes, budget suggestion — see
 * docs/PRD-campaigns.md §9). Here they're realistic Merlin-domain mock data so
 * the flow is fully tappable for the demo.
 */

export type Goal = "bookings" | "calls" | "visits";
export type BudgetTierKey = "starter" | "recommended" | "growth";

export type CampaignDraft = {
  goal: Goal;
  headline: string;
  description: string;
  keywordThemes: string[];
  landingUrl: string;
  locationRadiusKm: number;
  budgetTier: BudgetTierKey;
};

export const GOALS: { key: Goal; title: string; subtitle: string }[] = [
  { key: "bookings", title: "More bookings", subtitle: "Turn searchers into booked clients" },
  { key: "calls", title: "More calls", subtitle: "Get the phone ringing" },
  { key: "visits", title: "More website visits", subtitle: "Send more people to your site" },
];

/**
 * Budget tiers. Monthly cap + an honest estimate range (ranges, never promises —
 * PRD §13). Tuned for a local low-CPC service business.
 */
export const BUDGET_TIERS: {
  key: BudgetTierKey;
  label: string;
  monthly: number;
  perDay: number;
  estLeadsLow: number;
  estLeadsHigh: number;
}[] = [
  { key: "starter", label: "Starter", monthly: 300, perDay: 10, estLeadsLow: 8, estLeadsHigh: 15 },
  { key: "recommended", label: "Recommended", monthly: 600, perDay: 20, estLeadsLow: 18, estLeadsHigh: 30 },
  { key: "growth", label: "Growth", monthly: 1200, perDay: 40, estLeadsLow: 40, estLeadsHigh: 60 },
];

export const DEFAULT_DRAFT: CampaignDraft = {
  goal: "bookings",
  headline: "Art up nail studio NYC",
  description:
    "Gel manicures, nail art and natural nail care in Manhattan. Book your spot online today.",
  keywordThemes: ["nail studio near me", "gel manicure NYC", "nail art Manhattan", "book nails online"],
  landingUrl: "www.mormakiri.merlin",
  locationRadiusKm: 10,
  budgetTier: "recommended",
};

export const tierByKey = (key: BudgetTierKey) =>
  BUDGET_TIERS.find((t) => t.key === key) ?? BUDGET_TIERS[1];

export const goalByKey = (key: Goal) => GOALS.find((g) => g.key === key) ?? GOALS[0];

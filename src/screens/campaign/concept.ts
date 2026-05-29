/**
 * Which Campaigns concept the tab renders.
 *
 *  "A" — Google-first single flow behind "Check it out"  (docs/PRD-campaigns.md)
 *  "B" — channel-first builder: pick Google / Instagram / Facebook or combine,
 *        then one unified flow                            (docs/PRD-campaigns-concept-b.md)
 *
 * Flip this one value to switch concepts. Both are fully built and share the
 * Merlin design system, so they're easy to compare in the workshop.
 */
export const CAMPAIGNS_CONCEPT: "A" | "B" = "A";

# Merlin Designer — Pre-Flight Checklist

Run this before handing any design back. If a box can't be honestly ticked, fix it first.

## Context & intent
- [ ] Read `DESIGN_SYSTEM.md`, `tokens.ts`, relevant `components/*`, and existing `screens/*`.
- [ ] If from a spec: read the doc in `docs/`.
- [ ] Stated a one-line **Design Read**.
- [ ] Confirmed the **Creativity Dial** with the user.
- [ ] Asked a clarifying question if anything design-changing was ambiguous.

## Design system fidelity
- [ ] **Zero hardcoded** colors / font sizes / radii / spacing — all from tokens.
- [ ] Reused existing DS components where they fit.
- [ ] Any new shared UI is a DS component in `components/` + exported in `index.ts` + has a `*.stories.tsx`.
- [ ] `DESIGN_SYSTEM.md` component table updated if a component was added.
- [ ] All text uses the DS `Text` component with a `variant` (no raw `<Text>` + inline size).
- [ ] Icons are Phosphor (no emoji as UI icons).

## Quality (priority 1→8)
- [ ] Contrast ≥ 4.5:1; `accessibilityRole`/`accessibilityLabel` on interactive & icon-only elements.
- [ ] Touch targets ≥ 44×44pt; pressed + disabled states; async buttons disable while loading.
- [ ] Long lists use `FlatList`; no layout jump; images optimized.
- [ ] No horizontal overflow; safe areas respected; readable body size.
- [ ] Clear visual hierarchy; semantic color tokens; no gray-on-gray.
- [ ] Motion (if any) is 150–300ms, motivated, and respects reduce-motion.
- [ ] Forms: visible labels, helper/error text, draft-first where it helps.
- [ ] Navigation predictable; back works; nothing traps the user.

## States
- [ ] empty / first-run
- [ ] loading (skeleton)
- [ ] content
- [ ] editing (if applicable)
- [ ] submitting (if applicable)
- [ ] success
- [ ] error / needs-attention
- [ ] not-connected / no-permission (if applicable)
- [ ] end / complete (if applicable)

## Anti-slop
- [ ] Realistic Merlin-domain content (no John Doe / Acme / Lorem).
- [ ] Brand voice: calm, plain-language, no jargon.
- [ ] No em-dashes in user-facing copy.
- [ ] One job per screen.

## Verification
- [ ] iOS bundle compiles clean (no errors).
- [ ] Ran in the simulator and **screenshotted each screen/state**.
- [ ] Self-checked screenshots against the Design Read + DS.
- [ ] Fixed anything the screenshots revealed.

## Hand-back
- [ ] Showed screenshots.
- [ ] Summarized: what was built, DS pieces used, new components, honest tradeoffs.
- [ ] Offered the next step.

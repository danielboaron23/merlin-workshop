# PRD — Campaigns **Concept B**: Channel-First Campaign Builder

**Product:** Merlin
**Surface:** Campaigns tab (mobile)
**Relationship to Concept A:** This is an **alternative concept**, kept side-by-side with
[Concept A](./PRD-campaigns.md). Concept A = a Google-first single flow behind "Check it out".
**Concept B = the user picks the channel(s) first** (Google / Instagram / Facebook, or a combination),
then runs one tailored flow. Switch between them with a one-line flag (see §12).
**Status:** Draft v1 · **Creativity target:** dial 6–7 (expressive) · **Channels:** Google, Instagram,
Facebook (all selectable + combinable; flows mocked) · **Last updated:** 2026-05-29

---

## 1. The core idea (how B differs from A)

Concept A answers *"help me get customers"* and quietly picks Google. **Concept B puts the channel
choice in the user's hands as the opening moment.** The Campaigns tab becomes a **channel hub**: three
bold, branded channel cards (Google Ads, Instagram, Facebook). The user taps one — or selects several
and **combines** them — and Merlin runs a **single unified flow** that adapts to the chosen mix, with
**one budget that Merlin smart-splits** across the selected channels.

Same north star as A: *the user never writes an ad or opens an ads manager.* Merlin drafts everything;
the user reviews, sets one budget, confirms, launches.

**Why offer B at all:** different owners think differently. Some say "just get me customers" (A); others
think in platforms — "I want to be on Instagram" (B). B also makes the **cross-channel** story explicit
and visual, which is Merlin's real edge over Google-alone.

---

## 2. Goals & non-goals

### Goals
- G1. Let the user **choose channel(s) first** — one, or any combination — in a single clear screen.
- G2. Run **one unified flow** regardless of the mix; never make the user repeat themselves per channel.
- G3. **One budget, smart-split** across selected channels (Merlin allocates + auto-rebalances).
- G4. Make each channel feel **authentically itself** (Google search-result preview, Instagram feed/story
  preview, Facebook feed preview) so the user trusts what they'll get.
- G5. Be visibly a **distinct concept** from A (more expressive channel moment), while 100% on the
  Merlin design system (tokens only).

### Non-goals (v1)
- No real Google/Meta APIs or payment processor (realistic mock, like A).
- No per-channel manual targeting/bidding controls (Merlin stays the "we handle it" product).
- No TikTok/LinkedIn/YouTube standalone yet.
- Not replacing Concept A — both coexist; this PRD is the B variant.

---

## 3. Entry point & the channel hub (the signature screen)

When `CAMPAIGNS_CONCEPT = "B"`, the Campaigns tab opens on the **channel hub** instead of the
"Merlin gets you booked" marketing screen.

**Channel hub contents:**
- Short header: *"Where do you want to grow?"* + one line: *"Pick a channel, or combine a few. Merlin
  builds and runs the ads for you."*
- **Three channel cards** (multi-select), each authentically branded **within token limits**:
  - **Google Ads** — "Get found when people search" · high-intent · search-result vibe.
  - **Instagram** — "Reach people scrolling nearby" · visual · feed/story vibe.
  - **Facebook** — "Reach local customers & communities" · broad local reach.
- Cards are **selectable** (tap to toggle). Selecting 2+ reveals a **"Combine" affordance** and a small
  helper: *"Smart combine — one budget, Merlin balances it across the channels you pick."*
- A persistent bottom **Continue** button: label adapts —
  - 1 channel: *"Set up Google Ads"* / *"Set up Instagram"* / *"Set up Facebook"*
  - 2–3 channels: *"Combine N channels"*
  - 0 channels: disabled with hint *"Pick at least one channel."*

**Design intent (dial 6–7):** this screen is the concept's hero. Give each card a channel-tinted
treatment (accent, gradient, or icon lockup) drawn from tokens; consider a subtle selected-state
animation and a "combined" visual when multiple are picked (e.g. merged accent bar / stacked preview).
Stay on-system: no off-token colors; if a channel brand color is needed, add it as a named token.

---

## 4. The unified flow (adapts to the chosen mix)

After the hub, one flow runs. Steps present/adapt based on selection:

```
[Channel hub]  →  selection = {google?, instagram?, facebook?}
      ▼
Step 1 — Goal            "What do you want more of?"  (bookings / calls / visits)
      ▼
Step 2 — Review your ad  AI-drafted, with a preview PER selected channel
            • Google  → search-result card (reuse GoogleAdCard)
            • Instagram → feed/story creative preview (photo + caption)
            • Facebook → feed post preview (photo + headline + CTA)
            One set of source content (headline, description, photos) adapts to each format.
      ▼
Step 3 — Audience & location   radius / language / auto audience signal (shared across channels)
      ▼
Step 4 — Budget          one monthly budget + smart-split visualization across selected channels
      ▼
Step 5 — Review & confirm   per-channel summary + total, 7-day learning note
      ▼
Step 6 — Payment (mock)  → Launch
      ▼
[Success] → Campaigns becomes a multi-channel dashboard
```

Notes:
- **Single source content, many previews.** The user edits headline/description/photos once; Merlin
  shows how it looks on each chosen channel. This is the "magic" and the main visual payoff of B.
- **Step count adapts** to the number of channels (the progress header reflects it).
- If only Google is chosen, Step 2 ≈ Concept A's review; the value of B shows most with 2–3 channels.

---

## 5. Step detail

### Channel hub (covered in §3)
States: nothing selected (Continue disabled) · 1 selected · 2–3 selected (combine shown).

### Step 1 — Goal
Same as Concept A: single-select OptionCards (More bookings *Recommended* / calls / visits). Maps to
each platform's objective under the hood (e.g. Google = leads, Meta = conversions/leads).

### Step 2 — Review your ad (per-channel previews)
- Brief AI "drafting…" state, then content appears.
- **A channel preview switcher** (segmented or tabs) when 2+ channels: Google | Instagram | Facebook,
  each rendering the same source content in that platform's native shape:
  - **Google:** `GoogleAdCard` (headline + description + URL).
  - **Instagram:** square/story media + handle + caption + "Sponsored" + a Book/CTA chip.
  - **Facebook:** page name + media + headline + description + CTA button.
- **Editable source fields:** headline, description, photo(s), keyword themes (Google), landing URL.
- "AI-drafted — review before launch" note + Regenerate.

### Step 3 — Audience & location
Shared across channels: radius slider, language, plain audience signal ("people interested in beauty &
self-care nearby"). One setting drives all selected platforms.

### Step 4 — Budget (the smart-split moment)
- One monthly budget (tiers + slider, like A).
- **Smart-split visualization:** a single bar segmented by channel showing Merlin's allocation
  (default **Google 60 / Meta 40** for booking-intent goals; **Meta-leaning** for awareness). Copy:
  *"Merlin balances your budget automatically, and shifts it toward whatever brings cheaper leads."*
- Honest estimate range across the mix; 7-day learning note.

### Step 5 — Review & confirm
- Per-channel mini-rows (channel · what shows · its share of budget) + total.
- Each row "Edit" jumps back. Confirm → payment.

### Step 6 — Payment (mock) → Launch
Same as A: card-on-file, monthly cap, "only charged when ads run", Launch → submitting → success.

### Success
"Your campaigns are live" (plural-aware), 7-day learning expectation, "See my campaigns."

---

## 6. Post-launch dashboard (multi-channel)

Campaigns tab (when a B campaign is live) shows a **multi-channel dashboard**:
- Status (Learning/Live/Paused) + total spend vs. cap + total new leads.
- **Per-channel breakdown:** for each selected channel — its spend, leads, cost-per-lead, and share.
- **Channel chips/legend** so the user sees Google vs. Instagram vs. Facebook contribution.
- Insight nudges: *"Instagram is bringing cheaper leads — Merlin shifted more budget there."*
- Actions: Pause/Resume (all or per channel, v1 = all), Edit, End, View leads.

---

## 7. States (all must be handled)
Channel hub: none/one/multi selected · channel not connected (Instagram/Facebook need a connected
account → inline "Connect" with graceful Google-only fallback) · drafting · editing · submitting ·
learning · live · paused · budget reached · needs-attention (rejection, card, disconnect) · ended.

> **Connection reality (mock):** Instagram/Facebook normally require an OAuth connection. In this build,
> simulate "connected"; show the *not-connected* state as one designed variant so the concept is complete.

## 8. Reuse vs. new (design-system discipline)
- **Reuse:** AppBar, StepHeader, OptionCard, Card, Button, Chip, TextField, Slider, Text, GoogleAdCard,
  Dialog, tokens/gradient.
- **Likely new DS components (tokens-only, with stories):**
  - `ChannelCard` — selectable, channel-branded card for the hub.
  - `ChannelPreview` (or `InstagramPreview` + `FacebookPreview`) — native-shape ad previews.
  - `BudgetSplitBar` — segmented budget allocation across channels.
  - Possibly `SegmentedControl` for the per-channel preview switcher.
- If a channel brand color is required, add it as a **named token** (e.g. `palette.igPink`,
  `palette.fbBlue`) — never an inline hex.

## 9. AI generation
Same inputs as A (site, category, photos, reviews). Additional output: **per-format creative** (Google
text, IG square/story, FB feed) from one source set; per-channel budget recommendation + split.

## 10. Success metrics
- Channel-choice distribution (which channels / how often combined).
- Combine rate (% choosing 2+).
- Time-to-launch, draft acceptance, completion to payment.
- Outcome: leads & cost-per-lead per channel; which channel wins.
- A vs. B comparison (the reason both concepts exist): activation & completion by concept.

## 11. Edge cases
- 0 channels selected → Continue disabled.
- Social chosen but not connected → inline connect, or drop to Google-only.
- One channel rejected at launch → launch the others, flag the rejected one.
- Low budget across many channels → honest "spreading thin" nudge (split won't help if the total is tiny).
- Site unpublished → block, prompt to publish first.

---

## 12. Switching between Concept A and Concept B

A single flag controls which experience the Campaigns tab renders:

```ts
// src/screens/campaign/concept.ts
export const CAMPAIGNS_CONCEPT: "A" | "B" = "A"; // flip to "B" to demo the channel-first concept
```

- `"A"` → today's flow (landing "Check it out" → Google-first Create Campaign → dashboard). Unchanged.
- `"B"` → channel hub → unified multi-channel flow → multi-channel dashboard.

`CampaignsScreen` reads the flag and mounts the matching root. Both concepts share the design system and
the underlying draft/launch state shape where possible, so they stay consistent and easy to compare.
(Future: this flag could be surfaced as an in-app toggle for live A/B demos.)

## 13. Phasing
- **This build:** channel hub + unified mocked flow (all 3 channels, combine, smart-split viz) +
  multi-channel dashboard, behind the `"B"` flag. Concept A preserved untouched.
- **Next:** real OAuth connect for IG/FB, real APIs, per-channel pause, in-app concept toggle.

## 14. Open questions
1. Default channel split per goal — confirm 60/40 (Google/Meta) for bookings; awareness = Meta-leaning?
2. Per-channel pause in v1, or all-or-nothing?
3. If a channel isn't connected, silently drop it or hard-require connect before continuing?
4. One combined budget always, or allow manual per-channel caps for power users (likely later)?

## 15. Appendix — basis
Builds on the research in [Concept A's appendix](./PRD-campaigns.md#17-appendix--research-basis):
Google Search harvests high-intent demand; Instagram/Facebook create demand + retarget; a single
auto-split budget (Google smart bidding + Meta Advantage+) is the small-business simplification. B makes
that cross-channel choice the explicit, expressive centerpiece of the Campaigns tab.

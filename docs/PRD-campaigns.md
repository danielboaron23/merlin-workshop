# PRD — Campaigns: "Check it out" → Launch a Campaign

**Product:** Merlin (turn social content into a website → get customers)
**Surface:** Campaigns tab (mobile)
**Trigger:** Tapping **"Check it out"** on the Campaigns landing screen
**Status:** Draft v1
**Owner:** —
**Last updated:** 2026-05-29

---

## 1. Summary

Today the Campaigns tab is a single marketing screen ("Merlin gets you booked") with one
button — **"Check it out."** This PRD defines what happens *after* that tap: a guided flow that
lets a non-technical small-business owner launch a **Google Ads** campaign in minutes, and
optionally extend it into a **smart cross-channel campaign** (Google Search + Instagram/Facebook)
from a single budget — all generated automatically from the data Merlin already has (their site,
photos, business category, and reviews).

The north star: **the user never has to write an ad, pick a keyword, or open Google Ads Manager.**
Merlin drafts everything; the user reviews, sets a budget, confirms, and pays.

---

## 2. Why this matters (problem & opportunity)

### The user's problem
Service businesses (nail studio, photographer, chef…) know they *should* advertise on Google but:
- They don't know what a "keyword," "bid," or "conversion" is.
- Google Ads Manager is built for marketers, not solo owners — it's intimidating and slow.
- Writing ad copy and choosing settings feels like a second job.
- They can't tell if it's working or where the money goes.

### Why Merlin is uniquely positioned
Merlin **already has the raw materials** an ad campaign needs:
- The **website** (URL, services, hours, location) → the ad's landing page + extracted keywords.
- **Social content / photos** → ad images and Instagram/Facebook creative.
- **Business category** ("nail studio NYC") → keyword themes + audience signals.
- **Leads inbox + site analytics** → conversion tracking and "did it work" reporting.

So Merlin can compress Google's 7-step setup into a **review-and-confirm** experience, and be the
single place that also runs social ads — something Google Ads alone can't do.

### Business opportunity
- New monetizable surface: Merlin takes a clear margin / service fee on ad spend (pay-per-click,
  user-set budget — consistent with the existing "Google Ads = optional paid service" model).
- Increases retention: a live campaign that produces leads is a strong reason to stay subscribed
  (ties into Merlin PRO).

---

## 3. Goals & non-goals

### Goals
- G1. Let a user launch a real Google Ads campaign in **≤ 5 minutes**, **0 ad-writing required**.
- G2. Auto-generate ad copy, keyword themes, images, budget recommendation from existing Merlin data.
- G3. Offer a **smart cross-channel** option (add Instagram/Facebook) without extra complexity.
- G4. Show transparent, plain-language results (leads, spend, cost-per-lead) — not ad jargon.
- G5. Make budget and billing unmistakably clear before any money is spent.

### Non-goals (v1)
- Not building a full ad-manager with manual keyword bidding / negative keywords UI.
- Not supporting TikTok / LinkedIn / Google Display standalone (future).
- Not A/B testing UI for power users (Merlin auto-rotates assets instead).
- Not multi-campaign portfolio management (v1 = one active campaign per business; see Open Qs).

---

## 4. Target user & jobs-to-be-done

**Primary persona — "Mor," solo nail-studio owner.** Runs everything from her phone, no marketing
background, limited budget, wants more bookings this month.

**JTBD:**
- "When I have a quiet week, help me get more customers from Google **without** me becoming a marketer."
- "When I spend money on ads, show me **exactly** what I got for it."
- "When my Instagram is my best showcase, **reuse it** so I don't redo work."

---

## 5. Where this fits (entry points)

1. **Primary:** Campaigns tab → "Check it out" (this PRD).
2. **Secondary (reuse same flow):** Home → "Boost on Google" card → "Get your website to the top of
   Google search" (already in the Home design).
3. **Contextual (future):** Leads tab empty state → "Get more leads with a campaign."

All entry points open the same **Create Campaign** flow described below.

---

## 6. The flow (happy path)

> Design principle: **draft-first.** Merlin pre-fills every step with an AI draft. The user is always
> *editing a suggestion*, never facing a blank form. Every step is skippable with a sensible default.

```
[Campaigns landing]
      │  tap "Check it out"
      ▼
Step 0 — Intro / value + "what you'll get"  (skippable, shown first time only)
      ▼
Step 1 — Goal:  "What do you want more of?"   → [More bookings] [More calls] [More site visits]
      ▼
Step 2 — Channel:  "Where should we advertise?"
            • Google Search (default, recommended)
            • + Add Instagram & Facebook  (smart combine toggle)
      ▼
Step 3 — Review your ad  (AI-generated, editable)
            headline(s), description, keywords/themes, photo(s), landing page
      ▼
Step 4 — Audience & location  (AI-prefilled from site)
            radius / city, language, who it targets
      ▼
Step 5 — Budget  (recommended tier + slider) → live estimate of leads/clicks
      ▼
Step 6 — Review & confirm  (plain-language summary of everything + total)
      ▼
Step 7 — Payment  (add/confirm card)  → Launch
      ▼
[Success] → Campaign status: "Learning" → "Live"  → back to Campaigns (now a dashboard)
```

---

## 7. Step-by-step spec

### Step 0 — Intro (first run only)
- **Purpose:** set expectations, reduce drop-off.
- **Content:** "Merlin will write your ad, pick your keywords, and put your business on top of Google.
  You just set a budget. You're in control — pause anytime."
- **Shows:** 3 bullets (We write it · You approve it · Pay only for results), the example Google-ad card.
- **CTA:** "Let's go." **Secondary:** "How it works" (link).
- **Skip rule:** only shown until the user has created their first campaign.

### Step 1 — Goal
- **Question:** "What do you want more of?"
- **Options (single-select cards):**
  - **More bookings** *(default for service businesses)* → optimizes for form submits / booking clicks.
  - **More calls** → optimizes for phone-call clicks, surfaces the call button.
  - **More website visits** → optimizes for clicks/traffic.
- **Why it matters:** maps to Google's campaign goal + conversion action. Hidden from user as jargon.
- **Default/auto:** "More bookings" preselected.

### Step 2 — Channel (the Google + social combine)
- **Question:** "Where should people find you?"
- **Primary card — Google Search** (preselected, "Recommended"):
  - Copy: "Show up when people search for what you do (e.g. *nail studio near me*)."
  - Subtext: captures people who are *already looking* — highest intent.
- **Add-on toggle — Instagram & Facebook** ("Smart combine"):
  - Copy: "Also show your best photos to nearby people who aren't searching yet."
  - When ON: Merlin will reuse social photos as creative and run a coordinated Meta campaign.
  - **Smart split:** one budget, Merlin allocates (default 60% Google / 40% social) and auto-shifts
    toward whichever delivers cheaper leads. Show as "Merlin balances your budget automatically."
- **Rationale (from research):** Search = harvest existing demand; Social = create demand + retarget
  site visitors who didn't book. Combining covers the full funnel from one flow.
- **Requirement:** social option requires a connected Instagram/Facebook (see Dependencies). If not
  connected, show "Connect Instagram" inline; if user declines, continue Google-only.

### Step 3 — Review your ad (the core "magic" step)
- **Everything is AI-generated and editable.** Merlin drafts from the site + category + reviews.
- **Fields:**
  - **Headlines** (3–15 short; Google rotates them). Show top 3, "edit"/"regenerate."
  - **Descriptions** (2–4). Editable, char-limited with live counter.
  - **Keyword themes** (e.g. *gel manicure*, *nail art NYC*, *nail studio near me*) — shown as
    friendly chips the user can remove/add; **not** raw match-type keywords.
  - **Photos** (for the ad + social): auto-pulled from site/Instagram; user can swap/reorder.
  - **Landing page:** defaults to their Merlin site (or a specific service page).
- **Live preview:** the real Google-ad card (reuse `GoogleAdCard` component) + an Instagram preview
  if social is on. Updates as they edit.
- **"Regenerate" affordance:** per-field and "regenerate all" (ties to AI generation, §9).
- **Validation:** at least 1 headline + 1 description + 1 keyword theme + landing URL reachable.

### Step 4 — Audience & location
- **Prefilled from the site's address / service area.**
- **Controls:**
  - **Location:** radius around address (slider, e.g. 1–50 km) OR specific cities.
  - **Language(s):** default from site language.
  - **Who:** light audience signal (e.g. "people interested in beauty & self-care") — phrased plainly;
    maps to Performance Max / Smart audience signals under the hood.
- **Default:** 10 km radius, site language, auto audience signal. Fully skippable.

### Step 5 — Budget
- **Recommended tier** preselected, pulled from Google's `SmartCampaignSuggestService` (low /
  recommended / high) using business + location + keyword themes — not a hardcoded guess.
- **Slider** with 3 anchor tiers: **Starter / Recommended / Growth.**
- **Live estimate** updates with the slider: "~X–Y new leads/month, ~Z clicks" (ranges, honest).
- **Reality grounding (from research — keep internal, shape the recommendation):**
  - Avg CPC ≈ **$5.26** (varies wildly by industry; local/beauty is lower than legal/insurance).
  - Smart bidding needs roughly **30–50 conversions/month** to optimize well; practical budgets that
    get there are often **$1,000–$2,500/mo**, but local low-CPC niches can start at **$20–$50/day**.
  - So: don't show a budget so low it can never produce enough conversions to learn. If the user
    drags below a viable floor, show the honest "may get few results" nudge (see edge cases).
- **Plain-language billing note:** "You set the monthly cap. You only pay when someone clicks.
  Change or pause anytime." (pay-per-click, user-set budget — matches existing model.)
- **Smart-split note** (if social on): "Merlin splits this across Google & Instagram automatically."
  Default split **60% Google / 40% Meta** for established businesses (harvest intent), or
  **40/60 toward Meta** when the goal is awareness/new — then auto-rebalance toward cheaper leads.

### Step 6 — Review & confirm
- **Plain-language summary** of the whole campaign in one scroll:
  goal · channels · what the ad says (preview) · where it shows · monthly budget · est. results.
- **Editable:** each section has "Edit" jumping back to that step.
- **Expectation-setting:** "Google takes about **7 days** to learn and optimize. Results usually
  improve after that." (sets the learning-period expectation up front — from research.)
- **CTA:** "Continue to payment."

### Step 7 — Payment & launch
- Add / confirm payment method (card). Show the monthly cap and "first charge only when ads run."
- **Launch CTA:** "Launch campaign."
- On success → **Success state** (§8) → Campaigns tab becomes a **dashboard** (§10).

---

## 8. States (must all be designed)

| State | When | What the user sees |
|-------|------|--------------------|
| **Empty / first run** | No campaign yet | The current "Merlin gets you booked" + "Check it out." |
| **Drafting (AI)** | Generating ad/keywords | Skeleton + "Merlin is writing your ad…" (cancelable). |
| **Editing** | Review steps | Draft content, editable, live preview. |
| **Submitting** | After confirm | Spinner on Launch; disable double-submit. |
| **Learning** | First ~7 days live | Badge "Learning — Google is optimizing." Muted metrics. |
| **Live** | Optimized & running | Full dashboard: leads, spend, cost/lead, trend. |
| **Paused** | User paused | "Paused" banner + "Resume." No spend. |
| **Budget reached** | Monthly cap hit | "Budget reached — ads paused until next cycle / raise budget." |
| **Needs attention** | Card declined, policy rejection, IG disconnected | Actionable error card with one clear fix. |
| **Ended** | User ended campaign | Summary of total results + "Start a new campaign." |

---

## 9. AI generation (what Merlin auto-creates)

**Inputs available:** site content, business name/category, location/hours, services, reviews,
Instagram photos & captions, past leads (anonymized themes).

**Outputs:**
- Headlines & descriptions (on-brand, policy-safe, localized).
- Keyword themes (intent-based, mapped to Google's keyword-theme model behind the scenes).
- Audience signal suggestion.
- Image selection + crop suggestions for Google + Instagram/Facebook formats.
- Budget recommendation (category + geo competitiveness).

**Guardrails:**
- Ad-policy pre-check before submission (no prohibited claims, trademark issues).
- Char-limit enforcement per Google/Meta spec.
- "Regenerate" must keep brand voice; user edits always win over AI.
- Show a subtle "AI-drafted — review before launch" note (trust + correctness).

---

## 10. After launch — Campaigns becomes a dashboard

Once a campaign exists, the Campaigns tab shows a **dashboard** instead of the marketing screen:
- **Top card:** status (Learning/Live/Paused), this-month spend vs. cap, leads generated.
- **Plain metrics:** New leads · Cost per lead · Clicks · Reach (no CTR/CPC jargon by default;
  "advanced" reveal optional).
- **Channel breakdown** (if combined): Google vs. Instagram contribution.
- **Actions:** Pause/Resume · Edit budget · Edit ad · End campaign · View leads (deep-link to Leads tab).
- **Insight nudges:** "Raising budget by X could get ~Y more leads," "Your Instagram ad is cheaper —
  Merlin shifted more budget there."

---

## 11. Data model (conceptual)

```
Campaign
  id, businessId, status(draft|learning|live|paused|budget_reached|ended)
  goal (bookings|calls|visits)
  channels [google_search, meta]  + budgetSplit (auto|manual %)
  budget { monthlyCap, currency, pacing }
  landingUrl
  createdAt, launchedAt, endedAt

AdContent
  campaignId, headlines[], descriptions[], keywordThemes[], images[],
  audienceSignal, locations[], languages[], source(ai|edited)

Metrics (per day, per channel)
  campaignId, channel, date, impressions, clicks, spend, leads, costPerLead

BillingProfile
  businessId, paymentMethodRef, status
```

Integrations: **Google Ads API** (Smart/Performance Max under the hood), **Meta Marketing API**,
conversion tracking via Merlin site + Leads.

---

## 12. Success metrics

- **Activation:** % of users who tap "Check it out" → launch a campaign (target ↑).
- **Time-to-launch:** median minutes from tap → launched (target ≤ 5 min).
- **Draft acceptance:** % who launch with mostly-unedited AI copy (proxy for AI quality).
- **Channel combine rate:** % who enable Instagram/Facebook.
- **Outcome:** leads per campaign, cost-per-lead, campaign retention (still live at 30/60 days).
- **Trust:** % reaching the budget step who complete payment (drop-off = friction/anxiety signal).

---

## 13. Edge cases & risks

- **No connected social** → gracefully run Google-only; offer connect later.
- **Site not published / unreachable landing page** → block launch, prompt to publish first
  (ties to Home "Publish your site" step).
- **Ad policy rejection** → surface plain reason + one-tap "fix with Merlin."
- **Low budget vs. competitive category** → honest "this budget may get few results" nudge.
- **Payment failure** → pause, notify, retry; never silently overspend.
- **Expectation mismatch** → the 7-day learning note must appear *before* payment, not after.
- **Over-promising results** → always show ranges, never guarantees (legal/trust).

---

## 14. Dependencies

- Google Ads API access + billing/merchant setup.
- Meta Marketing API + Instagram/Facebook OAuth connection.
- Conversion tracking on the Merlin site + Leads attribution.
- Payment processor + Merlin's fee/margin model.
- AI content service (copy, keyword themes, image selection, policy pre-check).

---

## 15. Phasing

- **MVP (v1):** Google Search only. Goal → AI ad review → location → budget → pay → launch →
  basic dashboard (leads/spend/cost-per-lead) + pause/edit/end. 7-day learning messaging.
- **v1.1:** Smart combine — add Instagram/Facebook with auto budget split + channel breakdown.
- **v1.2:** Insight nudges, advanced metrics reveal, multiple campaigns, service-specific landing pages.
- **Later:** more channels (TikTok), seasonal/auto-suggested campaigns from quiet-week detection.

---

## 16. Open questions

1. One active campaign per business, or multiple from day one?
2. Merlin's monetization: margin on spend, flat service fee, or PRO-gated? (Affects budget UI copy.)
3. Minimum budget floor (Google/Meta minimums + viable results)?
4. Who owns the Google Ads account — Merlin MCC sub-account or the user's own?
5. How much editing do we allow before it stops being "simple" (power-user creep)?
6. Refund / dispute handling for ad spend?

---

## 17. Appendix — research basis

**Google Smart Campaign** setup is a 7-step flow (business → goal → ad text → keyword themes →
location → budget → review). Merlin collapses this into draft-and-confirm. The Google Ads API
exposes exactly the pieces we need:
- `SmartCampaignSuggestService` → budget suggestions (low/recommended/high) + **3 headlines & 2
  descriptions** drafted from the business, location, language, and keyword themes.
- `KeywordThemeConstantService` → keyword-theme suggestions (friendly themes, not raw match types).
- A Smart campaign has **one ad group**, with **3–15 headlines** and **2–4 descriptions**.

**Performance Max** (for the "run it everywhere" / combined ambition) uses *asset groups* — up to
**15 headlines, 5 descriptions, 20 images, 5 videos** — plus **audience signals** (which *guide*, not
restrict, targeting) and up to **25 keyword/search themes** per asset group. Google's ML assembles
ads across Search, Maps, YouTube, Gmail, Display, Discover. Maps cleanly to Merlin's "give us your
photos & info, we run it everywhere" model.

**Learning period:** ~**1–3 weeks** to stabilize; initial signal in 24–48h but ~30–50 conversions/mo
needed for smart bidding to optimize. → the "~7 days to learn" message must appear **before** payment.

**Budget reality:** avg CPC ≈ **$5.26** (industry-dependent); viable small-budget local campaigns
often **$20–50/day**; "enough" depends on hitting conversion volume, not raw dollars.

**Google + Meta combine:** Search **harvests existing demand** (high intent, higher CPC); Instagram/
Facebook **create demand + retarget** site visitors (often cheaper per lead). Common splits: **60–70%
Meta for new/awareness**, **70%+ Google for purchase-ready**, 50/50 as a starting point then let data
decide. Meta's **Advantage+** and Google's smart bidding both auto-distribute a single budget — the
key small-business simplification Merlin productizes as "one budget, Merlin balances it."

Consistent with Merlin's stated model: website free; **Google Ads optional, user-set budget,
pay-per-click**; PRO for custom domain & pro tools.

### Sources
- [Google Ads API — Smart Campaigns overview](https://developers.google.com/google-ads/api/docs/smart-campaigns/overview)
- [Google Ads API — Create a Smart campaign](https://developers.google.com/google-ads/api/docs/smart-campaigns/create-campaign)
- [Google Ads Help — Create a Smart campaign](https://support.google.com/google-ads/answer/7459814)
- [Google Ads Help — How Smart campaigns work](https://support.google.com/google-ads/answer/7652860)
- [Google Ads Help — About Performance Max](https://support.google.com/google-ads/answer/10724817)
- [Google Ads Help — Audience signals for Performance Max](https://support.google.com/google-ads/answer/14530785)
- [WordStream — How much does Google Ads cost](https://www.wordstream.com/blog/google-ads-cost)
- [Ryze — Google Ads minimum budget guide 2026](https://www.get-ryze.ai/blog/google-ads-minimum-budget-guide-2026)
- [Search Engine Journal — Budget allocation: Google Ads vs Meta](https://www.searchenginejournal.com/budget-allocation-when-to-choose-google-ads-vs-meta-ads/542850/)
- [Shopify — Google Ads vs Facebook Ads](https://www.shopify.com/blog/google-ads-vs-facebook-ads)
- [Hocoos — AI website builder with ads integration](https://hocoos.com/) · [Durable](https://durable.com/ai-website-builder) (comparable AI-builder → ads onboarding patterns)

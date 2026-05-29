# Merlin Design System

The single source of truth for how the Merlin app looks. Everything here is extracted
1:1 from the Figma file (`YKyeGWVAXZloSOj9i5trRj`) and lives in code so it travels with the project.

- **Tokens:** `src/design-system/tokens.ts`
- **Components:** `src/design-system/components/`
- **Browse it visually:** Storybook → `npm run storybook` (opens in the browser)

> Screens must import from `src/design-system` — never hardcode a color, size, or font.

---

## Foundations (tokens)

### Colors
Semantic roles (use these), defined in `color.*`:

| Role | Token | Value |
|------|-------|-------|
| App background | `color.surface.bg` | `#FEFFFB` |
| Grey card | `color.surface.card` | `#F2F4F1` |
| Secondary / chip | `color.surface.secondary` | `#ECEFEA` |
| Primary button | `color.surface.btnPrimary` | `#15151D` |
| Primary text | `color.content.primary` | `#2A2929` |
| Heading | `color.content.heading` | `#2A2929` |
| Secondary heading | `color.content.secondaryHeading` | `#46585C` |
| Input / muted | `color.content.input` | `#666666` |
| On dark button | `color.content.onBtnPrimary` | `#FFFFFF` |
| Disabled text | `color.content.disabled` | `#B9BDB6` |
| Accent blue | `color.accent.blue` | `#5287E1` |
| Success green | `color.accent.green` | `#26B826` |
| Live dot | `color.accent.live` | `#E7FF7B` |
| Lead avatar | `color.accent.lilac` | `#F1DFFF` |
| Hairline | `color.border.hairline` | `#EFEFEA` |
| Row divider | `color.border.row` | `#D9D9D9` |

Brand gradient (boost/ad hero): `gradient.brand` — `#1A1D6F → #5287E1 → #CDDEC0` at 211°.

### Typography
Figma font **Saans** (commercial) → **Inter** (free) in code. Variants in `typography.*`:

| Variant | Size / line-height | Weight |
|---------|--------------------|--------|
| `h3` | 28 / 30 | Medium — page titles |
| `h5` | 20 / 26 | Regular |
| `h6` | 18 / 24 | Medium |
| `h7` | 16 / 22 | Medium |
| `h8` | 14 / 20 | Medium |
| `paragraphMd` | 16 / 22 | Regular |
| `paragraphSm` | 14 / 18 | Regular |
| `caption` | 12 / 18 | Regular |
| `button` | 16 / 22 | Medium |
| `buttonSubtle` | 14 / 20 | Medium |

### Spacing
`spacing.*`: `none 0 · xs 4 · sm 6 · md 8 · lg 12 · xl 16 · xxl 20 · xxxl 24 · huge 32`
(page grid = 16, editor grid = 8)

### Radius
`radius.*`: `sm 7 · md 12 · lg 16 · xl 24 · c32 32 · c40 40 · pill 999`

### Elevation
`shadow.tertiary` (glass buttons) and `shadow.card`. Figma "Tertiary action" = backdrop blur 35.9 + drop shadow `#00000014` y4 blur12.

### Icon sizes
`iconSize.*`: `sm 16 · md 20 · lg 24 · xl 32`. Icon set: **Phosphor** (`phosphor-react-native`).

---

## Components

| Component | Purpose | Variants / States |
|-----------|---------|-------------------|
| `Text` | typed text primitive | variant (all typography) × tone (primary/heading/secondaryHeading/input/onDark/disabled) |
| `Button` | app button | primary / secondary / tertiary · size default/subtle · default / pressed / loading / disabled · optional left icon |
| `IconButton` | circular icon button | plain / surface / glass · pressed · disabled |
| `Tag` | small pill label | light / solid |
| `SearchField` | grey search input | empty / typing |
| `Avatar` | round avatar | photo / lilac initials · any size |
| `Card` | rounded container | surface / plain / custom background |
| `ProgressRing` | % ring, label centered | any percent / size |
| `ListRow` | lead/inbox row | unread / read · pressed |
| `TabBar` | bottom navigation | active (filled+semibold) / inactive · unread dot |
| `StepHeader` | multi-step flow header | back · progress track · close · "Step X of Y" |
| `OptionCard` | selectable option card | default / selected · icon · badge · disabled |
| `ChannelGlyph` | channel brand logo (Google/IG/FB) | tinted to channel color |
| `ChannelCard` | selectable channel card (Concept B hub) | default / selected · channel-tinted |
| `SegmentedControl` | pill tab switcher | active thumb · optional icons |
| `BudgetSplitBar` | budget split across channels | segmented bar + legend |
| `InstagramPreview` / `FacebookPreview` | native-shape ad previews | photo · caption · CTA |

Each component has a matching `*.stories.tsx` showing every state.

---

## How to use

```tsx
import { Button, Text, Card, color, spacing } from "../design-system";

<Card>
  <Text variant="h6">Next steps to grow</Text>
  <Button label="Check it out" variant="primary" onPress={...} />
</Card>
```

## Adding to the system
1. Add/adjust the token in `tokens.ts`.
2. Build or update the component in `components/`.
3. Add states to its `*.stories.tsx`.
4. Update this doc's component table.
5. `npm run storybook` to verify visually.

## Honest notes
- **Font:** Inter stands in for Saans (commercial). Drop real Saans `.ttf`s + update `fontFamily` for an exact match.
- Data shown in stories/screens is mock content.

# Merlin Designer — Worked Patterns & Verification

## A. Importing from the design system (always do this)

```tsx
import {
  Text, Button, Card, TextField, Slider, ProgressRing,
  color, spacing, radius, typography,
} from "../design-system";
```

Never:
```tsx
// ❌ off-system
<Text style={{ fontSize: 18, color: "#201F1F" }}>Title</Text>
<View style={{ padding: 16, borderRadius: 16, backgroundColor: "#F2F4F1" }} />
```

Instead:
```tsx
// ✅ on-system
<Text variant="h6">Title</Text>
<Card>{/* ... */}</Card>
```

## B. A screen skeleton (matches existing screens)

```tsx
import { ScrollView, StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import { Text, Button, color, spacing } from "../design-system";

export default function ExampleScreen() {
  return (
    <>
      <AppBar title="Example" />
      <ScrollView style={s.scroll} contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text variant="h5">Heading</Text>
        {/* content */}
        <Button label="Primary action" variant="primary" onPress={() => {}} />
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.xl },
});
```

## C. Adding a NEW design-system component

1. `src/design-system/components/MyThing.tsx` — props, variants, all states, tokens only.
2. Export it from `src/design-system/index.ts`.
3. `src/design-system/components/MyThing.stories.tsx` — one story per state.
4. Add a row to the component table in `DESIGN_SYSTEM.md`.

## D. Designing from a spec/PRD

1. Read the doc (e.g. `docs/PRD-campaigns.md`).
2. Map each flow step → a screen + its states.
3. State the Design Read, confirm the dial.
4. Build screen-by-screen; wire navigation/state in the parent (e.g. a `useState` step index,
   matching how `App.tsx` switches tabs).
5. Verify in the simulator (below).

## E. Verify in the simulator (commands)

```bash
# 1. Make sure Metro is running (start if needed)
npx expo start            # press i for simulator, or:
# 2. Confirm the iOS bundle compiles clean (no red error JSON)
curl -s "http://localhost:8081/index.bundle?platform=ios&dev=true" -o /tmp/b.js -w "%{http_code} %{size_download}b\n"
#    head -c 1 /tmp/b.js  → "{" means an error; otherwise it built.
# 3. Launch the app on the booted simulator
xcrun simctl openurl booted "exp://127.0.0.1:8081"
# 4. Screenshot the current screen to self-check
xcrun simctl io booted screenshot /tmp/check.png
#    then downscale for review: sips -Z 600 -s format jpeg /tmp/check.png --out /tmp/check.jpg
```

To screenshot a specific screen/state, temporarily set the app's initial state to that screen,
reload, screenshot, then revert (as done when verifying the three Merlin tabs).

## F. Brand voice cheatsheet (UI copy)

- Talk to a non-technical owner. Explain, don't impress.
- "We'll write your ad and put you on Google. You set the budget." ✅
- "Leverage omnichannel synergies." ❌
- Encouraging and calm. Plain words. No jargon, no em-dashes.

## G. Reference: the design system at a glance

- **Tokens:** `color.{surface,content,border,accent,icon}`, `palette.*`, `typography.{h3,h5,h6,h7,h8,
  paragraphMd,paragraphSm,caption,button,buttonSubtle}`, `spacing.{xs..huge}`, `radius.{sm..pill}`,
  `shadow.{tertiary,card}`, `iconSize.{sm,md,lg,xl}`, `gradient.brand`.
- **Components:** Text, Button, IconButton, Tag, Chip, SearchField, TextField, Avatar, Card,
  ProgressRing, ListRow, TabBar, Toggle, Radio, Slider, Toast, Dialog, StepCard.
- **Screens:** HomeScreen, LeadsScreen, CampaignsScreen (+ Analytics placeholder).

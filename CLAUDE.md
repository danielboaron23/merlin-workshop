# Merlin — workshop demo app

Expo + React Native (TypeScript) app rebuilt **1:1 from a Figma file** (key `YKyeGWVAXZloSOj9i5trRj`).
Used in Daniel's "working with Claude Code on a mobile project" workshop.

## Run it
- `npx expo start` then:
  - press `i` → iOS Simulator (most reliable for the workshop / projector)
  - press `w` → browser at http://localhost:8081
  - phone: open **Expo Go**, manually enter `exp://<your-LAN-ip>:8081` (don't tap the link)
- If the browser/web shows a stale error, restart with `npx expo start -c` (clears cache).

## Structure
- `App.tsx` — loads Inter fonts, holds the active-tab state, renders one screen at a time
- `src/theme.ts` — exact Figma tokens (colors, type scale, radii, spacing, hero gradient)
- `src/assets.ts` — raster images (`assets/figma/*`)
- `src/components/`
  - `AppBar.tsx` — header; title variant (Campaigns/My Leads) or merlin wordmark (Home)
  - `BottomTabs.tsx` — Home/Leads/Analytics/Campaigns; active tab is filled + semibold
  - `Logos.tsx` — inline vector Merlin + Google logos (react-native-svg SvgXml)
  - `GoogleAdCard.tsx` — the white Google-ad mock, `scale` prop for the small Home variant
- `src/screens/` — `HomeScreen`, `LeadsScreen`, `CampaignsScreen`

## Fidelity notes
- Fonts: Figma uses **Saans** (commercial). We use **Inter** (closest free match) via `@expo-google-fonts/inter`.
- Icons: **phosphor-react-native** (matches the Phosphor set used in Figma).
- Gradients: **expo-linear-gradient** (211° deep-blue → blue → pale-green).
- Images (site photo, nail photo, avatar, Google G) downloaded from Figma into `assets/figma/`.
- Analytics tab has no Figma design yet → placeholder.

See `FIGMA_BUILD_NOTES.md` for the exact token values and asset node IDs.

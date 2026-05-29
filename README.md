# Merlin (workshop demo)

A mobile app built with **Expo + React Native (TypeScript)**, recreated 1:1 from a Figma design.
It mirrors the UI of [Merlin](https://merlin-site.com) — a tool that turns a small business's social
content into a website, then brings in customers through Google Ads and a leads inbox.

Three screens, switched with the bottom tab bar:

- **Home** — site preview card, "Next steps to grow" checklist (78% ring), Google boost card, coming-soon cards
- **Leads** — searchable list of incoming leads with avatars and unread dots
- **Campaigns** — "Merlin gets you booked" Google Ads boost screen

> Built live with **Claude Code** as a teaching example of working on a real mobile codebase.

---

## Prerequisites (one-time)

1. **Node.js** (v18 or newer) — check with `node -v`. Install from <https://nodejs.org> if missing.
2. **Expo Go** on your phone (to run it on a real device):
   - iPhone: App Store → "Expo Go"
   - Android: Google Play → "Expo Go"
3. *(Optional)* **Xcode** (Mac only) if you want the iOS Simulator.

No global install needed — `npx` runs Expo for you.

> **Workshop participants:** see **[BEFORE_THE_WORKSHOP.md](./BEFORE_THE_WORKSHOP.md)** for a
> friendly install checklist to do *before* the session.

This project targets **Expo SDK 54**, which the current App Store / Play Store **Expo Go** supports —
so it runs on real phones out of the box.

---

## Install & run

```bash
git clone https://github.com/danielboaron23/merlin-workshop.git
cd merlin-workshop
npm install        # first time only — downloads dependencies
npm start          # starts the dev server + shows a QR code
```

When the dev server is running, you have three ways to see the app:

| Where | How |
|-------|-----|
| 📱 **Your phone** | Open **Expo Go** and scan the QR code in the terminal (iPhone: use the Camera app to scan; Android: scan inside Expo Go). |
| 🖥️ **Browser** | Press **`w`** in the terminal → opens <http://localhost:8081>. |
| 📲 **iOS Simulator** (Mac) | Press **`i`** (requires Xcode). |

The app **hot-reloads**: edit a file, save, and it updates in ~1 second everywhere it's open.

### On a tricky network (guest/conference Wi-Fi)

If the QR code won't connect, use a tunnel (works through almost any network):

```bash
npm run tunnel     # = expo start --tunnel
```

First run may install a helper (`@expo/ngrok`) — say yes.

### Useful keys while the server runs
- `r` — reload the app
- `w` / `i` / `a` — open web / iOS simulator / Android emulator
- `c` — show the QR code again
- `Ctrl + C` — stop the server

### If something looks stale or broken
```bash
npm start -- -c    # restart with a cleared cache
```

---

## Project structure

```
App.tsx                  # loads fonts, holds the active tab, renders one screen at a time
src/
  theme.ts               # design tokens (colors, type scale, spacing) pulled from Figma
  assets.ts              # references to the image files
  components/
    AppBar.tsx           # top bar (page title, or the "merlin" logo on Home)
    BottomTabs.tsx       # bottom navigation
    Logos.tsx            # vector Merlin + Google logos
    Icons.tsx            # exact icon glyphs from Figma
    ProgressRing.tsx     # the 78% progress ring
    GoogleAdCard.tsx     # the white "Google Ads" mock card
  screens/
    HomeScreen.tsx
    LeadsScreen.tsx
    CampaignsScreen.tsx
assets/figma/            # images downloaded from the Figma file
```

## Design system

This repo also ships a full design system extracted from Figma — tokens + components,
browsable in Storybook:

```bash
npm run storybook   # opens the component catalog in the browser
```

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** for the tokens and component list.

## Notes
- The Figma uses the **Saans** font (commercial); this project uses **Inter** as the closest free match.
- The data (leads, names, messages) is mock content for the demo.
- `Analytics` tab is a placeholder — no Figma design for it yet.

## Workshop docs
- **[BEFORE_THE_WORKSHOP.md](./BEFORE_THE_WORKSHOP.md)** — what to install/bring beforehand
- **[WORKSHOP.md](./WORKSHOP.md)** — the step-by-step we follow during the session
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — the design-system reference

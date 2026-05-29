# Merlin Workshop — Student Setup Guide

Welcome! By the end of this guide you'll have a real mobile app running **on your own phone**,
edited live with **Claude Code**. No prior mobile experience needed.

Work through it top to bottom. If you get stuck on a step, raise your hand — don't skip ahead.

---

## What you'll need

- A laptop (Mac, Windows, or Linux)
- Your phone (iPhone or Android)
- Your laptop and phone **on the same Wi-Fi** (we'll have a backup if that fails)

---

## Part 1 — Install the tools (one-time, ~10 min)

### 1. Install Node.js
Node lets your computer run the project.

- Go to <https://nodejs.org> and install the **LTS** version.
- Check it worked — open a terminal and run:
  ```bash
  node -v
  ```
  You should see a version number like `v20.x` or higher. ✅

> **Terminal?** Mac: open the **Terminal** app. Windows: open **PowerShell**.

### 2. Install Claude Code
This is the AI we'll use to read and edit the code.

- Follow the install steps at <https://docs.claude.com/claude-code>.
- Then run `claude` in your terminal to make sure it starts.

### 3. Install "Expo Go" on your phone
This app lets your phone open the project.

- **iPhone:** App Store → search **Expo Go** → install.
- **Android:** Google Play → search **Expo Go** → install.

### 4. Install Xcode (for the iPhone Simulator)
We'll also run the app in a virtual iPhone on your Mac.

- Install **Xcode** from the **App Store**, then open it once to finish setup.
- ⏰ **Do this at home before the workshop** — Xcode is ~7–12GB and takes 30–60 min.

---

## Part 2 — Get the project (~5 min)

Your instructor will share the project folder (a zip or a git link).

- **If it's a zip:** unzip it, then in the terminal go into the folder:
  ```bash
  cd path/to/Merlin
  ```
- **If it's a git link:**
  ```bash
  git clone <the-link>
  cd Merlin
  ```

Then install the project's dependencies (one time):

```bash
npm install
```

This downloads everything the app needs. Wait for it to finish (it may take a minute).

---

## Part 3 — Run the app on your phone (~5 min)

Start the development server:

```bash
npm start
```

A **QR code** appears in your terminal. Now open the app on your phone:

- **iPhone:** open the **Camera** app, point it at the QR code, tap the yellow banner.
- **Android:** open **Expo Go**, tap **Scan QR code**, point it at the code.

The app loads on your phone in a few seconds. 🎉 Scroll, tap the bottom tabs (Home / Leads / Campaigns).

### 😟 QR code won't connect?
The room Wi-Fi may block it. Stop the server (`Ctrl + C`) and start a **tunnel** instead:

```bash
npm run tunnel
```

If it asks to install a helper, say **yes**. Scan the new QR code the same way.

### Want to see it on your laptop too?
With the server running:
- press **`w`** — the app opens in your **browser** at <http://localhost:8081>
- press **`i`** — the app opens in the **iPhone Simulator** (needs Xcode installed)

---

## Part 4 — The magic: edit live with Claude Code

Keep the app open on your phone. In a **second terminal window**, in the same folder, start Claude:

```bash
claude
```

Now try asking it to make a change, for example:

> "In the Campaigns screen, change the button text from 'Check it out' to 'Boost me now'."

Save → watch your **phone update by itself** in about a second. That loop — *ask Claude → see it live on
your phone* — is the heart of the workshop.

More ideas to try:
- "Change the main brand color in `src/theme.ts` and show me."
- "Add a new lead named 'Daniel Cohen' to the Leads list."
- "Make the 'Merlin gets you booked' title bigger."

---

## Handy commands & keys

| Action | What to do |
|--------|-----------|
| Start the app | `npm start` |
| Start on tricky Wi-Fi | `npm run tunnel` |
| Reload the app | press `r` in the server terminal |
| Open in browser | press `w` |
| Show the QR code again | press `c` |
| Stop the server | `Ctrl + C` |
| Fix weird/stale behavior | `npm start -- -c` (clears the cache) |

---

## Troubleshooting

- **"command not found: npm"** → Node didn't install. Redo Part 1, step 1, then restart your terminal.
- **QR scan does nothing** → use `npm run tunnel` (Part 3).
- **Phone shows a red error screen** → press `r` to reload; if it persists, stop and run `npm start -- -c`.
- **Browser page is blank/old** → stop the server and run `npm start -- -c`.
- **App won't load on phone but works in browser** → phone and laptop are on different Wi-Fi, or the
  network blocks it → use `npm run tunnel`.

---

## What is this app, anyway?

It recreates **Merlin** (<https://merlin-site.com>) — a tool for small service businesses (think a nail
studio or photographer). Merlin turns their social content into a website, then helps customers find them
through **Google Ads** (the *Campaigns* screen) and keeps every enquiry in one **Leads** inbox. The
*Home* screen shows the site preview and a checklist of next steps to grow.

We rebuilt its three screens from a Figma design — entirely through Claude Code — to show how you can work
on a real mobile app even if you've never touched mobile development before.

# Before the Workshop — what to install & bring ✅

Hi! 👋 Please do this **before** the workshop so we don't lose time on setup.
It takes about **20–30 minutes** (most of it is the Xcode download — see below ⏰).
If you get stuck on any step, that's fine — come a few minutes early and we'll sort it out together.

> **Goal:** by the end of the workshop you'll have a real mobile app running **on your own phone**,
> and you'll edit it live using an AI coding assistant. Everything below is free.

---

## 🧰 What to bring on the day

- [ ] Your **Mac laptop** — and its **charger**
- [ ] Your **phone** (iPhone or Android) — and its **charger**
- [ ] Your **Apple ID / Google account password** (you may need it to install an app)
- [ ] Both devices able to join **the same Wi-Fi** (we'll share the workshop network)

---

## 💻 Install on your LAPTOP (one-time)

### 1. Node.js  *(this lets your computer run the project)*
- Go to **<https://nodejs.org>** and download the **LTS** version (the big green button).
- Install it (just keep clicking Next / Continue).
- **Check it worked:** open a terminal and type:
  ```bash
  node -v
  ```
  You should see a version number like `v20.x` or higher. ✅
  - **Mac:** the terminal is the **Terminal** app (Cmd+Space → type "Terminal").
  - **Windows:** use **PowerShell** (Start menu → type "PowerShell").

### 2. A code editor  *(pick one — whichever you prefer)*
- **VS Code** — from **<https://code.visualstudio.com>**, or
- **Cursor** — from **<https://cursor.com>** (editor with built-in AI)

We'll use it to look at the code.

### 3. Claude Code  *(the AI assistant we'll use to edit the app)*
- Follow the install guide at **<https://docs.claude.com/claude-code>**.
- After installing, type `claude` in your terminal to confirm it opens.
- ℹ️ You'll need an Anthropic account / login — set that up in advance if you can.

### 4. Git  *(to download the project)*
- Type `git --version` in Terminal. If it's missing, it will offer to install — accept.

### 5. Xcode  *(for the iPhone Simulator on your Mac)*
- Install from the **App Store** (search "Xcode").
- After installing, open it once and accept the additional components it asks to download.
- **Check:** type `xcode-select -p` in Terminal — it should print a path. ✅

> ⏰ **Very important — download this in advance at home!** Xcode is **huge**
> (~7–12GB download, ~15–40GB installed) and takes **30–60 minutes**. It **cannot**
> be installed during the workshop — please do it the day before, on good Wi-Fi.

---

## 📱 Install on your PHONE (one-time)

Install **Expo Go** — this free app lets your phone run the project we build:

- **iPhone:** App Store → search **"Expo Go"** → Install
- **Android:** Google Play → search **"Expo Go"** → Install

> ⚠️ **Important:** just install it — **don't worry if it shows an error** when you first open it.
> It only works once we start the project together in the workshop.

---

## ✅ 5-minute test (optional but recommended)

If you want to be 100% ready, try running the project once at home:

```bash
# 1. Download the project
git clone https://github.com/danielboaron23/merlin-workshop.git
cd merlin-workshop

# 2. Install its dependencies (one-time, ~1–2 min)
npm install

# 3. Start it
npm start
```

A **QR code** appears in your terminal.
- **iPhone:** open the **Camera** app, point at the QR, tap the **"Open in Expo Go"** banner.
- **Android:** open **Expo Go**, tap **Scan QR code**, point at the code.

The app should open on your phone. 🎉 If it does — you're fully ready!

**If the QR won't connect** (common on some home networks), stop the server (`Ctrl + C`) and run:
```bash
npm run tunnel
```
Then scan the new QR. (The first time, if it asks to install a helper, say **yes**.)

---

## ❓ Common questions

**Why do I need that heavy Xcode?**
It includes the **iPhone Simulator** — a virtual iPhone on your Mac screen where we'll run and
show the app (great for projecting). Without it you can still see the app on your phone and in the
browser, but we'll use the simulator in this workshop — so install it **in advance** (it's big and the download is long).

**Do I need to know how to code?**
No. The whole point is that the AI does the coding — you'll just describe what you want.

**The Expo Go app shows an error / blank screen when I open it.**
That's normal before the workshop. It needs a running project to connect to, which we start together.

**My phone says "project is incompatible with this version of Expo Go".**
Make sure Expo Go is updated to the latest version from the App Store / Play Store. (We've matched the project to the current Expo Go, so an up-to-date app will work.)

**Nothing happens when I scan the QR.**
Your phone and laptop must be on the **same Wi-Fi**. If they are and it still fails, use `npm run tunnel` (above).

---

## 📋 Quick checklist (tick these off before you arrive)

- [ ] Node.js installed (`node -v` shows a version)
- [ ] Code editor installed (VS Code or Cursor)
- [ ] Claude Code installed (`claude` opens) + Anthropic login ready
- [ ] Git installed (`git --version` shows a version)
- [ ] **Xcode** installed in advance (`xcode-select -p` prints a path) — heavy download, do it at home!
- [ ] **Expo Go** installed on your phone (latest version)
- [ ] *(optional)* Ran the 5-minute test successfully

See you there! For the full step-by-step we'll follow during the session, see **[WORKSHOP.md](./WORKSHOP.md)**.

/**
 * Merlin Design System — token source of truth.
 *
 * Extracted 1:1 from the Figma file (key YKyeGWVAXZloSOj9i5trRj) via
 * get_variable_defs + component inspection. Everything in the app should read
 * from here — never hardcode a color, size, or spacing in a screen.
 *
 * Figma font is "Saans" (commercial); we ship "Inter" as the closest free match.
 */

/* ----------------------------------------------------------------------------
 * 1. PRIMITIVE COLORS  (raw palette — usually referenced via `color` below)
 * ------------------------------------------------------------------------- */
export const palette = {
  white: "#FFFFFF",
  black: "#000000",

  // neutrals / ink
  ink900: "#15151D", // primary button bg
  ink800: "#201F1F", // headings / secondary button text
  ink700: "#2A2929", // primary content
  ink500: "#666666", // input text / muted
  ink400: "#797979", // subtle
  ink300: "#9CA3AF", // inactive
  ink200: "#B9BDB6", // disabled text

  // off-white surfaces
  bg: "#FEFFFB", // app background
  card: "#F2F4F1", // grey card
  secondary: "#ECEFEA", // secondary button / chip
  line: "#EFEFEA", // hairline dividers (nav)
  rowLine: "#D9D9D9", // list row dividers

  // brand accents
  blueDeep: "#1A1D6F", // gradient start
  blueMid: "#5287E1", // gradient mid / primary accent
  greenPale: "#CDDEC0", // gradient end
  green: "#26B826", // success / publish check
  lime: "#E7FF7B", // "live" dot
  lilac: "#F1DFFF", // lead avatar bg

  // semantic text-on-surface
  secondaryHeading: "#46585C",

  // google-ad mock
  adTitle: "#1C0BB2",
  adDesc: "#545454",
  googleGrey: "#5E5E5E",

  // feature "coming soon" tiles
  comingPayments: "#DEE5E3",
  comingBooking: "#E9F2FF",
  comingChat: "#E5EFE6",

  // status
  notification: "#FF3B30",

  // ad channels (Concept B) — official brand colors, used only for channel cues
  googleBlue: "#4285F4",
  googleRed: "#EA4335",
  googleYellow: "#FBBC05",
  googleGreen: "#34A853",
  instagram: "#E1306C", // IG magenta (gradient anchor)
  instagramTo: "#F77737", // IG warm orange (gradient end)
  facebook: "#1877F2", // FB blue
};

/* ----------------------------------------------------------------------------
 * 2. SEMANTIC COLORS  (named by role — matches Figma variable names)
 * ------------------------------------------------------------------------- */
export const color = {
  surface: {
    bg: palette.bg, // Surface/srfc-bg-primary
    card: palette.card, // Surface/srfc-card-primary
    secondary: palette.secondary, // Surface/secondary action
    btnPrimary: palette.ink900, // Surface/srfc-btn-primary
    btnSecondary: palette.secondary, // Surface/srfc-btn-bg-secondary
  },
  content: {
    primary: palette.ink700, // Content/cnt-primary
    heading: palette.ink700, // Text/primary heading
    secondaryHeading: palette.secondaryHeading, // Text/secondary heading
    input: palette.ink500, // Content/cnt-input-primary
    onBtnPrimary: palette.white, // Content/cnt-btn-primary
    onBtnSecondary: palette.ink800, // Content/cnt-btn-secondary
    onBtnTertiary: palette.ink700, // Content/cnt-btn-tertiary
    disabled: palette.ink200,
  },
  border: {
    hairline: palette.line,
    row: palette.rowLine,
    tertiaryHover: "#FFFFFF4D", // Border/tertiary action-hover
  },
  accent: {
    blue: palette.blueMid,
    green: palette.green,
    live: palette.lime,
    lilac: palette.lilac,
  },
  icon: {
    onActionBrand: palette.ink800, // Icons/on-action brand [fixed]
  },
};

/* ----------------------------------------------------------------------------
 * 3. TYPOGRAPHY  (the Mobile/* text styles)
 * ------------------------------------------------------------------------- */
export const fontFamily = {
  regular: "Inter_400Regular", // Saans Regular
  medium: "Inter_500Medium", // Saans Medium
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

/** Each entry maps to a named Figma text style. */
export const typography = {
  h3: { fontFamily: fontFamily.medium, fontSize: 28, lineHeight: 30, letterSpacing: 0 }, // page titles
  h5: { fontFamily: fontFamily.regular, fontSize: 20, lineHeight: 26, letterSpacing: -0.4 },
  h6: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 24, letterSpacing: 0 },
  h7: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
  h8: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20, letterSpacing: -0.14 },
  caption: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 18, letterSpacing: -0.24 }, // h9
  paragraphSm: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 18, letterSpacing: 0 },
  paragraphMd: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
  button: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
  buttonSubtle: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
} as const;

export type TypographyVariant = keyof typeof typography;

/* ----------------------------------------------------------------------------
 * 4. SPACING  (foundation/padding + grid)
 * ------------------------------------------------------------------------- */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16, // grid/page
  xxl: 20,
  xxxl: 24,
  huge: 32,
};

/* ----------------------------------------------------------------------------
 * 5. RADII  (foundation/corners)
 * ------------------------------------------------------------------------- */
export const radius = {
  none: 0,
  sm: 7,
  md: 12,
  lg: 16,
  xl: 24,
  c32: 32,
  c40: 40,
  pill: 999,
};

/* ----------------------------------------------------------------------------
 * 6. EFFECTS  (Figma "Tertiary action": backdrop blur + drop shadow)
 * ------------------------------------------------------------------------- */
export const shadow = {
  // RN shadow approximation of the Figma drop shadow #00000014 y4 blur12
  tertiary: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
};

export const blurRadius = { tertiary: 18 };

/* ----------------------------------------------------------------------------
 * 7. ICON SIZES
 * ------------------------------------------------------------------------- */
export const iconSize = { sm: 16, md: 20, lg: 24, xl: 32 };

/* The 211° brand gradient used on the boost/ad hero cards. */
export const gradient = {
  brand: {
    colors: [palette.blueDeep, palette.blueMid, palette.greenPale] as const,
    start: { x: 0.9, y: 0 },
    end: { x: 0.1, y: 1 },
  },
  // Channel gradients (Concept B) — for channel cues only.
  instagram: {
    colors: ["#F77737", "#E1306C", "#833AB4"] as const,
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  },
};

/* Per-channel brand palette (Concept B). One place for channel identity. */
export const channelColor = {
  google: palette.googleBlue,
  instagram: palette.instagram,
  facebook: palette.facebook,
};

export const tokens = {
  palette,
  color,
  typography,
  fontFamily,
  spacing,
  radius,
  shadow,
  blurRadius,
  iconSize,
  gradient,
  channelColor,
};

export default tokens;

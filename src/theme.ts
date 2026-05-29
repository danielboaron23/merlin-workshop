/**
 * Merlin design tokens (screen-facing shape).
 *
 * ⚠️ The CANONICAL design system now lives in `src/design-system/`
 *    (tokens.ts + components + Storybook + DESIGN_SYSTEM.md).
 *    Values here match it 1:1 and are kept for the existing screens.
 *    NEW work should import from `../design-system` (see DESIGN_SYSTEM.md).
 *
 * Figma file: YKyeGWVAXZloSOj9i5trRj
 */
export const colors = {
  // Surfaces
  bg: "#FEFFFB", // Surface/srfc-bg-primary
  card: "#F2F4F1", // grey card (search bars, steps panel)
  secondaryAction: "#ECEFEA", // Surface/secondary action
  white: "#FFFFFF",

  // Text / content
  ink: "#201F1F", // headings (cnt-btn-secondary)
  primary: "#2A2929", // Content/cnt-primary
  inputGrey: "#666666", // dates / muted
  btnPrimary: "#15151D", // Surface/srfc-btn-primary (dark CTA)

  // Accents
  blueDeep: "#1A1D6F", // gradient start
  blueMid: "#5287E1", // gradient mid
  greenPale: "#CDDEC0", // gradient end
  liveDot: "#E7FF7B",
  green: "#26B826", // publish check
  leadAvatar: "#F1DFFF", // lilac lead avatars

  // Google ad mock
  adTitle: "#1C0BB2",
  adDesc: "#545454",
  googleGrey: "#5E5E5E",

  // Coming-soon cards
  comingPayments: "#DEE5E3",
  comingBooking: "#E9F2FF",
  comingChat: "#E5EFE6",

  // Lines / borders
  line: "#EFEFEA",
  rowLine: "#D9D9D9",
  tabInactive: "#9CA3AF",

  siteOverlay: "rgba(0,0,0,0.45)",
};

// Type scale (Saans in Figma → Inter here). size / lineHeight / letterSpacing
export const type = {
  h3: { fontSize: 28, lineHeight: 30 }, // page titles
  h5: { fontSize: 20, lineHeight: 26, letterSpacing: -0.4 },
  h6: { fontSize: 18, lineHeight: 24 },
  h7: { fontSize: 16, lineHeight: 22 }, // medium
  h8: { fontSize: 14, lineHeight: 20, letterSpacing: -0.14 },
  paragraphSm: { fontSize: 14, lineHeight: 18 },
  paragraphMd: { fontSize: 16, lineHeight: 22 },
  caption: { fontSize: 12, lineHeight: 18, letterSpacing: -0.24 },
  button: { fontSize: 18, lineHeight: 22 },
  buttonSubtle: { fontSize: 14, lineHeight: 20 },
};

// Inter font families (loaded in App.tsx)
export const font = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, c32: 32, c40: 40, pill: 999 };
export const space = { xs: 4, sm: 6, md: 8, lg: 12, xl: 16, xxl: 20, xxxl: 24 };

// The 211° gradient used on the boost/ad cards
export const heroGradient = {
  colors: [colors.blueDeep, colors.blueMid, colors.greenPale] as const,
  // 211° ≈ pointing down-left
  start: { x: 0.9, y: 0 },
  end: { x: 0.1, y: 1 },
};

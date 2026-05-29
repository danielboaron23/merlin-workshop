# Merlin — Pixel-perfect build notes

Figma file: YKyeGWVAXZloSOj9i5trRj
Nodes: Home 0-760 · Leads 0-726 · Campaigns 0-684

## Exact tokens (from get_variable_defs)
- bg primary: #fefffb
- button primary: #15151d   · button text: #ffffff
- text primary / cnt-primary: #2a2929
- btn tertiary text: #2a2929 · secondary action surface: #ecefea
- card grey (search/steps): #f2f4f1
- ad title link: #1c0bb2 · ad desc: #545454
- lead avatar bg: #f1dfff
- live dot: #e7ff7b · publish check green: #26b826
- coming soon: payments #dee5e3 · booking #e9f2ff · chatgpt #e5efe6
- font family: Saans (COMMERCIAL — using Inter as nearest free)
- Type scale: H5 20/26 reg(-0.4), H6 18/24, H7 16/22 med, H8 14/20 med, H9(caption) 12/18, paragraph-sm 14/18, paragraph-md 16/22, buttons 18/22
- corners: 32, 40, 16, 12, 24 ; padding scale: 6/8/16/24

## Downloaded raster assets -> assets/figma/
- avatar.png        37866831-b0e9-4683-b44e-b42a0c1d6ae1  (profile pic, app bar)
- merlin-logo.png   62f3cf80-6a56-4728-87c0-66bbb7643847  (Home wordmark)
- google-logo.png   b5aa8879-b006-4cf0-8f33-086435e6203d  (full color "Google" wordmark)
- google-g.png      f7e4c2f6-47e6-40a7-841a-eea5f9219271  (multicolor G icon)
- site-photo.jpg    ed51eefe-385e-4cc6-966e-beadb65904a4  (site card bg, 1206x1599)
- nail-photo.jpg    e0d9ed21-7f82-4b62-85df-ac215eb5f89d  (ad thumbnail)

## Libs to use
- phosphor-react-native + react-native-svg : icons (House, EnvelopeSimpleOpen, ChartBar, StarFour, Bell, Question, MagnifyingGlass, FunnelSimple, CreditCard, CalendarDots, OpenAiLogo, Globe, Confetti, ArrowRight, Check, PencilSimple, ArrowSquareOut, DotsThree)
- expo-linear-gradient : boost card + ad hero gradient (211deg #1A1D6F -> #5287E1 -> #CDDEC0)
- expo-blur (optional glass)
- Inter font via @expo-google-fonts/inter OR system fallback

## Tab bar icons (Phosphor)
Home=House(weight fill when active) · Leads=EnvelopeSimpleOpen · Analytics=ChartBar · Campaigns=StarFour
Leads tab has unread red/blue dot.

## Status: assets downloaded + libs install issued. Need to confirm then rebuild 3 screens.

import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppBar from "../components/AppBar";
import GoogleAdCard from "../components/GoogleAdCard";
import { colors, font, heroGradient, radius, space, type } from "../theme";
import CampaignDashboard from "./campaign/CampaignDashboard";
import CampaignsConceptB from "./campaign/CampaignsConceptB";
import { CAMPAIGNS_CONCEPT } from "./campaign/concept";
import CreateCampaignFlow from "./campaign/CreateCampaignFlow";
import { CampaignDraft } from "./campaign/draft";

type View_ = "landing" | "flow" | "dashboard";

/**
 * Campaigns tab. Two concepts, switched by CAMPAIGNS_CONCEPT (src/screens/campaign/concept.ts):
 *  - "A" → Google-first single flow behind "Check it out"   (docs/PRD-campaigns.md)
 *  - "B" → channel-first builder (pick/combine channels)    (docs/PRD-campaigns-concept-b.md)
 *
 * Concept A is the small state machine below (landing → flow → dashboard).
 */
export default function CampaignsScreen() {
  if (CAMPAIGNS_CONCEPT === "B") return <CampaignsConceptB />;
  return <CampaignsConceptA />;
}

function CampaignsConceptA() {
  const [view, setView] = useState<View_>("landing");
  const [draft, setDraft] = useState<CampaignDraft | null>(null);

  if (view === "flow") {
    return (
      <CreateCampaignFlow
        onClose={() => setView(draft ? "dashboard" : "landing")}
        onLaunched={(d) => {
          setDraft(d);
          setView("dashboard");
        }}
      />
    );
  }

  if (view === "dashboard" && draft) {
    return (
      <CampaignDashboard
        draft={draft}
        onEdit={() => setView("flow")}
        onEnd={() => {
          setDraft(null);
          setView("landing");
        }}
      />
    );
  }

  return (
    <>
      <AppBar title="Campaigns" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient hero with the glass Google-ad mock */}
        <LinearGradient
          colors={heroGradient.colors}
          start={heroGradient.start}
          end={heroGradient.end}
          style={styles.hero}
        >
          <View style={styles.glass}>
            <GoogleAdCard scale={1.1} />
          </View>
        </LinearGradient>

        {/* title -> 16 -> subtitle (exactly two lines) */}
        <View style={styles.textBlock}>
          <Text style={styles.heading}>Merlin gets you booked</Text>
          <View style={styles.subBlock}>
            <Text style={styles.subheading} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
              Every day people search for what you do.
            </Text>
            <Text style={styles.subheading} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
              We make sure they find you on Google.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={() => setView("flow")}>
          <Text style={styles.ctaText}>Check it out</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  // Center the block vertically (matches Figma); flexGrow keeps it scrollable on short screens.
  body: {
    flexGrow: 1,
    paddingHorizontal: space.xl,
    paddingVertical: space.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: "100%",
    height: 269,
    borderRadius: radius.c32,
    alignItems: "center",
    overflow: "hidden",
  },
  glass: {
    marginTop: 24,
    width: 293,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  textBlock: { alignSelf: "stretch", marginTop: 28, gap: space.xl },
  heading: {
    fontFamily: font.medium,
    fontSize: 32,
    lineHeight: 38,
    color: colors.ink,
    textAlign: "center",
    letterSpacing: -0.64,
  },
  subBlock: { alignSelf: "stretch" },
  subheading: {
    fontFamily: font.regular,
    fontSize: type.h6.fontSize,
    lineHeight: type.h6.lineHeight,
    color: "#46585C",
    textAlign: "center",
    letterSpacing: -0.36,
  },
  cta: {
    backgroundColor: colors.btnPrimary,
    borderRadius: radius.c40,
    height: 56,
    minWidth: 234,
    paddingHorizontal: space.xxxl,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
  },
  ctaText: {
    color: colors.white,
    fontFamily: font.medium,
    fontSize: type.button.fontSize,
    lineHeight: type.button.lineHeight,
  },
});

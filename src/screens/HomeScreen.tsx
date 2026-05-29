import { LinearGradient } from "expo-linear-gradient";
import {
  CalendarDots,
  CreditCard,
  DotsThree,
  OpenAiLogo,
  PencilSimple,
  ShareNetwork,
} from "phosphor-react-native";
import { ComponentType } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { images } from "../assets";
import AppBar from "../components/AppBar";
import GoogleAdCard from "../components/GoogleAdCard";
import { ArrowRightIcon, CheckIcon, ConfettiIcon, GlobeIcon } from "../components/Icons";
import ProgressRing from "../components/ProgressRing";
import { colors, font, heroGradient, radius, space, type } from "../theme";

/** "Mor Makiri home design" site preview card. */
function SiteCard() {
  return (
    <ImageBackground source={images.sitePhoto} style={styles.siteCard} imageStyle={styles.siteImg}>
      <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]} style={StyleSheet.absoluteFill} />
      <View>
        <Text style={styles.siteName}>Mor Makiri home design</Text>
        <View style={styles.siteStatusRow}>
          <View style={styles.liveDot} />
          <Text style={styles.siteStatus}>
            <Text style={styles.live}>Live</Text>  ·  www.mormakiri.merlin
          </Text>
        </View>
      </View>
      <View style={styles.siteButtons}>
        <View style={styles.glassBtn}>
          <PencilSimple size={16} color={colors.primary} weight="regular" />
          <Text style={styles.glassBtnText}>Edit</Text>
        </View>
        <View style={styles.glassBtn}>
          <ShareNetwork size={16} color={colors.primary} weight="regular" />
          <Text style={styles.glassBtnText}>Share</Text>
        </View>
        <View style={styles.glassBtnIcon}>
          <DotsThree size={18} color={colors.primary} weight="bold" />
        </View>
      </View>
    </ImageBackground>
  );
}

/**
 * One row in "Next steps to grow".
 * `iconTile` is the 48×48 leading tile (image bg or solid), `glyph` sits on top.
 */
function StepRow({
  tile,
  title,
  sub,
  done,
}: {
  tile: React.ReactNode;
  title: string;
  sub?: string;
  done?: boolean;
}) {
  return (
    <View style={styles.stepRow}>
      {tile}
      <View style={styles.stepBody}>
        <Text style={[styles.stepTitle, done && styles.stepDone]}>{title}</Text>
        {sub ? (
          <View style={styles.subChip}>
            <Text style={styles.subChipText}>{sub}</Text>
          </View>
        ) : null}
      </View>
      {done ? (
        <View style={styles.checkCircle}>
          <CheckIcon size={15} />
        </View>
      ) : (
        <View style={styles.arrowCircle}>
          <ArrowRightIcon size={12} />
        </View>
      )}
    </View>
  );
}

function ComingCard({
  Icon,
  label,
  bg,
  full,
}: {
  Icon: ComponentType<{ size: number; color: string }>;
  label: string;
  bg: string;
  full?: boolean;
}) {
  return (
    <View style={[styles.comingCard, { backgroundColor: bg }, full && { width: "100%" }]}>
      <Icon size={24} color={colors.primary} />
      <Text style={styles.comingLabel}>{label}</Text>
      <View style={styles.comingTag}>
        <Text style={styles.comingTagText}>Coming soon</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <>
      <AppBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SiteCard />

        {/* Next steps to grow */}
        <View style={styles.stepsCard}>
          <View style={styles.stepsHeader}>
            <Text style={styles.stepsTitle}>Next steps to grow</Text>
            <ProgressRing percent={78} />
          </View>
          <View style={styles.stepList}>
            <StepRow
              tile={
                <View style={styles.stepTileSolid}>
                  <Image source={images.googleG} style={{ width: 28, height: 28 }} resizeMode="contain" />
                </View>
              }
              title="Get found on Google"
            />
            <StepRow
              tile={
                <ImageBackground source={images.tileDomain} style={styles.stepTileImg} imageStyle={styles.stepTileImgRadius}>
                  <GlobeIcon size={32} />
                </ImageBackground>
              }
              title="Get a custom domain"
              sub="www.mormakiri.com"
            />
            <StepRow
              tile={
                <ImageBackground source={images.tilePublish} style={styles.stepTileImg} imageStyle={[styles.stepTileImgRadius, { opacity: 0.4 }]}>
                  <View style={{ opacity: 0.5 }}>
                    <ConfettiIcon size={32} />
                  </View>
                </ImageBackground>
              }
              title="Publish your site"
              done
            />
          </View>
        </View>

        {/* Boost card */}
        <LinearGradient
          colors={heroGradient.colors}
          start={heroGradient.start}
          end={heroGradient.end}
          style={styles.boostCard}
        >
          <View style={styles.boostAd}>
            <GoogleAdCard scale={0.62} />
          </View>
          <Text style={styles.boostText}>Get your website to the top of Google search</Text>
          <View style={styles.boostArrow}>
            <ArrowRightIcon size={16} />
          </View>
        </LinearGradient>

        {/* Coming soon */}
        <View style={styles.comingRow}>
          <ComingCard Icon={CreditCard} label="Payments" bg={colors.comingPayments} />
          <ComingCard Icon={CalendarDots} label="Booking" bg={colors.comingBooking} />
        </View>
        <ComingCard Icon={OpenAiLogo} label="ChatGPT ads" bg={colors.comingChat} full />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  body: { paddingHorizontal: space.xl, paddingBottom: space.xxxl, gap: space.xl },

  // Site card
  siteCard: { height: 179, borderRadius: radius.xl, overflow: "hidden", padding: space.xl, justifyContent: "space-between" },
  siteImg: { borderRadius: radius.xl },
  siteName: { fontFamily: font.medium, fontSize: type.h6.fontSize, lineHeight: type.h6.lineHeight, color: colors.white },
  siteStatusRow: { flexDirection: "row", alignItems: "center", gap: space.md, marginTop: space.md },
  liveDot: { width: 9, height: 9, borderRadius: 999, backgroundColor: colors.liveDot },
  siteStatus: { fontFamily: font.regular, fontSize: type.h8.fontSize, color: colors.white },
  live: { fontFamily: font.medium },
  siteButtons: { flexDirection: "row", gap: space.md },
  glassBtn: { flexDirection: "row", alignItems: "center", gap: space.sm, backgroundColor: "rgba(254,255,251,0.9)", paddingHorizontal: space.xl, paddingVertical: space.md, borderRadius: radius.c40 },
  glassBtnIcon: { backgroundColor: "rgba(254,255,251,0.9)", padding: space.md, borderRadius: radius.c40, alignItems: "center", justifyContent: "center" },
  glassBtnText: { fontFamily: font.medium, fontSize: type.buttonSubtle.fontSize, color: colors.primary },

  // Next steps  (Figma: panel px14/pt16/pb14, gap20; header pl8/pr4; rows p12, gap12)
  stepsCard: { backgroundColor: colors.card, borderRadius: radius.lg, paddingHorizontal: 14, paddingTop: space.xl, paddingBottom: 14, gap: space.xxl },
  stepsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: space.md, paddingRight: space.xs },
  stepsTitle: { fontFamily: font.medium, fontSize: type.h6.fontSize, lineHeight: type.h6.lineHeight, color: colors.primary },
  stepList: { gap: space.md },
  stepRow: { flexDirection: "row", alignItems: "center", gap: space.lg, backgroundColor: colors.bg, borderRadius: radius.md, padding: space.lg },
  stepTileSolid: { width: 48, height: 48, borderRadius: 7, backgroundColor: colors.card, alignItems: "center", justifyContent: "center" },
  stepTileImg: { width: 48, height: 48, borderRadius: 7, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  stepTileImgRadius: { borderRadius: 7 },
  stepBody: { flex: 1, gap: 6 },
  stepTitle: { fontFamily: font.medium, fontSize: type.h7.fontSize, color: colors.primary },
  stepDone: { textDecorationLine: "line-through", opacity: 0.5 },
  subChip: { alignSelf: "flex-start", backgroundColor: colors.secondaryAction, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  subChipText: { fontFamily: font.regular, fontSize: type.paragraphSm.fontSize, color: "#2C2C2C" },
  arrowCircle: { width: 24, height: 24, borderRadius: 999, borderWidth: 1.5, borderColor: "#D8DDD6", alignItems: "center", justifyContent: "center" },
  checkCircle: { width: 24, height: 24, borderRadius: 999, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },

  // Boost card
  boostCard: { borderRadius: radius.lg, padding: space.lg, flexDirection: "row", gap: space.lg, alignItems: "center", minHeight: 171, overflow: "hidden" },
  boostAd: { width: 150 },
  boostText: { flex: 1, fontFamily: font.regular, fontSize: type.h5.fontSize, lineHeight: type.h5.lineHeight, letterSpacing: -0.4, color: colors.white },
  boostArrow: { position: "absolute", top: space.xl, right: space.xl, width: 36, height: 36, borderRadius: 999, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },

  // Coming soon
  comingRow: { flexDirection: "row", gap: space.sm },
  comingCard: { flex: 1, borderRadius: radius.lg, padding: space.xl, gap: space.xxxl },
  comingLabel: { fontFamily: font.medium, fontSize: type.h6.fontSize, color: colors.primary },
  comingTag: { alignSelf: "flex-start", backgroundColor: colors.bg, paddingHorizontal: space.md, paddingVertical: space.xs, borderRadius: 33 },
  comingTagText: { fontFamily: font.medium, fontSize: type.caption.fontSize, color: "#090909" },
});

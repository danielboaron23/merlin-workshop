import { MagnifyingGlass } from "phosphor-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { images } from "../assets";
import { colors, font } from "../theme";
import { GoogleLogo } from "./Logos";

/**
 * The little white "Google Ads" search-result mockup.
 * `scale` shrinks the whole thing for the small version on the Home boost card.
 */
export default function GoogleAdCard({ scale = 1 }: { scale?: number }) {
  const s = (n: number) => n * scale;
  return (
    <View style={[styles.card, { padding: s(11), borderRadius: s(20), gap: s(13) }]}>
      <View style={[styles.logoRow, { gap: s(4) }]}>
        <GoogleLogo width={s(40)} height={s(13)} />
        <Text style={[styles.ads, { fontSize: s(11) }]}>Ads</Text>
      </View>

      <View style={[styles.search, { borderRadius: s(292), paddingHorizontal: s(11), paddingVertical: s(8) }]}>
        <MagnifyingGlass size={s(15)} color="#999" weight="regular" />
        <Text style={[styles.cursor, { fontSize: s(13) }]}>|</Text>
      </View>

      <View style={[styles.ad, { borderRadius: s(15), padding: s(11), gap: s(8) }]}>
        <View style={[styles.adContent, { gap: s(11) }]}>
          <View style={[styles.adText, { gap: s(8) }]}>
            <Text style={[styles.adUrl, { fontSize: s(11) }]}>
              <Text style={{ fontFamily: font.bold }}>Ad</Text> · artup/merlin-site.com
            </Text>
            <Text style={[styles.adTitle, { fontSize: s(11.5) }]}>Art up nail studio NYC</Text>
            <Text style={[styles.adDesc, { fontSize: s(11) }]} numberOfLines={3}>
              Art Nail NYC in Manhattan focuses on gel nails and natural nail care for
              healthy, lasting results.
            </Text>
          </View>
          <Image source={images.nailPhoto} style={{ width: s(62), height: s(80), borderRadius: s(11) }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white },
  logoRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  ads: { fontFamily: font.medium, color: colors.googleGrey },
  search: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#F3F5F6" },
  cursor: { color: "#565656" },
  ad: { backgroundColor: colors.white, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  adContent: { flexDirection: "row" },
  adText: { flex: 1 },
  adUrl: { fontFamily: font.regular, color: "#101828" },
  adTitle: { fontFamily: font.medium, color: colors.adTitle },
  adDesc: { fontFamily: font.regular, color: colors.adDesc, lineHeight: 14 },
});

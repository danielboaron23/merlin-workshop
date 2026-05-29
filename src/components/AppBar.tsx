import { Bell, Question } from "phosphor-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { images } from "../assets";
import { colors, font, space, type } from "../theme";
import { MerlinLogo } from "./Logos";

/**
 * Top app bar. Pass a `title` for a page header (Campaigns, My Leads),
 * or omit it to show the merlin wordmark (Home).
 */
export default function AppBar({ title }: { title?: string }) {
  return (
    <View style={styles.bar}>
      {title ? <Text style={styles.title}>{title}</Text> : <MerlinLogo width={88} height={30} />}

      <View style={styles.icons}>
        <Bell size={24} color={colors.ink} weight="regular" />
        <Question size={24} color={colors.ink} weight="regular" />
        <Image source={images.avatar} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space.xxl,
    paddingVertical: space.lg + 3,
  },
  title: {
    fontFamily: font.medium,
    fontSize: 28,
    lineHeight: type.h3.lineHeight,
    color: colors.ink,
  },
  icons: { flexDirection: "row", alignItems: "center", gap: space.lg },
  avatar: { width: 24, height: 24, borderRadius: 999 },
});

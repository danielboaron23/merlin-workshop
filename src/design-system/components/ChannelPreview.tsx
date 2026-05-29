import { DotsThree, Heart, ChatCircle, PaperPlaneTilt, ThumbsUp } from "phosphor-react-native";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { color, palette, radius, spacing } from "../tokens";
import Text from "./Text";

/**
 * Native-shape ad previews for Instagram and Facebook, so the user sees how the
 * same source content (handle, photo, headline/caption) looks on each platform.
 * Tokens only; brand colors come from palette.
 */

type Common = {
  handle: string;
  photo: ImageSourcePropType;
  headline: string;
  caption: string;
};

export function InstagramPreview({ handle, photo, headline, caption }: Common) {
  return (
    <View style={styles.card}>
      <View style={styles.igHeader}>
        <View style={styles.igAvatarRing}>
          <Image source={photo} style={styles.igAvatar} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="buttonSubtle">{handle}</Text>
          <Text variant="caption" tone="input">Sponsored</Text>
        </View>
        <DotsThree size={20} color={color.content.primary} weight="bold" />
      </View>

      <Image source={photo} style={styles.igPhoto} />

      <View style={styles.igActions}>
        <Heart size={22} color={color.content.primary} />
        <ChatCircle size={22} color={color.content.primary} />
        <PaperPlaneTilt size={22} color={color.content.primary} />
      </View>

      <View style={styles.igCaption}>
        <Text variant="paragraphSm">
          <Text variant="buttonSubtle">{handle}</Text> {caption}
        </Text>
      </View>

      <View style={[styles.igCta, { backgroundColor: palette.instagram }]}>
        <Text variant="buttonSubtle" tone="onDark">{headline}</Text>
      </View>
    </View>
  );
}

export function FacebookPreview({ handle, photo, headline, caption }: Common) {
  return (
    <View style={styles.card}>
      <View style={styles.fbHeader}>
        <Image source={photo} style={styles.fbAvatar} />
        <View style={{ flex: 1 }}>
          <Text variant="buttonSubtle">{handle}</Text>
          <Text variant="caption" tone="input">Sponsored · Local business</Text>
        </View>
        <DotsThree size={20} color={color.content.primary} weight="bold" />
      </View>

      <View style={styles.fbCaption}>
        <Text variant="paragraphSm">{caption}</Text>
      </View>

      <Image source={photo} style={styles.fbPhoto} />

      <View style={styles.fbFooter}>
        <View style={{ flex: 1 }}>
          <Text variant="buttonSubtle">{headline}</Text>
          <Text variant="caption" tone="input">mormakiri.merlin</Text>
        </View>
        <View style={[styles.fbCta, { backgroundColor: palette.facebook }]}>
          <Text variant="caption" tone="onDark">Book now</Text>
        </View>
      </View>

      <View style={styles.fbReact}>
        <ThumbsUp size={16} color={palette.facebook} weight="fill" />
        <Text variant="caption" tone="input">You and 132 others</Text>
      </View>
    </View>
  );
}

const PHOTO = 188;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface.bg,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: color.border.hairline,
  },

  // Instagram
  igHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.lg },
  igAvatarRing: {
    width: 36, height: 36, borderRadius: radius.pill, padding: 2,
    borderWidth: 2, borderColor: palette.instagram, alignItems: "center", justifyContent: "center",
  },
  igAvatar: { width: 28, height: 28, borderRadius: radius.pill },
  igPhoto: { width: "100%", height: PHOTO },
  igActions: { flexDirection: "row", gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  igCaption: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  igCta: {
    margin: spacing.lg, marginTop: spacing.md, paddingVertical: spacing.md,
    borderRadius: radius.md, alignItems: "center",
  },

  // Facebook
  fbHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.lg },
  fbAvatar: { width: 36, height: 36, borderRadius: radius.pill },
  fbCaption: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  fbPhoto: { width: "100%", height: PHOTO },
  fbFooter: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    backgroundColor: color.surface.card, padding: spacing.lg,
  },
  fbCta: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.md },
  fbReact: { flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.lg, paddingTop: spacing.md },
});

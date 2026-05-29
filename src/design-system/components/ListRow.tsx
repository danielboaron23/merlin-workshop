import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Avatar from "./Avatar";
import Text from "./Text";

export type ListRowProps = {
  initials?: string;
  title: string;
  subtitle?: string;
  meta?: string; // e.g. a date
  unread?: boolean;
  onPress?: () => void;
};

/** A lead/inbox row — leading avatar, date, name, preview, unread dot. */
export default function ListRow({ initials, title, subtitle, meta, unread, onPress }: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && onPress ? styles.pressed : null]}
    >
      {unread ? <View style={styles.dot} /> : <View style={styles.dotSpacer} />}
      <Avatar initials={initials} size={50} />
      <View style={styles.body}>
        {meta ? (
          <Text variant="paragraphSm" tone="input">
            {meta}
          </Text>
        ) : null}
        <Text variant="h7">{title}</Text>
        {subtitle ? (
          <Text variant="paragraphSm" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: color.border.row,
  },
  pressed: { opacity: 0.6 },
  dot: { width: 7.5, height: 7.5, borderRadius: radius.pill, backgroundColor: color.accent.blue },
  dotSpacer: { width: 7.5 },
  body: { flex: 1, gap: 2 },
});

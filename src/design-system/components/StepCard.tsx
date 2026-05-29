import { ArrowRight, Check } from "phosphor-react-native";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { color, radius, spacing } from "../tokens";
import Text from "./Text";

export type StepCardProps = {
  icon: ReactNode;
  title: string;
  sub?: string;
  done?: boolean;
};

/**
 * "Next steps to grow" row — mirrors Figma Google campaign / Custom domain /
 * Publish site / Share link cards (Property 1 = to do / done).
 */
export default function StepCard({ icon, title, sub, done }: StepCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.body}>
        <Text variant="h7" style={done ? styles.done : undefined}>
          {title}
        </Text>
        {sub ? (
          <View style={styles.chip}>
            <Text variant="paragraphSm">{sub}</Text>
          </View>
        ) : null}
      </View>
      {done ? (
        <View style={styles.check}>
          <Check size={15} color="#fff" weight="bold" />
        </View>
      ) : (
        <View style={styles.arrow}>
          <ArrowRight size={14} color={color.content.primary} weight="bold" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    backgroundColor: color.surface.bg,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  icon: { width: 48, height: 48, borderRadius: radius.sm, backgroundColor: color.surface.card, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  body: { flex: 1, gap: 6 },
  done: { textDecorationLine: "line-through", opacity: 0.5 },
  chip: { alignSelf: "flex-start", backgroundColor: color.surface.secondary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  arrow: { width: 24, height: 24, borderRadius: 999, borderWidth: 1.5, borderColor: "#D8DDD6", alignItems: "center", justifyContent: "center" },
  check: { width: 24, height: 24, borderRadius: 999, backgroundColor: color.accent.green, alignItems: "center", justifyContent: "center" },
});

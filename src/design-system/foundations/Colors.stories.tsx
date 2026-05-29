import type { Meta, StoryObj } from "@storybook/react";
import { StyleSheet, View } from "react-native";
import Text from "../components/Text";
import { palette, color } from "../tokens";

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <View style={styles.swatch}>
      <View style={[styles.chip, { backgroundColor: value }]} />
      <Text variant="paragraphSm">{name}</Text>
      <Text variant="caption" tone="input">
        {value}
      </Text>
    </View>
  );
}

function Group({ title, entries }: { title: string; entries: [string, string][] }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text variant="h6" style={{ marginBottom: 12 }}>
        {title}
      </Text>
      <View style={styles.grid}>
        {entries.map(([n, v]) => (
          <Swatch key={n} name={n} value={v} />
        ))}
      </View>
    </View>
  );
}

const meta: Meta = { title: "Foundations/Colors" };
export default meta;

export const Palette: StoryObj = {
  render: () => (
    <View>
      <Group title="Surfaces" entries={Object.entries(color.surface)} />
      <Group title="Accents" entries={Object.entries(color.accent)} />
      <Group
        title="Brand palette"
        entries={Object.entries(palette).filter(([, v]) => typeof v === "string")}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  swatch: { width: 120, gap: 4 },
  chip: { width: 120, height: 64, borderRadius: 12, borderWidth: 1, borderColor: "#0000000d" },
});

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabs, { TabKey } from "./src/components/BottomTabs";
import CampaignsScreen from "./src/screens/CampaignsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LeadsScreen from "./src/screens/LeadsScreen";
import { colors, font } from "./src/theme";

function Placeholder({ title }: { title: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{title}</Text>
      <Text style={styles.placeholderSub}>Coming soon</Text>
    </View>
  );
}

/**
 * The phone shell. On native we use the real safe-area insets; on web there are
 * none, so we synthesize a matching status-bar / home-indicator gap and clamp the
 * width to 402 — so the browser preview and the simulator look the same.
 */
function Shell() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<TabKey>("home");
  const isWeb = Platform.OS === "web";

  const topPad = isWeb ? 12 : insets.top;
  const bottomPad = isWeb ? 8 : insets.bottom;

  return (
    <View style={styles.canvas}>
      <View style={[styles.phone, { paddingTop: topPad }]}>
        <View style={styles.content}>
          {tab === "home" && <HomeScreen />}
          {tab === "leads" && <LeadsScreen />}
          {tab === "campaigns" && <CampaignsScreen />}
          {tab === "analytics" && <Placeholder title="Analytics" />}
        </View>
        <BottomTabs active={tab} onChange={setTab} bottomInset={bottomPad} />
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.canvas, styles.center]}>
        <ActivityIndicator color={colors.btnPrimary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Shell />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: "#E9E9E4", alignItems: "center" },
  // Clamp to phone width so the web preview matches the simulator proportions.
  phone: { flex: 1, width: "100%", maxWidth: 402, backgroundColor: colors.bg },
  center: { justifyContent: "center" },
  content: { flex: 1 },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  placeholderText: { fontFamily: font.semibold, fontSize: 24, color: colors.ink },
  placeholderSub: { fontFamily: font.regular, fontSize: 16, color: colors.inputGrey },
});

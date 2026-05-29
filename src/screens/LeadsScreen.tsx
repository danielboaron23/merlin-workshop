import { FunnelSimple, MagnifyingGlass } from "phosphor-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppBar from "../components/AppBar";
import { colors, font, radius, space, type } from "../theme";

type Lead = {
  initials: string;
  name: string;
  date: string;
  message: string;
  unread?: boolean;
};

const LEADS: Lead[] = [
  { initials: "EC", name: "Emily Carter", date: "Sep 19", message: "Hi! I was wondering if you have any availability", unread: true },
  { initials: "JM", name: "Jessica Miller", date: "Sep 19", message: "Hey! I came across your page and love your work.", unread: true },
  { initials: "AT", name: "Ashley Thompson", date: "Sep 19", message: "Hi 😊 Are you accepting new clients right now?" },
  { initials: "OB", name: "Olivia Brooks", date: "Sep 19", message: "Can you send me pricing for a full set with design?" },
  { initials: "OB", name: "Olivia Brooks", date: "Sep 19", message: "Hi! I was wondering if you have any availability" },
  { initials: "OB", name: "Olivia Brooks", date: "Sep 19", message: "Hi! I was wondering if you have any availability" },
];

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <View style={styles.row}>
      {lead.unread ? <View style={styles.unreadDot} /> : <View style={styles.unreadSpacer} />}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{lead.initials}</Text>
      </View>
      <View style={styles.rowText}>
        <Text style={styles.date}>{lead.date}</Text>
        <Text style={styles.name}>{lead.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {lead.message}
        </Text>
      </View>
    </View>
  );
}

export default function LeadsScreen() {
  return (
    <>
      <AppBar title="My Leads" />

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <MagnifyingGlass size={24} color="#2C2C2C" weight="regular" />
          <Text style={styles.searchPlaceholder}>Search your leads</Text>
        </View>
        <View style={styles.filterButton}>
          <FunnelSimple size={24} color={colors.primary} weight="regular" />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {LEADS.map((lead, i) => (
          <LeadRow key={`${lead.name}-${i}`} lead={lead} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchRow: { flexDirection: "row", gap: space.md, paddingHorizontal: space.xl, paddingBottom: space.md },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    backgroundColor: colors.card,
    borderRadius: 30,
    paddingHorizontal: space.xl,
    height: 48,
  },
  searchPlaceholder: {
    fontFamily: font.regular,
    fontSize: type.paragraphMd.fontSize,
    color: "#2C2C2C",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: { flex: 1 },
  list: { paddingHorizontal: space.xl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.lg,
    paddingVertical: space.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.rowLine,
  },
  unreadDot: { width: 7.5, height: 7.5, borderRadius: 999, backgroundColor: colors.blueMid },
  unreadSpacer: { width: 7.5 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.leadAvatar,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: font.medium,
    fontSize: type.h7.fontSize,
    color: colors.primary,
  },
  rowText: { flex: 1, gap: 2 },
  date: {
    fontFamily: font.regular,
    fontSize: type.paragraphSm.fontSize,
    lineHeight: type.paragraphSm.lineHeight,
    color: colors.inputGrey,
  },
  name: {
    fontFamily: font.medium,
    fontSize: type.h7.fontSize,
    lineHeight: type.h7.lineHeight,
    color: colors.primary,
  },
  message: {
    fontFamily: font.regular,
    fontSize: type.paragraphSm.fontSize,
    lineHeight: type.paragraphSm.lineHeight,
    color: colors.primary,
  },
});

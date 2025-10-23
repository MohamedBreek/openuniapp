import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import HeaderMenu from "@/components/HeaderMenu";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import StudentCardModal from "@/components/StudentCardModal";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth";
// translations removed - app is Hebrew-only

export default function HomeScreen() {
  const { student } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);

  // translations removed; use Hebrew literals

  const tiles = [
    { id: "t1", title: "לוח שלי", href: "/system", icon: "calendar" },
    { id: "t2", title: "מבחנים", href: "/exams", icon: "doc.text" },
    { id: "t3", title: "ציונים", href: "/grades", icon: "checkmark.seal" },
    { id: "t4", title: "תמיכה", href: "/support", icon: "bubble.left" },
    { id: "t5", title: "הנחות", href: "/discount", icon: "bus" },
    { id: "t6", title: "כרטיס סטודנט", href: "/student-card", icon: "id.card" },
    { id: "t7", title: "דקאן", href: "/dean", icon: "hand.heart" },
    { id: "t8", title: "מחלקה", href: "/department", icon: "graduationcap" },
    { id: "t9", title: "עוד", href: "/more", icon: "ellipsis.circle" },
  ];

  const router = useRouter();

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.headerRowTop}>
          <Pressable
            style={styles.avatarSmall}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../assets//images/studentcard.png")}
              style={styles.avatarSmallImg}
            />
          </Pressable>
          <Image
            source={require("@/assets/images/openu.png")}
            style={styles.headerLogo}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <HeaderMenu />
          </View>
        </View>

        <View style={styles.greetingCard}>
          <Text style={styles.greetingText}>
            שלום רב, {student?.fullName ?? "סטודנט"}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: Colors.light.tint }]}>
          יישומים חשובים
        </Text>

        <FlatList
          data={tiles}
          keyExtractor={(t) => t.id}
          numColumns={3}
          columnWrapperStyle={styles.tileRow}
          renderItem={({ item }) => (
            <Pressable
              style={styles.tile}
              android_ripple={{ color: "rgba(0,0,0,0.06)" }}
              accessibilityRole="button"
              onPress={() => {
                try {
                  router.push(item.href as any);
                } catch {
                  /* ignore */
                }
              }}
            >
              <View
                style={[
                  styles.tileIconWrap,
                  { backgroundColor: Colors.light.tint },
                ]}
              >
                <IconSymbol name={item.icon} size={20} color="#fff" />
              </View>
              <Text style={[styles.tileText, { color: Colors.light.text }]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />

        <View style={styles.newsCard}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsSource}>חדשות האוניברסיטה</Text>
            <Text style={styles.newsTime}>11:30 ,25/09/24</Text>
          </View>
          <Text style={styles.newsTitle}>פתיחת סמסטר חדש</Text>
          <Text style={styles.newsBody} numberOfLines={4}>
            פתיחת סמסטר אוקטובר — הרשמה לקורסים נפתחה. יש להשלים תהליך רישום עד
            סוף החודש.
          </Text>
        </View>

        <StudentCardModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageUrl={student?.cardImageUrl}
          name={student?.fullName}
          id={student?.id}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  headerRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  avatarSmall: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  avatarSmallImg: { width: 44, height: 44 },
  headerLogo: { height: 44, width: 160 },
  menuButton: { padding: 8 },
  menuText: { fontSize: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginVertical: 8 },
  tileRow: { justifyContent: "space-between", marginBottom: 12 },
  tile: {
    flex: 1,
    margin: 6,
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 6,
    padding: 10,
  },
  tileIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E6EEF6",
    marginBottom: 8,
  },
  tileIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  tileText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 4,
  },
  newsCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6EEF6",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  newsBadge: {
    backgroundColor: "#6B3A40",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    color: "#fff",
    fontWeight: "800",
  },
  newsSource: { flex: 1, textAlign: "left", color: "#333", fontWeight: "700" },
  newsTime: { color: "#666", fontSize: 12 },
  newsTitle: { fontSize: 18, fontWeight: "700", marginTop: 6 },
  newsBody: { color: "#444", marginTop: 8, lineHeight: 20 },
  greetingCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E6EEF6",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
  },
});

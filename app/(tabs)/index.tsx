import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// removed unused components: CategoryFilters, CourseItem, HelloWave
import ParallaxScrollView from "@/components/parallax-scroll-view";
import StudentCardModal from "@/components/StudentCardModal";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth";

export default function HomeScreen() {
  const { student } = useAuth();
  // const { width } = useWindowDimensions(); // not used in this layout
  const [modalVisible, setModalVisible] = React.useState(false);

  // Tiles to show in a 3x3 grid similar to screenshot
  const tiles = [
    { id: "t1", title: "מערכת", href: "/system", icon: "calendar" },
    { id: "t2", title: "מבחנים", href: "/exams", icon: "doc.text" },
    {
      id: "t3",
      title: "ציונים",
      href: "/grades",
      icon: "checkmark.seal",
    },
    {
      id: "t4",
      title: "תמיכה",
      href: "/support",
      icon: "bubble.left",
    },
    { id: "t5", title: "הנחות", href: "/discount", icon: "bus" },
    {
      id: "t6",
      title: "כרטיס סטודנט",
      href: "/student-card",
      icon: "id.card",
    },
    { id: "t7", title: "דקאן", href: "/dean", icon: "hand.heart" },
    {
      id: "t8",
      title: "מחלקה",
      href: "/department",
      icon: "graduationcap",
    },
    {
      id: "t9",
      title: "עוד",
      href: "/more",
      icon: "ellipsis.circle",
    },
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
              source={{
                uri: student?.photoUrl || "https://placehold.co/64x64",
              }}
              style={styles.avatarSmallImg}
            />
          </Pressable>
          <Image
            source={require("@/assets/images/openu-logo.jpeg")}
            style={styles.headerLogo}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable style={styles.menuButton}>
              <Text style={styles.menuText}>☰</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>אפליקציות חשובות</Text>

        <FlatList
          data={tiles}
          keyExtractor={(t) => t.id}
          numColumns={3}
          columnWrapperStyle={styles.tileRow}
          renderItem={({ item }) => (
            <Pressable
              style={styles.tile}
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
            <Text style={styles.newsSource}>מקור החדשות</Text>
            <Text style={styles.newsTime}>11:30 ,25/09/24</Text>
          </View>
          <Text style={styles.newsTitle}>כותרת החדשות</Text>
          <Text style={styles.newsBody} numberOfLines={4}>
            גוף החדשות
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
    shadowColor: "#ffffffff",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  tileIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E6EEF6",
    marginBottom: 8,
  },
  tileIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  tileText: { textAlign: "center", fontWeight: "700" },
  newsCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#ffffffff",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  newsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
  newsTitle: { fontSize: 18, fontWeight: "800", marginTop: 6 },
  newsBody: { color: "#444", marginTop: 6, lineHeight: 20 },
});

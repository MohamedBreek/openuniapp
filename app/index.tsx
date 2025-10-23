import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  I18nManager,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import HeaderMenu from "@/components/HeaderMenu";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import StudentCardModal from "@/components/StudentCardModal";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth";
// translations removed - app is Hebrew-only

export default function HomeScreen() {
  const { student, courses, refreshCourses, refreshing } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    refreshCourses().catch(() => {
      /* ignore refresh errors in mock */
    });
  }, [refreshCourses]);

  // translations removed; use Hebrew literals

  const tiles = [
    { id: "t1", title: "לוח שלי", href: "/calendar", icon: "calendar" },
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
  const courseList = Array.isArray(courses) ? courses : [];
  const activeCourses = courseList.filter((c) => c.status !== "completed");
  const completedCourses = courseList.filter((c) => c.status === "completed");
  const nextCourse = activeCourses[0];
  const statusLabelMap: Record<string, string> = {
    active: "סטודנט פעיל",
    "on-leave": "בחופשה",
    graduated: "סיים לימודים",
    suspended: "השהיה",
  };
  const stats = [
    {
      id: "gpa",
      value: typeof student?.gpa === "number" ? student.gpa.toFixed(1) : "--",
      label: "ממוצע מצטבר",
      hint: "עודכן לאחרונה",
    },
    {
      id: "active",
      value: String(activeCourses.length),
      label: "קורסים פעילים",
      hint: "סמסטר נוכחי",
    },
    {
      id: "completed",
      value: String(completedCourses.length),
      label: "הושלמו",
      hint: statusLabelMap[student?.status ?? "active"] ?? "",
    },
  ];

  return (
    <ParallaxScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.light.tint}
          colors={[Colors.light.tint]}
        />
      }
    >
      <ThemedView style={styles.container} useGradient>
        <View style={styles.headerRowTop}>
          <Pressable
            style={styles.avatarSmall}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("@/assets/images/pass.png")}
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

        <LinearGradient
          colors={["#1565D8", "#1E90FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroGreeting}>
                שלום רב, {student?.fullName ?? "סטודנט"}
              </Text>
              <Text style={styles.heroSubtitle}>כך נראה היום האקדמי שלך</Text>
            </View>
          </View>
          {nextCourse ? (
            <View style={styles.heroInfoRow}>
              <IconSymbol name="calendar" size={18} color="#fff" />
              <View style={{ flex: 1 }}>
                <Text style={styles.heroInfoLabel}>השיעור הבא</Text>
                <Text style={styles.heroInfoValue}>{nextCourse.title}</Text>
              </View>
              <Text style={styles.heroInfoMeta}>{nextCourse.semester}</Text>
            </View>
          ) : null}
        </LinearGradient>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statHint}>{stat.hint}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: Colors.light.tint }]}>
          יישומים חשובים
        </Text>

        <FlatList
          data={tiles}
          keyExtractor={(t) => t.id}
          numColumns={3}
          contentContainerStyle={styles.tileListContent}
          columnWrapperStyle={[
            styles.tileRow,
            I18nManager.isRTL && styles.tileRowRtl,
          ]}
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
  heroCard: {
    borderRadius: 18,
    padding: 18,
    marginTop: 4,
    shadowColor: "#1565D8",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  heroGreeting: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  heroSubtitle: { color: "rgba(255,255,255,0.85)" },
  heroButton: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  heroButtonText: { color: "#fff", fontWeight: "700" },
  heroInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 12,
    borderRadius: 14,
  },
  heroInfoLabel: { color: "rgba(255,255,255,0.75)", fontSize: 12 },
  heroInfoValue: { color: "#fff", fontWeight: "700", marginTop: 4 },
  heroInfoMeta: { color: "rgba(255,255,255,0.75)", fontSize: 12 },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: "800", color: Colors.light.tint },
  statLabel: { marginTop: 6, fontWeight: "700", color: "#1F2937" },
  statHint: { marginTop: 2, color: "#6B7280", fontSize: 12 },
  tileListContent: { paddingBottom: 4 },
  tileRow: { justifyContent: "space-between", marginBottom: 12 },
  tileRowRtl: { flexDirection: "row-reverse" },
  tile: {
    flex: 1,
    margin: 6,
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.07)",
    shadowColor: "#1565D8",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
    padding: 10,
  },
  tileIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E6EEF6",
    marginBottom: 3,
  },
  tileIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  tileText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 0,
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
    marginBottom: 4,
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
  greetingText: { fontSize: 20, fontWeight: "800", color: Colors.light.text },
});

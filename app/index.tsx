import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  I18nManager,
  Linking,
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

const TILE_DATA = [
  { id: "t1", title: "לוח שלי", href: "/calendar", icon: "calendar" },
  { id: "t2", title: "מבחנים", href: "/exams", icon: "doc.text" },
  { id: "t3", title: "ציונים", href: "/grades", icon: "checkmark.seal" },
  { id: "t4", title: "ת.סט", href: "/student-card", icon: "id.card" },
  { id: "t5", title: "הודעות", href: "/messages", icon: "envelope" },
  { id: "t6", title: "תמיכה", href: "/support", icon: "bubble.left" },
  { id: "t7", title: "הנחות", href: "/discount", icon: "bus" },
  { id: "t8", title: "דקאן", href: "/dean", icon: "hand.heart" },
  { id: "t9", title: "עוד", href: "/more", icon: "ellipsis.circle" },
] as const;

const STATUS_LABELS: Record<string, string> = {
  active: "סטודנט פעיל",
  "on-leave": "בחופשה",
  graduated: "סיים לימודים",
  suspended: "השהיה",
};

type Tile = (typeof TILE_DATA)[number];

export default function HomeScreen() {
  const { student, courses, refreshCourses, refreshing } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const router = useRouter();

  const handleRefresh = React.useCallback(() => {
    refreshCourses().catch(() => {
      /* ignore refresh errors in mock */
    });
  }, [refreshCourses]);

  const tiles = React.useMemo(() => TILE_DATA, []);
  const tileRows = React.useMemo(() => {
    const rows: Tile[][] = [];
    for (let i = 0; i < tiles.length; i += 3) {
      rows.push(tiles.slice(i, i + 3));
    }
    return rows;
  }, [tiles]);
  const courseList = React.useMemo(
    () => (Array.isArray(courses) ? courses : []),
    [courses]
  );
  const activeCourses = React.useMemo(
    () => courseList.filter((c) => c.status !== "הושלם"),
    [courseList]
  );
  const completedCourses = React.useMemo(
    () => courseList.filter((c) => c.status === "הושלם"),
    [courseList]
  );
  const nextCourse = activeCourses[0];

  const stats = React.useMemo(
    () => [
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
        hint: STATUS_LABELS[student?.status ?? "active"] ?? "",
      },
    ],
    [
      activeCourses.length,
      completedCourses.length,
      student?.gpa,
      student?.status,
    ]
  );

  const handleTilePress = React.useCallback(
    (href: string) => {
      try {
        router.push(href as any);
      } catch {
        /* ignore navigation errors */
      }
    },
    [router]
  );

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

        <View style={styles.tileListContent}>
          {tileRows.map((row, rowIndex) => (
            <View
              key={`tile-row-${rowIndex}`}
              style={[styles.tileRow, I18nManager.isRTL && styles.tileRowRtl]}
            >
              {row.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.tile}
                  android_ripple={{ color: "rgba(0,0,0,0.06)" }}
                  accessibilityRole="button"
                  onPress={() => handleTilePress(item.href)}
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
              ))}
            </View>
          ))}
        </View>

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
        <View style={{ height: 12 }} />

        {/* Events preview section */}
        <Text style={[styles.sectionTitle, { color: Colors.light.tint }]}>
          אירועים
        </Text>
        <View style={styles.eventsRow}>
          <Pressable
            style={styles.eventCard}
            onPress={() => {
              Linking.openURL(
                "https://www.openu.ac.il/events/mlbd19112025.aspx"
              ).catch(() => {});
            }}
            accessibilityRole="link"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1532619675605-9f3b6f2f4b2d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6c927a7a5d4f8d5d8a3f7b9b1c1f9b3a",
              }}
              style={styles.eventImage}
            />
            <View style={styles.eventBody}>
              <Text numberOfLines={2} style={styles.eventTitle}>
                מפגש מידע על תואר שני בלמידת מכונה
              </Text>
              <View style={styles.eventMetaRow}>
                <Text style={styles.eventMetaText}>Zoom</Text>
                <Text style={styles.eventMetaText}>19.00</Text>
              </View>
            </View>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDateMonth}>נוב</Text>
              <Text style={styles.eventDateDay}>19</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.eventCard}
            onPress={() => {
              Linking.openURL(
                "https://www.openu.ac.il/events/mba02112025.aspx"
              ).catch(() => {});
            }}
            accessibilityRole="link"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2c6f2b6defb3f7e5f6a8c9d6b4a8c8d2",
              }}
              style={styles.eventImage}
            />
            <View style={styles.eventBody}>
              <Text numberOfLines={2} style={styles.eventTitle}>
                מפגש מידע לתואר שני במנהל עסקים
              </Text>
              <View style={styles.eventMetaRow}>
                <Text style={styles.eventMetaText}>Zoom</Text>
                <Text style={styles.eventMetaText}>20.00</Text>
              </View>
            </View>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDateMonth}>נוב</Text>
              <Text style={styles.eventDateDay}>2</Text>
            </View>
          </Pressable>
        </View>
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
  headerLogo: { height: 44, width: 250 },
  menuButton: { padding: 8 },
  menuText: { fontSize: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 8,
    textAlign: "right",
    writingDirection: "rtl",
  },
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
    flexDirection: "row-reverse",
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
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroButton: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  heroButtonText: { color: "#fff", fontWeight: "700" },
  heroInfoRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 12,
    borderRadius: 14,
  },
  heroInfoLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroInfoValue: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 4,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroInfoMeta: { color: "rgba(255,255,255,0.75)", fontSize: 12 },
  statsRow: {
    flexDirection: "row-reverse",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.tint,
    textAlign: "right",
    writingDirection: "rtl",
  },
  statLabel: {
    marginTop: 6,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "right",
    writingDirection: "rtl",
  },
  statHint: {
    marginTop: 2,
    color: "#6B7280",
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  tileListContent: { paddingBottom: 4 },
  tileRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 12,
  },
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
    fontSize: 12,
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
    flexDirection: "row-reverse",
    textAlign: "right",
    writingDirection: "rtl",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  newsSource: { flex: 1, textAlign: "right", color: "#333", fontWeight: "700" },
  newsTime: { color: "#666", fontSize: 12 },
  newsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "right",
    writingDirection: "rtl",
  },
  newsBody: {
    color: "#444",
    marginTop: 8,
    lineHeight: 20,
    textAlign: "right",
    writingDirection: "rtl",
  },
  greetingText: { fontSize: 20, fontWeight: "800", color: Colors.light.text },
  /* Events preview styles */
  eventsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  eventCard: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.06)",
  },
  eventImage: { width: "100%", height: 88, resizeMode: "cover" },
  eventBody: { padding: 10 },
  eventTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    fontSize: 13,
    textAlign: "right",
    writingDirection: "rtl",
  },
  eventMetaRow: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  eventMetaText: { color: Colors.light.icon, fontSize: 12, marginLeft: 6 },
  eventDateBadge: {
    position: "absolute",
    left: 10,
    top: 8,
    backgroundColor: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  eventDateMonth: { fontSize: 11, color: Colors.light.tint, fontWeight: "700" },
  eventDateDay: { fontSize: 16, color: Colors.light.tint, fontWeight: "800" },
});

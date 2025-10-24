import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CourseDetail() {
  const { courses } = useAuth();
  const { id: queryParam } = useLocalSearchParams<{ id?: string }>();
  const route: any = useRoute();
  const navigation = useNavigation();

  const courseId = useMemo(() => {
    if (Array.isArray(queryParam)) return queryParam[0];
    if (typeof queryParam === "string" && queryParam.length) return queryParam;

    const paramId = route?.params?.id;
    if (typeof paramId === "string" && paramId.length) return paramId;

    if (typeof route?.name === "string") {
      const segments = route.name.split("/");
      return segments[segments.length - 1];
    }

    return undefined;
  }, [queryParam, route]);

  const course = useMemo(
    () => courses.find((c) => c.id === courseId),
    [courses, courseId]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: course?.title ?? "Course",
    });
  }, [navigation, course?.title]);

  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor(
    { light: "#000000ff", dark: "#000000ff" },
    "text"
  );
  const mutedColor = useThemeColor(
    { light: "#000000ff", dark: "#000000ff" },
    "text"
  );

  const statusMeta = useMemo(() => {
    if (!course) {
      return { label: "", bg: "rgba(3, 3, 3, 0.2)", color: "#131111ff" };
    }
    const map: Record<string, { label: string; bg: string; color: string }> = {
      completed: {
        label: "הושלם",
        bg: "rgba(19, 207, 102, 0.25)",
        color: "#0E9F53",
      },
      הושלם: {
        label: "הושלם",
        bg: "rgba(19, 207, 102, 0.25)",
        color: "#0E9F53",
      },
      enrolled: {
        label: "בתהליך",
        bg: "rgba(29, 25, 25, 0.18)",
        color: "#fff",
      },
      רשום: {
        label: "בתהליך",
        bg: "rgba(29, 25, 25, 0.18)",
        color: "#fff",
      },
      dropped: {
        label: "בוטל",
        bg: "rgba(217, 70, 70, 0.18)",
        color: "#C0392B",
      },
      בוטל: {
        label: "בוטל",
        bg: "rgba(217, 70, 70, 0.18)",
        color: "#C0392B",
      },
    };
    const statusKey = course.status ?? "רשום";
    const normalizedKey =
      typeof statusKey === "string"
        ? statusKey.trim().toLowerCase()
        : statusKey;
    return (
      map[statusKey] ??
      (typeof normalizedKey === "string" ? map[normalizedKey] : undefined) ??
      map["רשום"]
    );
  }, [course]);

  const progress = useMemo(() => {
    if (!course) return 0;
    if (course.status === "הושלם") return 1;
    if (course.grade) {
      const numeric = Number(course.grade);
      if (!Number.isNaN(numeric)) {
        return Math.min(Math.max(numeric / 100, 0.25), 0.92);
      }
    }
    return 0.45;
  }, [course]);

  const progressPercent = Math.round(progress * 100);

  const courseDetails = useMemo(() => {
    if (!course) return [];
    return [
      { label: "נ'ז", value: String(course.credits) },
      { label: "סמסטר", value: course.semester },
      { label: "סטטוס", value: course.status ?? "לא זמין" },
      { label: "ציון", value: course.grade ?? "ממתין" },
    ];
  }, [course]);

  const handleOpenMaterials = useCallback(() => {
    Alert.alert("Materials", "Open course materials (placeholder)");
  }, []);

  const upcomingItems = useMemo(
    () =>
      course
        ? [
            {
              id: "session",
              icon: "clock.fill",
              title: "מפגש תרגול חי",
              subtitle: "יום שני · 28/10 · 18:00",
              action: () =>
                Alert.alert("מפגש מתוזמן", "נתאם את ההתחברות לזום בקרוב"),
            },
            {
              id: "assignment",
              icon: "doc.text",
              title: "מטלת בית 2",
              subtitle: "הגשה עד 31/10 · משקל 15%",
              action: () => Alert.alert("מטלה", "פתח מטלה 2 במערכת המטלות"),
            },
          ]
        : [],
    [course]
  );

  const resourceItems = useMemo(
    () =>
      course
        ? [
            {
              id: "syllabus",
              icon: "book.fill",
              title: "סילבוס מעודכן",
              subtitle: "כל מה שמצפה במהלך הסמסטר",
              action: () => Alert.alert("סילבוס", "פתיחת קובץ ה-PDF בקרוב"),
            },
            {
              id: "forum",
              icon: "person.2.fill",
              title: "פורום סטודנטים",
              subtitle: "שאלות ותשובות של הקורס",
              action: () => Alert.alert("פורום", "מעבירים אותך לפורום"),
            },
            {
              id: "recordings",
              icon: "square.and.arrow.down",
              title: "הקלטות אחרונות",
              subtitle: "צפייה בשיעורי השבוע האחרון",
              action: () => Alert.alert("הקלטות", "פותח את רשימת ההקלטות"),
            },
          ]
        : [],
    [course]
  );

  if (!course) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Course not found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex} useGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient
          colors={[tintColor, "#629cffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroCode}>{course.code}</Text>
          <Text style={styles.heroTitle}>{course.title}</Text>
          <View style={styles.heroMetaRow}>
            <View
              style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}
            >
              <Text style={[styles.statusText, { color: statusMeta.color }]}>
                {statusMeta.label}
              </Text>
            </View>
            <View style={styles.heroStat}>
              <IconSymbol name="chart.bar" color="#000000ff" size={18} />
              <Text style={styles.heroStatText}>
                ציון {course.grade ?? "--"}
              </Text>
            </View>
            <View style={styles.heroStat}>
              <IconSymbol name="book.fill" color="#000000ff" size={18} />
              <Text style={styles.heroStatText}>{`${course.credits} נ"ז`}</Text>
            </View>
          </View>
          <View style={styles.progressBlock}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressTitle}>התקדמות הקורס</Text>
              <Text style={styles.progressValue}>{progressPercent}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.max(progress * 100, 6)}%` },
                ]}
              />
            </View>
            <Text style={styles.progressHint}>
              {course.status === "הושלם"
                ? "הקורס הושלם בהצלחה"
                : "המשיכו לעמוד במשימות הקרובות להשלמת הקורס"}
            </Text>
          </View>
        </LinearGradient>

        <Card>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            מידע כללי
          </Text>
          {courseDetails.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.metaRow,
                index === courseDetails.length - 1 && styles.metaRowLast,
              ]}
            >
              <Text style={[styles.metaLabel, { color: mutedColor }]}>
                {item.label}
              </Text>
              <Text style={[styles.metaValue, { color: textColor }]}>
                {item.value}
              </Text>
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            style={[styles.primaryButton, { backgroundColor: tintColor }]}
            onPress={handleOpenMaterials}
          >
            <IconSymbol
              name="square.and.arrow.down"
              color="#000000ff"
              size={18}
            />
            <Text style={styles.primaryButtonText}>פתיחת חומרי הקורס</Text>
          </Pressable>
        </Card>

        {upcomingItems.length ? (
          <Card>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              מה צפוי בקרוב
            </Text>
            {upcomingItems.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={item.action}
                style={[
                  styles.listItem,
                  index === upcomingItems.length - 1 && styles.listItemLast,
                ]}
              >
                <View style={styles.listIconWrap}>
                  <IconSymbol
                    name={item.icon}
                    color={Colors.light.tint}
                    size={18}
                  />
                </View>
                <View style={styles.listBody}>
                  <Text style={[styles.listTitle, { color: textColor }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.listSubtitle, { color: mutedColor }]}>
                    {item.subtitle}
                  </Text>
                </View>
                <IconSymbol name="chevron.left" color={mutedColor} size={18} />
              </Pressable>
            ))}
          </Card>
        ) : null}

        {resourceItems.length ? (
          <Card>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              משאבים חשובים
            </Text>
            {resourceItems.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={item.action}
                style={[
                  styles.listItem,
                  index === resourceItems.length - 1 && styles.listItemLast,
                ]}
              >
                <View style={styles.listIconWrapAlt}>
                  <IconSymbol name={item.icon} color="#fff" size={18} />
                </View>
                <View style={styles.listBody}>
                  <Text style={[styles.listTitle, { color: textColor }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.listSubtitle, { color: mutedColor }]}>
                    {item.subtitle}
                  </Text>
                </View>
                <IconSymbol name="chevron.left" color={mutedColor} size={18} />
              </Pressable>
            ))}
          </Card>
        ) : null}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  emptyContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: { fontSize: 20, fontWeight: "700" },
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.light.tint,
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 12,
  },
  heroCode: {
    color: "rgba(0, 0, 0, 0.75)",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    color: "#000000ff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: "auto",
  },
  statusText: { fontWeight: "700", fontSize: 12 },
  heroStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heroStatText: {
    color: "#181717ff",
    fontWeight: "700",
  },
  progressBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: 14,
  },
  progressLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressTitle: { color: "rgba(0, 0, 0, 0.92)", fontWeight: "700" },
  progressValue: { color: "#050505ff", fontWeight: "800" },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  progressHint: {
    color: "rgba(0, 0, 0, 0.75)",
    marginTop: 8,
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  metaRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.08)",
  },
  metaRowLast: { borderBottomWidth: 0 },
  metaLabel: {
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: "right",
    writingDirection: "rtl",
    flexShrink: 0,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    writingDirection: "ltr",
    flexShrink: 0,
  },
  primaryButton: {
    marginTop: 18,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: { color: "#000000ff", fontWeight: "800", fontSize: 16 },
  listItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.08)",
    gap: 12,
  },
  listItemLast: { borderBottomWidth: 0 },
  listIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(21,101,216,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  listIconWrapAlt: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  listBody: { flex: 1 },
  listTitle: { fontWeight: "700", textAlign: "right", writingDirection: "rtl" },
  listSubtitle: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "right",
    writingDirection: "rtl",
  },
});

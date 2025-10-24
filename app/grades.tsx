import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { FlashList } from "@/components/ui/FlashList";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { Course } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GradesScreen() {
  const { courses } = useAuth();
  const router = useRouter();

  const courseList = React.useMemo<Course[]>(() => {
    if (Array.isArray(courses)) return courses;
    return [];
  }, [courses]);

  const handleCoursePress = React.useCallback(
    (courseId: string) => {
      try {
        router.push(`/courses/${courseId}` as any);
      } catch {
        /* ignore navigation errors */
      }
    },
    [router]
  );

  const renderCourse = React.useCallback(
    ({ item }: { item: Course }) => (
      <Card onPress={() => handleCoursePress(item.id)}>
        <View style={styles.cardInner}>
          <View style={styles.cardLeft}>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.titleSmall}>{item.title}</Text>
            <Text style={styles.semester}>{item.semester}</Text>
          </View>
          <View style={styles.cardRight}>
            <View
              style={[
                styles.gradeBadge,
                { backgroundColor: Colors.light.tint },
              ]}
            >
              <Text style={styles.gradeText}>{item.grade ?? "-"}</Text>
            </View>
          </View>
        </View>
      </Card>
    ),
    [handleCoursePress]
  );

  return (
    <ThemedView style={styles.container} useGradient>
      <Text style={[styles.title, { color: Colors.light.tint }]}>ציונים</Text>

      <FlashList<Course>
        data={courseList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>לא נמצאו קורסים להצגה</Text>
          </View>
        )}
        renderItem={renderCourse}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: { flex: 1 },
  cardRight: { width: 64, alignItems: "center" },
  code: { fontWeight: "800", color: "#222" },
  titleSmall: { color: "#444", marginTop: 6 },
  semester: { color: "#000000ff", marginTop: 6, fontSize: 12 },
  gradeBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  gradeText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  emptyState: { padding: 24, alignItems: "center" },
  emptyText: { color: "#000000ff" },
});

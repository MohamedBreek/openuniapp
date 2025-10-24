import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo } from "react";
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

  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor(
    { light: "#5F6D7A", dark: "#9BA1A6" },
    "text"
  );

  const courseDetails = useMemo(() => {
    if (!course) return [];
    return [
      { label: "Credits", value: String(course.credits) },
      { label: "Semester", value: course.semester },
      { label: "Status", value: course.status ?? "Not available" },
      { label: "Grade", value: course.grade ?? "Pending" },
    ];
  }, [course]);

  const handleOpenMaterials = useCallback(() => {
    Alert.alert("Materials", "Open course materials (placeholder)");
  }, []);

  if (!course) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Course not found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: tintColor }]}>{course.title}</Text>
        <Text style={[styles.subtitle, { color: mutedColor }]}>
          {course.code} · {course.semester}
        </Text>

        <Card style={styles.card}>
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
        </Card>

        <Pressable
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: tintColor }]}
          onPress={handleOpenMaterials}
        >
          <Text style={styles.buttonText}>Open materials</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  card: { marginBottom: 24 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(21,101,216,0.08)",
  },
  metaRowLast: { borderBottomWidth: 0 },
  metaLabel: { fontSize: 14, letterSpacing: 0.3 },
  metaValue: { fontSize: 16, fontWeight: "600" },
  button: { padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});

import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function CourseDetail() {
  const { courses } = useAuth();
  // expo-router provides useLocalSearchParams but for safety we'll read route params
  // useRoute typed as any to read params
  const route: any = useRoute();
  const id = route.params?.id || route.name?.split("/").pop();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Course not found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.title, { color: Colors.light.tint }]}>
        {course.title}
      </Text>
      <Text style={styles.meta}>Code: {course.code}</Text>
      <Text style={styles.meta}>Credits: {course.credits}</Text>
      <Text style={styles.meta}>Semester: {course.semester}</Text>
      <Text style={styles.meta}>Status: {course.status}</Text>
      <Text style={styles.meta}>Grade: {course.grade ?? "-"}</Text>

      <View style={{ height: 18 }} />
      <Pressable
        style={[styles.button, { backgroundColor: Colors.light.tint }]}
        onPress={() =>
          Alert.alert("Materials", "Open course materials (placeholder)")
        }
      >
        <Text style={styles.buttonText}>Open materials</Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  meta: { color: "#444", marginBottom: 6 },
  button: { padding: 12, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "800" },
});

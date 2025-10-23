import { Course } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function GradeBadge({ grade }: { grade?: string }) {
  if (!grade) return null;
  const bg = grade.startsWith("A")
    ? "#2ECC71"
    : grade.startsWith("B")
    ? "#F1C40F"
    : "#E67E22";
  return (
    <View style={[badgeStyles.badge, { backgroundColor: bg }]}>
      <Text style={badgeStyles.text}>{grade}</Text>
    </View>
  );
}

export default function CourseItem({ course }: { course: Course }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.code}>{course.code}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.semester}>
          {course.semester} • {course.credits}cr
        </Text>
      </View>
      <View style={styles.right}>
        <GradeBadge grade={course.grade} />
        <View
          style={[
            styles.statusPill,
            course.status === "enrolled" ? styles.enrolled : styles.completed,
          ]}
        >
          <Text style={styles.statusText}>{course.status}</Text>
        </View>
      </View>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  text: { color: "#fff", fontWeight: "700" },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  left: { flex: 1, paddingRight: 8 },
  right: { alignItems: "flex-end" },
  code: { fontWeight: "700", marginBottom: 4 },
  title: { color: "#444", marginBottom: 6 },
  semester: { color: "#888" },
  statusPill: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  enrolled: { backgroundColor: "#EAF6FF" },
  completed: { backgroundColor: "#F2F7F2" },
  statusText: { color: "#333", fontWeight: "700", fontSize: 12 },
});

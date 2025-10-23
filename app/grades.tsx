import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function GradesScreen() {
  // translations removed; Hebrew-only
  const { courses } = useAuth();
  const router = useRouter();

  return (
    <ThemedView style={styles.container} useGradient>
      <Text style={[styles.title, { color: Colors.light.tint }]}>ציונים</Text>

      <FlatList
        data={courses}
        keyExtractor={(c) => c.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>לא נמצאו קורסים להצגה</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Card
            onPress={() => {
              try {
                router.push(`/courses/${item.id}` as any);
              } catch {}
            }}
          >
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
        )}
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
  semester: { color: "#777", marginTop: 6, fontSize: 12 },
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
  emptyText: { color: "#666" },
});

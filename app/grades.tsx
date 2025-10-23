import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function GradesScreen() {
  const { t } = useTranslation();
  const { courses } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.title, { color: Colors.light.tint }]}>
        {t("tiles.grades")}
      </Text>
      <FlatList
        data={courses}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.titleSmall}>{item.title}</Text>
            <Text style={styles.grade}>{item.grade ?? "-"}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  row: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  code: { fontWeight: "800" },
  titleSmall: { flex: 1, marginLeft: 12, color: "#444" },
  grade: { fontWeight: "800" },
});

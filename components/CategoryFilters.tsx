import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function CategoryFilters({
  selected,
  onSelect,
  items,
}: {
  selected?: string;
  onSelect: (s?: string) => void;
  items?: string[];
}) {
  const defaultItems = ["All", "A", "B", "C", "Enrolled", "Completed"];
  const list = items ?? defaultItems;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {list.map((it) => {
        const active = selected === it;
        return (
          <Pressable
            key={it}
            style={[styles.chip, active && styles.active]}
            onPress={() => onSelect(active ? undefined : it)}
          >
            <Text style={[styles.text, active && styles.textActive]}>{it}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginBottom: 12 },
  row: { flexDirection: "row", gap: 8, paddingLeft: 4 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F0F6FB",
    borderRadius: 16,
    marginRight: 8,
  },
  active: { backgroundColor: "#007AFF" },
  text: { color: "#333" },
  textActive: { color: "#fff" },
});

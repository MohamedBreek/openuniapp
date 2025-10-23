import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";

type Message = {
  id: string;
  sender: string;
  preview: string;
  time: string;
  unread?: boolean;
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "Dr. Cohen",
    preview: "Reminder: assignment 2 due next week.",
    time: "09:12",
    unread: true,
  },
  {
    id: "m2",
    sender: "Registrar",
    preview: "Your registration was successful.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "m3",
    sender: "Course TA",
    preview: "Office hours moved to Thursday.",
    time: "Mon",
    unread: false,
  },
];

function MessageItem({ item }: { item: Message }) {
  return (
    <Pressable style={styles.messageItem}>
      <View style={styles.messageLeft}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {item.sender
              .split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2)}
          </Text>
        </View>
      </View>
      <View style={styles.messageBody}>
        <View style={styles.messageHeader}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>
      {item.unread ? <View style={styles.unreadDot} /> : null}
    </Pressable>
  );
}

export default function MessagesScreen() {
  const [query, setQuery] = React.useState("");
  const { width } = useWindowDimensions();
  const filtered = React.useMemo(() => {
    if (!query) return MOCK_MESSAGES;
    return MOCK_MESSAGES.filter(
      (m) =>
        m.sender.toLowerCase().includes(query.toLowerCase()) ||
        m.preview.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.pageBackground}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Messages / הודעות</ThemedText>
        </ThemedView>

        <View
          style={[
            styles.searchRow,
            { paddingHorizontal: Math.max(12, (width - 360) / 2) },
          ]}
        >
          <TextInput
            placeholder="Search messages / חיפוש"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <ThemedText>No messages / אין הודעות</ThemedText>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <MessageItem item={item} />}
            contentContainerStyle={{ gap: 10, paddingBottom: 80 }}
          />
        )}

        <Pressable
          style={[
            styles.composeButton,
            { right: Math.max(18, (width - 360) / 6) },
          ]}
        >
          <IconSymbol size={20} name="square.and.pencil" color="#fff" />
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: { position: "absolute", right: -10, bottom: -60, opacity: 0.9 },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchRow: { marginVertical: 12 },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  messageLeft: { marginRight: 12 },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E6EEF6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "700" },
  messageBody: { flex: 1 },
  messageHeader: { flexDirection: "row", justifyContent: "space-between" },
  sender: { fontWeight: "700" },
  time: { color: "#666" },
  preview: { color: "#666", marginTop: 4 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  empty: { padding: 24, alignItems: "center" },
  composeButton: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  pageBackground: { backgroundColor: "#F4F8FB", padding: 12, flex: 1 },
});
// Duplicate template block removed

import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Message = {
  id: string;
  text: string;
  time: string;
  me?: boolean;
};

function nowLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ThreadScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const threadId = params.id ?? "unknown";

  const [messages, setMessages] = React.useState<Message[]>(() => [
    { id: "1", text: "היי, איך אפשר לעזור?", time: "09:02" },
    {
      id: "2",
      text: "שלום! יש לי שאלה לגבי מועד ההגשה.",
      time: "09:10",
      me: true,
    },
  ]);

  const [text, setText] = React.useState("");

  const send = React.useCallback(() => {
    if (!text.trim()) return;
    const m: Message = {
      id: String(Date.now()),
      text: text.trim(),
      time: nowLabel(),
      me: true,
    };
    setMessages((prev) => [...prev, m]);
    setText("");
  }, [text]);

  const renderItem = React.useCallback(({ item }: { item: Message }) => {
    const isMe = !!item.me;
    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.messageRowMe : styles.messageRowOther,
        ]}
      >
        <View
          style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}
        >
          <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: `שיחה (${threadId})` }} />
      <ThemedView style={styles.container} useGradient>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol
                name="chevron.right"
                size={20}
                color={Colors.light.text}
              />
            </Pressable>
            <Text style={[styles.headerTitle, { color: Colors.light.text }]}>
              שיחה
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <FlatList
            data={messages}
            keyExtractor={(m) => m.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            inverted={false}
          />

          <View style={styles.composerWrap}>
            <TextInput
              placeholder="הקש הודעה..."
              placeholderTextColor={Colors.light.icon}
              value={text}
              onChangeText={setText}
              style={[styles.input, { color: Colors.light.text }]}
              returnKeyType="send"
              onSubmitEditing={send}
            />
            <Pressable
              onPress={send}
              style={styles.sendButton}
              accessibilityRole="button"
            >
              <IconSymbol name="paperplane" size={18} color="#fff" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 16, fontWeight: "800", textAlign: "center" },
  listContent: { paddingVertical: 8, paddingHorizontal: 4 },
  messageRow: { marginVertical: 6, flexDirection: "row-reverse" },
  messageRowMe: { justifyContent: "flex-end" },
  messageRowOther: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "78%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  bubbleMe: { backgroundColor: Colors.light.tint, borderBottomRightRadius: 4 },
  bubbleOther: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.06)",
  },
  messageText: { color: "#111", fontSize: 14 },
  messageTextMe: { color: "#fff" },
  messageTime: {
    marginTop: 6,
    fontSize: 11,
    color: Colors.light.icon,
    textAlign: "right",
  },
  messageTimeMe: { color: "rgba(255,255,255,0.9)" },
  composerWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Thread = {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

const SAMPLE: Thread[] = [
  {
    id: "m1",
    title: "מזכירות - מחלקה",
    lastMessage: "יש עדכון על מועד ההגשה",
    time: "09:12",
    unread: 1,
  },
  {
    id: "m2",
    title: "מר אלון לוי",
    lastMessage: "שכחתי להעלות את החומר, אעשה זאת היום",
    time: "08:03",
  },
  {
    id: "m3",
    title: "דיוור אוניברסיטה",
    lastMessage: "המסלול להשתלמות נפתח להרשמה",
    time: "אתמול",
    unread: 2,
  },
  {
    id: "m4",
    title: "סטודנטים - קבוצת קורס",
    lastMessage: "מי רוצה להצטרף למפגש למידה מחר?",
    time: "אתמול",
  },
  {
    id: "m5",
    title: "מרצה - ד" + "ר יעל כהן",
    lastMessage: "הקבצים שהעליתם זמינים עכשיו במערכת",
    time: "23/10",
    unread: 3,
  },
  {
    id: "m6",
    title: "שירות הסטודנטים",
    lastMessage: "המענה התקבל ותיקון הבעיה בוצע",
    time: "16/10",
  },
  {
    id: "m7",
    title: "אירועים אוניברסיטאיים",
    lastMessage: "הרשמה לכנס הבין-תחומי נפתחה — מקומות מוגבלים, הירשמו עכשיו.",
    time: "לפני שעה",
  },
  {
    id: "m8",
    title: "קהילה: יזמים",
    lastMessage: "פוסט חדש: הצגת רעיון ודיון על מימון",
    time: "אתמול",
  },
  {
    id: "m9",
    title: "הודעות מערכת",
    lastMessage:
      "עדכון מערכת מתוזמן בסוף השבוע — צפויים שינויים זמניים בגישה לשירותים",
    time: "3 ימים",
  },
  {
    id: "m10",
    title: "חברים",
    lastMessage: "היי! רוצה להיפגש לקפה אחרי השיעור?",
    time: "היום",
    unread: 5,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const [threads, setThreads] = React.useState<Thread[]>(SAMPLE);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // simulate network refresh; in real app call API
    setTimeout(() => {
      // simple simulation: rotate messages order
      setThreads((prev) => {
        if (!prev.length) return prev;
        const next = [...prev];
        next.unshift(next.pop() as Thread);
        return next;
      });
      setRefreshing(false);
    }, 700);
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: Thread }) => {
      return (
        <Pressable
          style={styles.threadRow}
          onPress={() =>
            router.push({
              pathname: "/messages/[id]",
              params: { id: item.id },
            } as any)
          }
          accessibilityRole="button"
          accessibilityLabel={`${item.title}, הודעה אחרונה: ${item.lastMessage}`}
          accessibilityHint="פתח שיחה"
          android_ripple={{ color: "rgba(0,0,0,0.04)" }}
          hitSlop={8}
        >
          <View style={styles.threadMeta}>
            <Text style={styles.threadTime}>{item.time}</Text>
            {item.unread ? (
              <View style={styles.unreadPill}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            ) : (
              <IconSymbol name="chevron.left" size={16} color="#CBD5E1" />
            )}
          </View>
          <View style={styles.threadBody}>
            <Text style={styles.threadTitle}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.threadPreview}>
              {item.lastMessage}
            </Text>
          </View>
          <View style={styles.threadLeft}>
            <View style={styles.avatarPlaceholder}>
              <IconSymbol
                name="bubble.left"
                size={18}
                color={Colors.light.tint}
              />
            </View>
          </View>
        </Pressable>
      );
    },
    [router]
  );

  return (
    <>
      <Stack.Screen options={{ title: "הודעות" }} />
      <ThemedView style={styles.container} useGradient>
        <Card>
          <Text style={[styles.header, { color: Colors.light.text }]}>
            תיבת ההודעות
          </Text>

          {threads.length === 0 ? (
            <View style={{ paddingVertical: 36 }}>
              <Text style={{ textAlign: "center", color: Colors.light.icon }}>
                אין הודעות להצגה
              </Text>
            </View>
          ) : (
            <FlatList
              data={threads}
              keyExtractor={(i) => i.id}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
              contentContainerStyle={{ paddingVertical: 6 }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        </Card>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "right",
    writingDirection: "rtl",
    paddingHorizontal: 4,
  },
  threadRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  threadLeft: { width: 48, alignItems: "center" },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(21,101,216,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  threadBody: { flex: 1, paddingHorizontal: 8, paddingVertical: 4 },
  threadTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    fontSize: 15,
    textAlign: "right",
    writingDirection: "rtl",
  },
  threadPreview: {
    color: Colors.light.icon,
    marginTop: 4,
    fontSize: 13,
    opacity: 0.95,
    textAlign: "right",
    writingDirection: "rtl",
  },
  threadMeta: { width: 72, alignItems: "flex-start", paddingRight: 8 },
  threadTime: {
    color: Colors.light.icon,
    fontSize: 12,
    marginBottom: 6,
    textAlign: "left",
  },
  unreadPill: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    minWidth: 28,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  unreadText: { color: "#fff", fontWeight: "700" },
  sep: { height: 1, backgroundColor: "rgba(21,101,216,0.06)" },
});

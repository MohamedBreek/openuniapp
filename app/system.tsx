import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SystemScreen() {
  const schedule = [
    {
      id: "1",
      time: "08:30",
      duration: "90 דק׳",
      course: "אלגוריתמים מתקדמים",
      lecturer: 'ד"ר יעל כהן',
      location: "בניין 3 · חדר 204",
      type: "מפגש חי",
    },
    {
      id: "2",
      time: "11:00",
      duration: "75 דק׳",
      course: "יסודות בינה מלאכותית",
      lecturer: "מר אלון לוי",
      location: "למידה היברידית · זום",
      type: "שיעור מקוון",
    },
    {
      id: "3",
      time: "13:15",
      duration: "60 דק׳",
      course: "מעבדה במדעי המחשב",
      lecturer: "גב׳ תמר שלו",
      location: "בניין 6 · מעבדה 2",
      type: "מעבדה",
    },
  ];

  const tasks = [
    {
      id: "t1",
      title: "הגשת תרגיל 2 - אלגוריתמים",
      due: "24/10/25",
      detail: "העלה קובץ PDF עד 23:59 במודל",
    },
    {
      id: "t2",
      title: "צפייה בהקלטת שיעור AI",
      due: "היום",
      detail: "חומר למבחן אמצע סמסטר",
    },
  ];

  const reminders = [
    {
      id: "r1",
      label: "מפגש ייעוץ",
      value: "יום ד׳ · 17:00",
      note: 'פגישה עם המתרגל לד"ר יעל כהן',
    },
    {
      id: "r2",
      label: "מסגרת לימודים",
      value: "3 מפגשים שנותרו השבוע",
      note: "זכרו לעדכן דיווחי נוכחות",
    },
  ];

  const nextSlot = schedule[0];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="מערכת השיעורים"
          subtitle="היום שלך מרוכז במקום אחד"
          description="עקבו אחר מפגשי הלימוד, המשימות והאירועים החשובים של השבוע."
        >
          {nextSlot ? (
            <View style={styles.heroMetaRow}>
              <View style={styles.heroMetaBadge}>
                <IconSymbol name="calendar" size={16} color="#fff" />
                <Text style={styles.heroMetaText}>
                  השיעור הבא · {nextSlot.time}
                </Text>
              </View>
              <Text style={styles.heroMetaCourse}>{nextSlot.course}</Text>
            </View>
          ) : null}
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>מערכת להיום</Text>
          {schedule.map((slot) => (
            <View key={slot.id} style={styles.slotRow}>
              <View style={styles.slotTimeColumn}>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <Text style={styles.slotDuration}>{slot.duration}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.slotCourse}>{slot.course}</Text>
                <Text style={styles.slotMeta}>{slot.lecturer}</Text>
                <Text style={styles.slotMeta}>{slot.location}</Text>
              </View>
              <View style={styles.slotTypePill}>
                <Text style={styles.slotTypeText}>{slot.type}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>משימות קרובות</Text>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <View style={styles.taskBullet}>
                <IconSymbol
                  name="checkmark.seal"
                  size={16}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDetail}>{task.detail}</Text>
              </View>
              <Text style={styles.taskDue}>{task.due}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>תזכורות</Text>
          {reminders.map((item) => (
            <View key={item.id} style={styles.reminderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.reminderLabel}>{item.label}</Text>
                <Text style={styles.reminderNote}>{item.note}</Text>
              </View>
              <Text style={styles.reminderValue}>{item.value}</Text>
            </View>
          ))}
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  heroMetaRow: { marginTop: 14, gap: 8 },
  heroMetaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroMetaText: { color: "#fff", fontWeight: "600" },
  heroMetaCourse: { color: "rgba(255,255,255,0.85)", fontWeight: "700" },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  slotTimeColumn: { width: 68 },
  slotTime: { fontWeight: "800", color: Colors.light.tint },
  slotDuration: { color: "#6B7280", fontSize: 12, marginTop: 4 },
  slotCourse: { fontWeight: "700", color: Colors.light.text },
  slotMeta: { color: "#6B7280", marginTop: 4 },
  slotTypePill: {
    backgroundColor: "rgba(21,101,216,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  slotTypeText: { color: Colors.light.tint, fontWeight: "700", fontSize: 12 },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  taskBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  taskTitle: { fontWeight: "700", color: Colors.light.text },
  taskDetail: { color: "#4B5563", marginTop: 4, fontSize: 12 },
  taskDue: { color: Colors.light.tint, fontWeight: "700", fontSize: 12 },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  reminderLabel: { fontWeight: "700", color: Colors.light.text },
  reminderNote: { color: "#4B5563", marginTop: 4 },
  reminderValue: { color: Colors.light.tint, fontWeight: "700" },
});

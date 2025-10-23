import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExamsScreen() {
  const upcomingExams = [
    {
      id: "e1",
      course: "אלגוריתמים מתקדמים",
      date: "02/11/25",
      time: "09:00",
      location: "בניין 4 · אולם 201",
      status: "הרשמה פתוחה",
    },
    {
      id: "e2",
      course: "יסודות בינה מלאכותית",
      date: "08/11/25",
      time: "13:30",
      location: "למידה מרחוק · זום",
      status: "מקוון",
    },
    {
      id: "e3",
      course: "סטטיסטיקה להנדסה",
      date: "15/11/25",
      time: "16:00",
      location: "בניין 2 · אולם 105",
      status: "הרשמה עתידית",
    },
  ];

  const prepTips = [
    {
      id: "p1",
      title: "סימולציה מלאה",
      detail: "הורידו מבחנים משנים קודמות ותרגלו תחת תנאי זמן.",
    },
    {
      id: "p2",
      title: "מרכז תמיכה",
      detail: "קבעו מפגש חזרה עם המתרגל או הצטרפו לחונכות קבוצתית.",
    },
    {
      id: "p3",
      title: "איזון והפסקות",
      detail: "זכרו להקדיש זמן למנוחה ולתכנון יומי מסודר.",
    },
  ];

  const resources = [
    {
      id: "r1",
      title: "הרשמה למועדי ב׳",
      info: "עד 48 שעות לפני המועד המקורי",
    },
    {
      id: "r2",
      title: "הנחיות נגישות",
      info: "שלחו בקשה למרכז התמיכה לפחות שבוע מראש",
    },
    {
      id: "r3",
      title: "ציוד מותר",
      info: "כרטיס סטודנט, תעודה מזהה, מחשבון פשוט",
    },
  ];

  const nextExam = upcomingExams[0];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="מבחנים"
          subtitle="תכנון חכם מוביל להצלחה"
          description="עקבו אחר המועדים, ההרשמות והכלים שיעזרו לכם להגיע מוכנים לכל בחינה."
        >
          {nextExam ? (
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroBadge}>
                <IconSymbol name="doc.text" size={16} color="#fff" />
                <Text style={styles.heroBadgeText}>
                  המבחן הקרוב · {nextExam.date} · {nextExam.time}
                </Text>
              </View>
              <Text style={styles.heroExamCourse}>{nextExam.course}</Text>
            </View>
          ) : null}
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>מועדי בחינות</Text>
          {upcomingExams.map((exam) => (
            <View key={exam.id} style={styles.examRow}>
              <View style={styles.examTimeBox}>
                <Text style={styles.examDate}>{exam.date}</Text>
                <Text style={styles.examHour}>{exam.time}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.examCourse}>{exam.course}</Text>
                <Text style={styles.examLocation}>{exam.location}</Text>
              </View>
              <View style={styles.examStatusPill}>
                <Text style={styles.examStatusText}>{exam.status}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>הכנה חכמה</Text>
          {prepTips.map((tip) => (
            <View key={tip.id} style={styles.tipRow}>
              <View style={styles.tipIcon}>
                <IconSymbol name="star" size={16} color={Colors.light.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDetail}>{tip.detail}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>נהלים ומשאבים</Text>
          {resources.map((item) => (
            <View key={item.id} style={styles.resourceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.resourceTitle}>{item.title}</Text>
                <Text style={styles.resourceInfo}>{item.info}</Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={18}
                color={Colors.light.tint}
              />
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
  heroBadgeRow: { marginTop: 16, gap: 8 },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeText: { color: "#fff", fontWeight: "600" },
  heroExamCourse: { color: "rgba(255,255,255,0.85)", fontWeight: "700" },
  examRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  examTimeBox: {
    width: 88,
    borderRadius: 12,
    backgroundColor: "rgba(21,101,216,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  examDate: { fontWeight: "800", color: Colors.light.tint },
  examHour: { color: "#1F2937", marginTop: 4, fontSize: 12 },
  examCourse: { fontWeight: "700", color: Colors.light.text },
  examLocation: { color: "#4B5563", marginTop: 4 },
  examStatusPill: {
    backgroundColor: "rgba(21,101,216,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  examStatusText: { color: Colors.light.tint, fontWeight: "700", fontSize: 12 },
  tipRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  tipTitle: { fontWeight: "700", color: Colors.light.text },
  tipDetail: { color: "#4B5563", marginTop: 4, lineHeight: 18 },
  resourceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  resourceTitle: { fontWeight: "700", color: Colors.light.text },
  resourceInfo: { color: "#4B5563", marginTop: 4, fontSize: 12 },
});

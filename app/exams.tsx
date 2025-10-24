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

  const prepHighlights = [
    {
      id: "p1",
      title: "סימולציה מלאה",
      detail: "הורידו מבחנים משנים קודמות ותרגלו בתנאי זמן אמיתיים.",
    },
    {
      id: "p2",
      title: "ליווי צמוד",
      detail: "קבעו מפגש עם המתרגל, הצטרפו לחונכות קבוצתית או צ'אט מומחה.",
    },
    {
      id: "p3",
      title: "איזון ומנוחה",
      detail: "שלבו תכנון יומי, פעילות גופנית קצרה והפסקות איכותיות.",
    },
  ];

  const prepTimeline = [
    {
      id: "t1",
      label: "שלושה שבועות לפני",
      actions: "ארגנו לוז משימות, עברו על הסילבוס וסמנו נושאים חלשים.",
    },
    {
      id: "t2",
      label: "שבועיים לפני",
      actions: "פתרו שני מבחנים מלאים, העלו שאלות בפורום הקורס.",
    },
    {
      id: "t3",
      label: "ימים ספורים לפני",
      actions: "עברו על תקצירי חומרים, הכינו ציוד ובדקו את המיקום המדויק.",
    },
  ];

  const supportServices = [
    {
      id: "s1",
      title: "הרשמה למועדי ב׳",
      info: "פתוח עד 48 שעות לפני המועד המקורי, בתנאי עמידה בקריטריונים.",
      icon: "calendar",
    },
    {
      id: "s2",
      title: "התאמות נגישות",
      info: "שלחו בקשה למרכז התמיכה לפחות שבוע מראש בצירוף מסמכים.",
      icon: "hand.heart",
    },
    {
      id: "s3",
      title: "ציוד מותר",
      info: "כרטיס סטודנט, תעודה מזהה, מחשבון פשוט ועט שחור/כחול.",
      icon: "doc.richtext",
    },
  ];

  const policyReminders = [
    {
      id: "pr1",
      title: "הגעה בזמן",
      detail: "הכניסה מתחילה 30 דקות לפני, והדלתות נסגרות עם תחילת הבחינה.",
    },
    {
      id: "pr2",
      title: "התנהלות בבחינה",
      detail: "יש לשמור על שקט מלא ולפנות משגיחים בכל שאלה או תקלה.",
    },
    {
      id: "pr3",
      title: "ציוד אישי",
      detail: "טלפונים ומכשירים חכמים נשמרים כבויים בתיק לאורך כל הבחינה.",
    },
  ];

  const nextExam = upcomingExams[0];

  const statusPalette: Record<string, { background: string; text: string }> = {
    "הרשמה פתוחה": {
      background: "rgba(21,101,216,0.12)",
      text: Colors.light.tint,
    },
    מקוון: { background: "rgba(16,185,129,0.15)", text: "#047857" },
    "הרשמה עתידית": { background: "rgba(249,115,22,0.12)", text: "#C2410C" },
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="מבחנים"
          subtitle="תכנון חכם מוביל להצלחה"
          description="עקבו אחר המועדים, ההרשמות והכלים שיעזרו לכם להגיע מוכנים לכל בחינה."
          align="right"
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
          {upcomingExams.map((exam) => {
            const palette = statusPalette[exam.status] ?? {
              background: "rgba(21,101,216,0.12)",
              text: Colors.light.tint,
            };

            return (
              <View key={exam.id} style={styles.examRow}>
                <View style={styles.examTimeBox}>
                  <Text style={styles.examDate}>{exam.date}</Text>
                  <Text style={styles.examHour}>{exam.time}</Text>
                </View>
                <View style={styles.examDetailsWrapper}>
                  <View style={styles.examStatusPillWrap}>
                    <View
                      style={[
                        styles.examStatusPill,
                        { backgroundColor: palette.background },
                      ]}
                    >
                      <Text
                        style={[styles.examStatusText, { color: palette.text }]}
                      >
                        {exam.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.examDetails}>
                    <Text style={styles.examCourse}>{exam.course}</Text>
                    <Text style={styles.examLocation}>{exam.location}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>אסטרטגיית הכנה</Text>
          {prepHighlights.map((tip) => (
            <View key={tip.id} style={styles.tipRow}>
              <View style={styles.tipIcon}>
                <IconSymbol
                  name="sparkles"
                  size={16}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDetail}>{tip.detail}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>לוח זמנים מומלץ</Text>
          {prepTimeline.map((milestone, index) => (
            <View key={milestone.id} style={styles.timelineRow}>
              <View style={styles.timelineBadge}>
                <Text style={styles.timelineBadgeText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.timelineLabel}>{milestone.label}</Text>
                <Text style={styles.timelineActions}>{milestone.actions}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>שירותים חיוניים</Text>
          {supportServices.map((service) => (
            <View key={service.id} style={styles.serviceRow}>
              <View style={styles.serviceIcon}>
                <IconSymbol
                  name={service.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceInfo}>{service.info}</Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={18}
                color={Colors.light.tint}
              />
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>נהלים שחשוב לזכור</Text>
          {policyReminders.map((item) => (
            <View key={item.id} style={styles.policyRow}>
              <Text style={styles.policyTitle}>{item.title}</Text>
              <Text style={styles.policyDetail}>{item.detail}</Text>
            </View>
          ))}
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroBadgeRow: { marginTop: 16, gap: 10 },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroExamCourse: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  examRow: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  examDetailsWrapper: {
    flex: 1,
    alignItems: "flex-end",
    gap: 8,
  },
  examStatusPillWrap: { alignItems: "flex-end", width: "100%" },
  examDetails: {
    flex: 1,
    alignItems: "flex-end",
    gap: 6,
    minWidth: 0,
    width: "100%",
  },
  examCourse: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
    flexShrink: 1,
    alignSelf: "stretch",
  },
  examLocation: {
    color: "#4B5563",
    marginTop: 4,
    textAlign: "right",
    writingDirection: "rtl",
    flexShrink: 1,
    alignSelf: "stretch",
  },
  examStatusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-end",
  },
  examStatusText: { fontWeight: "700", fontSize: 12 },
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
  tipTitle: { fontWeight: "700", color: Colors.light.text, textAlign: "right" },
  tipDetail: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
  },
  timelineRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
  },
  timelineBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  timelineBadgeText: { color: Colors.light.tint, fontWeight: "700" },
  timelineLabel: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
  },
  timelineActions: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  serviceTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
  },
  serviceInfo: {
    color: "#4B5563",
    marginTop: 4,
    fontSize: 12,
    textAlign: "right",
  },
  policyRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    gap: 6,
  },
  policyTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  policyDetail: {
    color: "#4B5563",
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
});

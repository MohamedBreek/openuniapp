import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DepartmentScreen() {
  const leadership = [
    {
      id: "l1",
      name: 'ד"ר ענת שפירא',
      role: "ראש המחלקה",
      focus: "חדשנות פדגוגית ותכנון תוכניות לימוד",
    },
    {
      id: "l2",
      name: "פרופ' גיל נחמיאס",
      role: "מנהל אקדמי",
      focus: "חוויית סטודנטים והבטחת איכות ההוראה",
    },
    {
      id: "l3",
      name: "גב' ליאן דנון",
      role: "אחראית קהילות בוגרים",
      focus: "חיבורים בין תעשייה לסטודנטים",
    },
  ];

  const specializationTracks = [
    {
      id: "t1",
      title: "מערכות מידע",
      description: "שילוב טכנולוגיה ועסקים עם התמחות בניתוח נתונים.",
      icon: "bolt.fill",
    },
    {
      id: "t2",
      title: "חינוך דיגיטלי",
      description: "התאמת שיטות הוראה לעולם היברידי וחווייתי.",
      icon: "book.fill",
    },
    {
      id: "t3",
      title: "חברה ורווחה",
      description: "מנהיגות חברתית, קידום שוויון ותכנון קהילתי.",
      icon: "person.2.fill",
    },
  ];

  const resources = [
    {
      id: "r1",
      label: "זום שבועי עם ראש המחלקה",
      detail: "כל ראשון 18:00, עדכונים ושאלות פתוחות.",
      icon: "camera.fill",
    },
    {
      id: "r2",
      label: "מאגר תרגולים מוקלטים",
      detail: "גישה לכל הקורסים בעברית ובאנגלית.",
      icon: "link",
    },
    {
      id: "r3",
      label: "קהילת Slack לסטודנטים",
      detail: "עבודה בקבוצות, תמיכה הדדית ופרויקטים משותפים.",
      icon: "bubble.left",
    },
  ];

  const metrics = [
    { id: "m1", value: "1,260", label: "סטודנטים פעילים" },
    { id: "m2", value: "96%", label: "שביעות רצון מתמיכה" },
    { id: "m3", value: "42", label: "שיתופי פעולה עם התעשייה" },
  ];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="המחלקה"
          subtitle="קהילה אקדמית מתקדמת"
          description="הכירו את צוות ההנהלה, מסלולי ההתמחות והמשאבים שמזניקים את הסטודנטים קדימה."
          align="right"
        >
          <View style={styles.heroMetaRow}>
            {metrics.map((metric) => (
              <View key={metric.id} style={styles.metricPill}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
          </View>
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>צוות מוביל</Text>
          {leadership.map((member) => (
            <View key={member.id} style={styles.leadershipRow}>
              <View style={styles.leadershipIcon}>
                <IconSymbol
                  name="graduationcap"
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{member.name}</Text>
                <Text style={styles.itemMeta}>{member.role}</Text>
                <Text style={styles.itemDetail}>{member.focus}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>מסלולי התמחות</Text>
          {specializationTracks.map((track) => (
            <View key={track.id} style={styles.trackRow}>
              <View style={styles.iconPill}>
                <IconSymbol
                  name={track.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{track.title}</Text>
                <Text style={styles.itemDetail}>{track.description}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>משאבים מחוזקים</Text>
          {resources.map((resource) => (
            <View key={resource.id} style={styles.resourceRow}>
              <View style={styles.iconPill}>
                <IconSymbol
                  name={resource.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{resource.label}</Text>
                <Text style={styles.itemDetail}>{resource.detail}</Text>
              </View>
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
  heroMetaRow: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-end",
  },
  metricPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    minWidth: 120,
    alignItems: "center",
  },
  metricValue: { color: "#fff", fontWeight: "800", fontSize: 18 },
  metricLabel: { color: "rgba(255,255,255,0.78)", fontSize: 12, marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  leadershipRow: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-start",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    textAlign: "right",
    writingDirection: "rtl",
  },
  leadershipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  itemTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  itemMeta: {
    color: Colors.light.tint,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "right",
    writingDirection: "rtl",
  },
  itemDetail: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
  trackRow: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  resourceRow: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
});

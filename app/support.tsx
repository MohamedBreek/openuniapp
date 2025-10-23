import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SupportScreen() {
  const channels = [
    {
      id: "c1",
      title: "מרכז תמיכה טלפוני",
      detail: "*3500 · ראשון עד חמישי · 08:00-20:00",
      icon: "phone",
    },
    {
      id: "c2",
      title: "צ׳אט חי עם נציג",
      detail: "מענה מהיר בתקופת מבחנים ובשעות הערב",
      icon: "bubble.left",
    },
    {
      id: "c3",
      title: "דואר אלקטרוני",
      detail: "support@openu.ac.il · מענה עד 24 שעות",
      icon: "paperplane.fill",
    },
  ];

  const quickActions = [
    {
      id: "q1",
      label: "פתיחת קריאה חדשה",
      description: "תיעוד פנייה, צירוף צילומי מסך וקבצים.",
    },
    {
      id: "q2",
      label: "בדיקת סטאטוס פניות",
      description: "הישארו מעודכנים בהתקדמות הקריאות שלכם.",
    },
    {
      id: "q3",
      label: "קביעת פגישה מרחוק",
      description: "תיאום עם יועץ אקדמי או תמיכה טכנית.",
    },
  ];

  const faqs = [
    {
      id: "f1",
      question: "שכחתי סיסמה - איך נכנסים?",
      answer: "בצעו איפוס דרך דף ההזדהות או פנו למוקד 24/7.",
    },
    {
      id: "f2",
      question: "איך מגישים בקשה להארכת מועד?",
      answer: "ממלאים טופס מקוון, מצרפים מסמכים ושולחים דרך התמיכה.",
    },
    {
      id: "f3",
      question: "מה עושים בתקלה במערכת הלמידה?",
      answer: "בודקים הודעות שוטפות ואם התקלה נמשכת – פותחים קריאה.",
    },
  ];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="תמיכה ושרות"
          subtitle="כאן בשבילכם בכל שעה"
          description="קבלו מענה מיידי, עקבו אחר פניות ונצלו את כל ערוצי השירות של האוניברסיטה."
        >
          <View style={styles.heroMeta}>
            <IconSymbol name="checkmark.seal" size={16} color="#fff" />
            <Text style={styles.heroMetaText}>זמן המתנה ממוצע: 2 דקות</Text>
          </View>
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>ערוצי תקשורת</Text>
          {channels.map((channel) => (
            <View key={channel.id} style={styles.channelRow}>
              <View style={styles.channelIcon}>
                <IconSymbol
                  name={channel.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.channelTitle}>{channel.title}</Text>
                <Text style={styles.channelDetail}>{channel.detail}</Text>
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
          <Text style={styles.sectionTitle}>פעולות מהירות</Text>
          {quickActions.map((action) => (
            <View key={action.id} style={styles.actionRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionDescription}>
                  {action.description}
                </Text>
              </View>
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>פתחו</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>שאלות נפוצות</Text>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqRow}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
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
  heroMeta: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroMetaText: { color: "#fff", fontWeight: "600" },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  channelTitle: { fontWeight: "700", color: Colors.light.text },
  channelDetail: { color: "#4B5563", marginTop: 4, fontSize: 12 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  actionLabel: { fontWeight: "700", color: Colors.light.text },
  actionDescription: { color: "#4B5563", marginTop: 4, fontSize: 12 },
  actionBadge: {
    backgroundColor: "rgba(21,101,216,0.12)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  actionBadgeText: { color: Colors.light.tint, fontWeight: "700" },
  faqRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    gap: 6,
  },
  faqQuestion: { fontWeight: "700", color: Colors.light.text },
  faqAnswer: { color: "#4B5563", lineHeight: 18 },
});

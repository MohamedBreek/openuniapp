import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DiscountScreen() {
  const benefits = [
    {
      id: "b1",
      title: "תחבורה ציבורית",
      detail: "חופשי-חודשי סטודנט ב-50% הנחה ברכבת ובאוטובוסים.",
    },
    {
      id: "b2",
      title: "תרבות ופנאי",
      detail: "עד 30% הנחה בהצגות, קולנוע ופסטיבלים.",
    },
    {
      id: "b3",
      title: "ציוד לימודי",
      detail: "הטבות ברכישת מחשבים, תוכנות ודפוס.",
    },
  ];

  const partners = [
    {
      id: "p1",
      name: "מטרופולין",
      perk: "כרטיסיה חצי שנתית במחיר סטודנט",
    },
    {
      id: "p2",
      name: "סינמטק תל אביב",
      perk: "חברות שנתית בהנחה של 35%",
    },
    {
      id: "p3",
      name: "KSP Campus",
      perk: "קופון 15% לרכישת מחשבים ניידים",
    },
  ];

  const steps = [
    {
      id: "s1",
      title: "בדיקת זכאות",
      description: "ודאו שפרטי ההרשמה מעודכנים וסטטוס הסטודנט פעיל.",
    },
    {
      id: "s2",
      title: "הצגת הכרטיס",
      description: "הציגו את הכרטיס הדיגיטלי או PDF מודפס בקופה.",
    },
    {
      id: "s3",
      title: "מימוש ההטבה",
      description: "קבלו את ההנחה במקום – חלק מההטבות מוגבלות למימוש אחד.",
    },
  ];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="הטבות והנחות"
          subtitle="כי לימודים מגיעים עם יתרונות"
          description="גלו את כל ההטבות לסטודנטים בתחבורה, תרבות, טכנולוגיה ועוד."
          align="right"
        >
          <View style={styles.heroRow}>
            <View style={styles.heroPill}>
              <IconSymbol name="bus" size={16} color="#fff" />
              <Text style={styles.heroText}>חצי מחיר ברב-קו</Text>
            </View>
            <View style={styles.heroPill}>
              <IconSymbol name="sparkles" size={16} color="#fff" />
              <Text style={styles.heroText}>תרבות במחיר סטודנט</Text>
            </View>
          </View>
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>תחומי הטבה מובילים</Text>
          {benefits.map((benefit) => (
            <View key={benefit.id} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <IconSymbol name="star" size={16} color={Colors.light.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDetail}>{benefit.detail}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>שיתופי פעולה</Text>
          {partners.map((partner) => (
            <View key={partner.id} style={styles.partnerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <Text style={styles.partnerPerk}>{partner.perk}</Text>
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
          <Text style={styles.sectionTitle}>איך מממשים?</Text>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 18 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  heroPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heroText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
    writingDirection: "rtl",
  },
  benefitRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  benefitTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  benefitDetail: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  partnerName: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  partnerPerk: {
    color: "#4B5563",
    marginTop: 4,
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  stepBadgeText: {
    color: Colors.light.tint,
    fontWeight: "700",
    textAlign: "center",
  },
  stepTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  stepDescription: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
});

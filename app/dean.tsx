import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DeanScreen() {
  const services = [
    {
      id: "s1",
      title: "ליווי אישי",
      detail: "ייעוץ אקדמי, סיוע רגשי ותמיכה במצבי לחץ במהלך הלימודים.",
      icon: "hand.heart",
    },
    {
      id: "s2",
      title: "קרן סיוע",
      detail: "מלגות, הלוואות קצרות טווח וסלי מזון לסטודנטים במצוקה.",
      icon: "doc.richtext",
    },
    {
      id: "s3",
      title: "פעילות חברתית",
      detail: "אירועים קהילתיים, התנדבות ומועדוני סטודנטים.",
      icon: "sparkles",
    },
  ];

  const officeHours = [
    { id: "o1", day: "ראשון", time: "09:00-16:00", channel: "בבניין הראשי" },
    { id: "o2", day: "שלישי", time: "12:00-18:00", channel: "פגישות זום" },
    { id: "o3", day: "חמישי", time: "09:00-13:00", channel: "מוקד טלפוני" },
  ];

  const contacts = [
    {
      id: "c1",
      label: "מוקד דיקנט",
      value: "*6789",
      icon: "phone.fill",
    },
    {
      id: "c2",
      label: 'דוא"ל',
      value: "dean@openu.ac.il",
      icon: "envelope",
    },
    {
      id: "c3",
      label: "מיקום",
      value: "בניין הסטודנטים, קומה 2",
      icon: "location.fill",
    },
  ];

  const initiatives = [
    {
      id: "i1",
      name: "תכנית מנטורים",
      description: "סטודנטים ותיקים מלווים את החדשים בתחילת הדרך האקדמית.",
    },
    {
      id: "i2",
      name: "סדנאות רווחה",
      description: "ניהול זמן, איזון לימודים-עבודה וכלים לחוסן אישי.",
    },
    {
      id: "i3",
      name: "מרכז פניות אנונימי",
      description: "דיווח על קשיים אישיים או מקרים רגישים בטופס מאובטח.",
    },
  ];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="דיקנט הסטודנטים"
          subtitle="גב חם לאורך כל המסע"
          description="ליווי אישי, סיוע כלכלי ומענה מהיר לכל המצבים שסטודנטים פוגשים במהלך הלימודים."
        >
          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaPill}>
              <IconSymbol name="hand.heart" size={16} color="#fff" />
              <Text style={styles.heroMetaText}>מענה מלא 360°</Text>
            </View>
            <View style={styles.heroMetaPill}>
              <IconSymbol name="clock.fill" size={16} color="#fff" />
              <Text style={styles.heroMetaText}>עדכון תוך 24 שעות</Text>
            </View>
          </View>
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>שירותים מרכזיים</Text>
          {services.map((service) => (
            <View key={service.id} style={styles.rowWithIcon}>
              <View style={styles.iconPill}>
                <IconSymbol
                  name={service.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{service.title}</Text>
                <Text style={styles.itemDetail}>{service.detail}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>שעות קבלה</Text>
          {officeHours.map((slot) => (
            <View key={slot.id} style={styles.scheduleRow}>
              <Text style={styles.scheduleDay}>{slot.day}</Text>
              <Text style={styles.scheduleTime}>{slot.time}</Text>
              <Text style={styles.scheduleChannel}>{slot.channel}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>יוזמות ותמיכות</Text>
          {initiatives.map((item) => (
            <View key={item.id} style={styles.initiativeRow}>
              <Text style={styles.initiativeName}>{item.name}</Text>
              <Text style={styles.initiativeDescription}>
                {item.description}
              </Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>יצירת קשר</Text>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactRow}>
              <View style={styles.iconPill}>
                <IconSymbol
                  name={contact.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{contact.label}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
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
  heroMetaRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  heroMetaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heroMetaText: { color: "#fff", fontWeight: "600" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  rowWithIcon: {
    flexDirection: "row",
    gap: 14,
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
  itemTitle: { fontWeight: "700", color: Colors.light.text },
  itemDetail: { color: "#4B5563", marginTop: 4, lineHeight: 18 },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  scheduleDay: { fontWeight: "700", color: Colors.light.text, width: 70 },
  scheduleTime: { color: "#1F2937", fontWeight: "600" },
  scheduleChannel: { color: "#4B5563", fontSize: 12 },
  initiativeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    gap: 6,
  },
  initiativeName: { fontWeight: "700", color: Colors.light.text },
  initiativeDescription: { color: "#4B5563", lineHeight: 18 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  contactValue: { color: Colors.light.tint, fontWeight: "700", marginTop: 4 },
});

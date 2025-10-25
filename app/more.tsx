import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  const quickLinks = [
    {
      id: "l1",
      title: "מערכת שעות",
      detail: "עדכון שינויים בזמן אמת לכל הקורסים",
      icon: "calendar",
    },
    {
      id: "l2",
      title: "ספרייה דיגיטלית",
      detail: "גישה ל-30,000 ספרים ומאמרים אקדמיים",
      icon: "book.fill",
      url: "https://www.openu.ac.il/library/pages/default.aspx",
    },
    {
      id: "l3",
      title: "מרכז קריירה",
      detail: "סדנאות, מפגשים עם חברות וגיוס דרך האוניברסיטה",
      icon: "briefcase",
    },
  ];

  const communities = [
    {
      id: "c1",
      label: "קהילת יזמות",
      description: "מיזמי סטארט-אפ, גישה למנטורים ומשקיעים.",
    },
    {
      id: "c2",
      label: "מעגל נשים בהייטק",
      description: "מפגשי השראה ושיתופי פעולה עם בוגרות מובילות.",
    },
    {
      id: "c3",
      label: "פורום סטודנטים בינלאומי",
      description: "למידה בשפות, החלפת תרבויות ומיזמים גלובליים.",
    },
  ];

  const usefulTools = [
    {
      id: "u1",
      title: "מעקב משימות",
      detail: "סנכרון עם Google Calendar והתראות חכמות",
      icon: "checkmark.circle",
    },
    {
      id: "u2",
      title: "מדד הצלחה אקדמי",
      detail: "ניתוח אוטומטי של ציונים והמלצות לשיפור",
      icon: "chart.bar",
    },
    {
      id: "u3",
      title: "מרכז השמה",
      detail: "משרות בהתאמה אישית וליווי כתיבת קורות חיים",
      icon: "person.crop.circle.badge.checkmark",
    },
  ];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="עוד משאבים"
          subtitle="להוציא מהלימודים יותר"
          description="גישה לקישורים, קהילות וכלים שמעצימים את היום-יום הסטודנטיאלי."
          align="right"
        >
          <View style={styles.heroRow}>
            <View style={styles.heroPill}>
              <IconSymbol name="globe" size={16} color="#fff" />
              <Text style={styles.heroText}>שיתופי פעולה בינלאומיים</Text>
            </View>
            <View style={styles.heroPill}>
              <IconSymbol name="sparkles" size={16} color="#fff" />
              <Text style={styles.heroText}>כלי למידה חכמים</Text>
            </View>
          </View>
        </HeroBanner>

        <Card>
          <Text style={styles.sectionTitle}>קישורים מהירים</Text>
          {quickLinks.map((link) => (
            <Pressable
              key={link.id}
              style={styles.rowWithIcon}
              onPress={() => {
                if (link.url) {
                  Linking.openURL(link.url).catch(() => {
                    /* ignore open errors for now */
                  });
                }
              }}
              android_ripple={{ color: "rgba(0,0,0,0.04)" }}
              accessibilityRole={link.url ? "link" : undefined}
              accessibilityHint={
                link.url ? "פתח קישור לספרייה הדיגיטלית" : undefined
              }
            >
              <View style={styles.iconPill}>
                <IconSymbol
                  name={link.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{link.title}</Text>
                <Text style={styles.itemDetail}>{link.detail}</Text>
              </View>
              <IconSymbol
                name="chevron.left"
                size={18}
                color={Colors.light.tint}
              />
            </Pressable>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>קהילות ויוזמות</Text>
          {communities.map((community) => (
            <View key={community.id} style={styles.communityRow}>
              <Text style={styles.itemTitle}>{community.label}</Text>
              <Text style={styles.itemDetail}>{community.description}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>כלים שימושיים</Text>
          {usefulTools.map((tool) => (
            <View key={tool.id} style={styles.rowWithIcon}>
              <View style={styles.iconPill}>
                <IconSymbol
                  name={tool.icon}
                  size={18}
                  color={Colors.light.tint}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{tool.title}</Text>
                <Text style={styles.itemDetail}>{tool.detail}</Text>
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
  heroRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  heroPill: {
    flexDirection: "row-reverse",
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  rowWithIcon: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 14,
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
  itemTitle: {
    fontWeight: "700",
    color: Colors.light.text,
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
  communityRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    gap: 6,
  },
});

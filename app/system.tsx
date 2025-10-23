import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SystemScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.titleRow}>
          <IconSymbol name="calendar" size={18} color={Colors.light.tint} />
          <Text style={[styles.title, { color: Colors.light.tint }]}>
            מערכת
          </Text>
        </View>
        <Card>
          <Text style={styles.cardText}>
            דפי המערכת והמידע המרכזי יוצגו כאן.
          </Text>
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: Colors.light.background },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    marginBottom: 12,
  },
  cardText: { color: "#444" },
});

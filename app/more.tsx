import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <Text style={[styles.title, { color: Colors.light.tint }]}>עוד</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            שירותים וקישורים נוספים לסטודנטים.
          </Text>
        </View>
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

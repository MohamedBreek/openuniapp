import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DiscountScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Discounts / הנחות</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Student discount programs and forms.
          </Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: Colors.light.background },
  title: { fontSize: 20, fontWeight: "800", color: Colors.light.text },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  cardText: { color: "#444" },
});

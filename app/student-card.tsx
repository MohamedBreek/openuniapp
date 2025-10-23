import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function StudentCardScreen() {
  const { student } = useAuth();
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.titleRow}>
          <IconSymbol name="id.card" size={18} color={Colors.light.tint} />
          <Text style={[styles.title, { color: Colors.light.tint }]}>
            כרטיס סטודנט
          </Text>
        </View>
        <Card>
          <Image
            source={require("../assets//images/studentcard.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.name}>{student?.fullName}</Text>
          <Text style={styles.id}>{student?.id}</Text>
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
    elevation: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    marginBottom: 12,
  },
  image: { width: 240, height: 160, borderRadius: 8, marginBottom: 12 },
  name: { fontWeight: "800" },
  id: { color: "#666" },
});

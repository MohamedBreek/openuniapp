import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function StudentCardScreen() {
  const { student } = useAuth();
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Student Card / כרטיס סטודנט</Text>
        <View style={styles.card}>
          <Image
            source={{
              uri: student?.cardImageUrl || "https://placehold.co/240x160",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.name}>{student?.fullName}</Text>
          <Text style={styles.id}>{student?.id}</Text>
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
    elevation: 6,
    alignItems: "center",
  },
  image: { width: 240, height: 160, borderRadius: 8, marginBottom: 12 },
  name: { fontWeight: "800" },
  id: { color: "#666" },
});

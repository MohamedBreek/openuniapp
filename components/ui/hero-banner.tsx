import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type HeroBannerProps = {
  title: string;
  subtitle?: string;
  description?: string;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
};

export default function HeroBanner({
  title,
  subtitle,
  description,
  style,
  children,
}: HeroBannerProps) {
  return (
    <LinearGradient
      colors={["#1565D8", "#1E90FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.banner, style as any]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 20,
    padding: 22,
    shadowColor: "#1565D8",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.88)",
  },
  description: {
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
});

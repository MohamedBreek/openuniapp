import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type HeroBannerProps = {
  title: string;
  subtitle?: string;
  description?: string;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  align?: "left" | "right";
};

export default function HeroBanner({
  title,
  subtitle,
  description,
  style,
  children,
  align = "left",
}: HeroBannerProps) {
  return (
    <LinearGradient
      colors={["#1565D8", "#1E90FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.banner, style as any]}
    >
      <View
        style={[
          styles.content,
          align === "right" ? styles.alignRight : styles.alignLeft,
        ]}
      >
        <Text
          style={[
            styles.title,
            align === "right" ? styles.textRight : styles.textLeft,
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              align === "right" ? styles.textRight : styles.textLeft,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
        {description ? (
          <Text
            style={[
              styles.description,
              align === "right" ? styles.textRight : styles.textLeft,
            ]}
          >
            {description}
          </Text>
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
  alignLeft: { alignItems: "flex-start" },
  alignRight: { alignItems: "flex-end" },
  textLeft: {
    textAlign: "left",
    writingDirection: "ltr",
    alignSelf: "flex-start",
  },
  textRight: {
    textAlign: "right",
    writingDirection: "rtl",
    alignSelf: "flex-end",
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

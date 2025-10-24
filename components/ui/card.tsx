import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  accessibilityLabel?: string;
};

export default function Card({
  children,
  style,
  onPress,
  accessibilityLabel,
}: CardProps) {
  const Container: any = onPress ? Pressable : View;
  return (
    <Container
      style={[styles.card, style as any]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 26,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    shadowColor: "#1565D8",
    shadowOpacity: 0.12,
    shadowRadius: 26,
    elevation: 7,
  },
});

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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});

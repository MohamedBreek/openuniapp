import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useGradient?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  useGradient = false,
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: useGradient ? "transparent" : backgroundColor },
        style,
      ]}
      {...otherProps}
    >
      {useGradient ? (
        <LinearGradient
          colors={["#e4efff", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          pointerEvents="none"
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    position: "relative",
  },
});

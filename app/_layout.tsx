import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "@/context/auth";
import {
  Alef_400Regular,
  Alef_700Bold,
  useFonts,
} from "@expo-google-fonts/alef";
import { Text, View } from "react-native";
// light mode forced; do not use system color scheme

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  // Force light theme across the app
  // const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ Alef_400Regular, Alef_700Bold });

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        {!fontsLoaded ? (
          <View
            style={{
              height: 48,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>טוען גופנים...</Text>
          </View>
        ) : null}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="calendar"
            options={{
              title: "לוח שנה",
            }}
          />
          <Stack.Screen
            name="grades"
            options={{
              title: "ציונים",
            }}
          />
          <Stack.Screen
            name="support"
            options={{
              title: "תמיכה",
            }}
          />
          <Stack.Screen
            name="exams"
            options={{
              title: "מבחנים",
            }}
          />
          <Stack.Screen
            name="student-card"
            options={{
              title: "כרטיס סטודנט",
            }}
          />
          <Stack.Screen
            name="discount"
            options={{
              title: "הנחות לסטודנטים",
            }}
          />
          <Stack.Screen
            name="dean"
            options={{
              title: "דיקן",
            }}
          />
          <Stack.Screen
            name="department"
            options={{
              title: "המחלקה שלי",
            }}
          />
          <Stack.Screen
            name="more"
            options={{
              title: "עוד",
            }}
          />
        </Stack>
      </AuthProvider>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

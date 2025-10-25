import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { useFeatureFlags } from "@/context/featureFlags";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();
  const { setFlag } = useFeatureFlags();
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: "ברוכים הבאים",
      body: "ברוכים הבאים לאפליקציית האוניברסיטה. כאן תמצאו את המידע האישי והקורסים שלכם.",
    },
    {
      title: "הודעות חשובות",
      body: "נוכל לשלוח עדכונים חשובים על מבחנים, ציונים והודעות דחופות.",
    },
    {
      title: "התחל עכשיו",
      body: "חווית משתמש מותאמת מחכה לך — נתחיל!",
    },
  ];

  const onFinish = async () => {
    await setFlag("seenOnboarding", true);
    try {
      router.replace("/");
    } catch {
      /* ignore */
    }
  };

  return (
    <ThemedView style={styles.container} useGradient>
      <Card style={styles.card} accessibilityLabel="Onboarding card">
        <Text style={styles.title}>{steps[step].title}</Text>
        <Text style={styles.body}>{steps[step].body}</Text>

        <View style={styles.footer}>
          {step > 0 ? (
            <Pressable
              onPress={() => setStep((s) => s - 1)}
              style={styles.button}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>חזור</Text>
            </Pressable>
          ) : (
            <View style={{ width: 80 }} />
          )}

          {step < steps.length - 1 ? (
            <Pressable
              onPress={() => setStep((s) => s + 1)}
              style={styles.button}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>המשך</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={onFinish}
              style={styles.primaryButton}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>סיום</Text>
            </Pressable>
          )}
        </View>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { paddingVertical: 32, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
  body: { fontSize: 16, color: "#444", textAlign: "center" },
  footer: {
    marginTop: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: { paddingVertical: 10, paddingHorizontal: 16 },
  buttonText: { color: "#1E40AF", fontWeight: "700" },
  primaryButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  primaryButtonText: { color: "#fff", fontWeight: "800" },
});

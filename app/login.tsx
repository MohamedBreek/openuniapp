import { useAuth } from "@/context/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    const res = await login(username.trim(), password, id.trim());
    setLoading(false);
    if (!res.ok) setError(res.error || "Login failed");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding" })}
    >
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/openu-logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Open University</Text>
        <Text style={styles.subtitle}>האוניברסיטה הפתוחה</Text>

        <TextInput
          placeholder="Username / שם משתמש"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password / סיסמה"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Student ID / תעודת זהות"
          style={styles.input}
          value={id}
          onChangeText={setId}
          keyboardType="number-pad"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={styles.primaryButton}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Login / כניסה</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function LoginScreen() {
  return <LoginForm />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6FBFF",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: { width: 160, height: 64, alignSelf: "center", marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#E6EEF6",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#FAFDFF",
  },
  error: { color: "crimson", marginBottom: 8, textAlign: "center" },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});

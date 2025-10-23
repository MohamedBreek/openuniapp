import i18next from "@/i18n";
import * as SecureStore from "@/utils/secureStorage";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const LANG_KEY = "openu_lang_v1";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState((i18next as any).language || "he");

  useEffect(() => {
    (async () => {
      const stored = await SecureStore.getItem(LANG_KEY);
      if (stored) {
        setLang(stored);
        i18next.changeLanguage(stored);
      }
    })();
  }, []);

  const toggle = async () => {
    const next = lang === "he" ? "en" : "he";
    setLang(next);
    try {
      await SecureStore.setItem(LANG_KEY, next);
    } catch {}
    i18next.changeLanguage(next);
  };

  return (
    <Pressable style={styles.wrap} onPress={toggle}>
      <Text style={styles.text}>{lang === "he" ? "עברית" : "EN"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 8 },
  text: { fontWeight: "700" },
});

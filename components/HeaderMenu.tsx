import { useAuth } from "@/context/auth";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function HeaderMenu(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.trigger}>
        <Text style={styles.triggerText}>☰</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <Pressable
              style={styles.item}
              onPress={() => {
                setOpen(false);
                try {
                  router.push("/grades");
                } catch {}
              }}
            >
              <Text style={styles.itemText}>ציונים</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setOpen(false);
                try {
                  router.push("/exams");
                } catch {}
              }}
            >
              <Text style={styles.itemText}>מבחנים</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setOpen(false);
                try {
                  router.push("/system");
                } catch {}
                }}
            >
              <Text style={styles.itemText}>לוח שלי</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setOpen(false);
                try {
                  router.push("/student-card");
                } catch {}
              }}
            >
              <Text style={styles.itemText}>הפרופיל שלי</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setOpen(false);
                Linking.openURL("mailto:info@openu.ac.il");
              }}
            >
              <Text style={styles.itemText}>צור קשר</Text>
            </Pressable>

            <Pressable
              style={[styles.item, { borderTopWidth: 1, borderColor: "#eee" }]}
              onPress={() => {
                setOpen(false);
                try {
                  logout();
                } catch {}
              }}
            >
              <Text style={[styles.itemText, { color: "#c00" }]}>התנתק</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { padding: 8 },
  triggerText: { fontSize: 24 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    width: 200,
    marginTop: 56,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 6,
    elevation: 6,
  },
  item: { paddingVertical: 12, paddingHorizontal: 14 },
  itemText: { fontSize: 16, fontWeight: "700" },
});

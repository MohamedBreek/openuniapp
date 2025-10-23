import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  imageUrl?: string;
  name?: string;
  id?: string;
};

export default function StudentCardModal({
  visible,
  onClose,
  imageUrl,
  name,
  id,
}: Props) {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.container}>
          <Pressable style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>{t("close")}</Text>
          </Pressable>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  image: { width: "100%", height: 180, borderRadius: 8, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "600" },
  id: { color: "#666", marginTop: 4 },
  close: { position: "absolute", right: 8, top: 8, zIndex: 10 },
  closeText: { fontSize: 22 },
});

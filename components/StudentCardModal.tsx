import React from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  imageUrl?: string | number;
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
  // translations removed; Hebrew-only
  const cardImageSource: ImageSourcePropType =
    typeof imageUrl === "number"
      ? imageUrl
      : imageUrl
      ? { uri: imageUrl }
      : require("@/assets/images/studentcard.png");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.container}>
          <Pressable style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>סגור</Text>
          </Pressable>
          <Pressable style={styles.inner} onPress={() => {}}>
            <Image
              source={cardImageSource}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.id}>{id}</Text>
          </Pressable>
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
  inner: {
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  image: { width: "100%", aspectRatio: 1.6, borderRadius: 8, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "600" },
  id: { color: "#666", marginTop: 4 },
  close: { position: "absolute", right: 8, top: 8, zIndex: 10 },
  closeText: { fontSize: 22 },
});

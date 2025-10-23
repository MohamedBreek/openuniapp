import { Colors } from "@/constants/theme";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import {
  GestureResponderEvent,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
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
  const { width: screenWidth } = useWindowDimensions();
  const containerWidth = Math.min(screenWidth * 0.96, 680);
  const horizontalPadding =
    screenWidth >= 640 ? 40 : screenWidth >= 480 ? 32 : 22;
  const verticalPadding =
    screenWidth >= 640 ? 38 : screenWidth >= 480 ? 32 : 26;
  const backdropPadding =
    screenWidth >= 640 ? 34 : screenWidth >= 480 ? 20 : 12;
  const imageAspect =
    screenWidth >= 640 ? 1.7 : screenWidth >= 480 ? 1.6 : 1.52;
  const identitySpacing = screenWidth >= 480 ? 26 : 18;
  const nameFontSize = screenWidth >= 520 ? 22 : screenWidth >= 400 ? 20 : 18;
  const idFontSize = screenWidth >= 520 ? 17 : screenWidth >= 400 ? 15 : 14;

  const defaultImage = React.useMemo(
    () => require("@/assets/images/studentcard.png") as ImageSourcePropType,
    []
  );

  const cardImageSource: ImageSourcePropType = React.useMemo(() => {
    if (typeof imageUrl === "number") return imageUrl;
    if (typeof imageUrl === "string" && imageUrl.length > 0)
      return { uri: imageUrl };
    return defaultImage;
  }, [defaultImage, imageUrl]);

  const stopPropagation = React.useCallback((event: GestureResponderEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable
        style={[styles.backdrop, { padding: backdropPadding }]}
        onPress={onClose}
      >
        <Pressable
          style={[
            styles.container,
            {
              width: containerWidth,
              paddingHorizontal: horizontalPadding,
              paddingTop: verticalPadding,
              paddingBottom: verticalPadding - 6,
            },
          ]}
          onPress={stopPropagation}
        >
          <Pressable
            style={[
              styles.close,
              { right: horizontalPadding - 6, top: verticalPadding - 12 },
            ]}
            onPress={onClose}
          >
            <Text style={styles.closeText}>סגור</Text>
          </Pressable>

          <View style={styles.imageWrap}>
            <ExpoImage
              source={cardImageSource}
              style={[styles.image, { aspectRatio: imageAspect }]}
              contentFit="contain"
              transition={120}
            />
          </View>

          <View style={[styles.identityBlock, { marginTop: identitySpacing }]}>
            <Text style={[styles.name, { fontSize: nameFontSize }]}>
              {name}
            </Text>
            <Text style={[styles.id, { fontSize: idFontSize }]}>{id}</Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(5,8,20,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 28,
    alignItems: "center",
    shadowColor: "rgba(15,23,42,0.5)",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 18 },
    elevation: 24,
  },
  imageWrap: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.16)",
    shadowColor: "rgba(21,101,216,0.4)",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  image: {
    width: "100%",
    backgroundColor: "#fff",
  },
  identityBlock: {
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontWeight: "700",
    color: Colors.light.text,
  },
  id: {
    color: "#4B5563",
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  close: { position: "absolute", zIndex: 10 },
  closeText: { fontSize: 16, fontWeight: "600", color: Colors.light.tint },
});

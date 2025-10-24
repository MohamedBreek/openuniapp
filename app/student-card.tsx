import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { Image as ExpoImage } from "expo-image";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function StudentCardScreen() {
  const { student } = useAuth();

  const cardImageSource: ImageSourcePropType = React.useMemo(() => {
    if (typeof student?.cardImageUrl === "number") {
      return student.cardImageUrl;
    }
    if (typeof student?.cardImageUrl === "string" && student.cardImageUrl) {
      return { uri: student.cardImageUrl };
    }
    return require("@/assets/images/studentcard.png");
  }, [student?.cardImageUrl]);

  const [downloading, setDownloading] = React.useState(false);

  const resolveCardImageUri = React.useCallback(async () => {
    if (typeof cardImageSource === "number") {
      const asset = Asset.fromModule(cardImageSource);
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      return asset.localUri ?? asset.uri;
    }

    if (Array.isArray(cardImageSource)) {
      const first = cardImageSource[0] as any;
      if (first?.uri) {
        return first.uri as string;
      }
    }

    if (
      typeof cardImageSource === "object" &&
      cardImageSource !== null &&
      "uri" in (cardImageSource as Record<string, unknown>)
    ) {
      return (cardImageSource as { uri?: string }).uri;
    }

    return undefined;
  }, [cardImageSource]);

  const handleDownload = React.useCallback(async () => {
    if (downloading) return;

    try {
      const sourceUri = await resolveCardImageUri();
      if (!sourceUri) {
        Alert.alert("הורדה נכשלה", "לא נמצא קובץ כרטיס לשמור.");
        return;
      }

      if (Platform.OS === "web") {
        if (typeof window !== "undefined") {
          window.open(sourceUri, "_blank", "noopener,noreferrer");
        }
        return;
      }

      setDownloading(true);

      const fileName = `student-card-${Date.now()}.png`;
      const baseDirectory =
        FileSystem.documentDirectory ?? FileSystem.cacheDirectory;
      if (!baseDirectory) {
        Alert.alert("הורדה נכשלה", "אין הרשאה לשמור קבצים במכשיר זה כרגע.");
        return;
      }

      const destinationUri = `${baseDirectory}${fileName}`;

      if (sourceUri.startsWith("file://")) {
        await FileSystem.copyAsync({ from: sourceUri, to: destinationUri });
      } else {
        await FileSystem.downloadAsync(sourceUri, destinationUri);
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destinationUri);
      } else {
        Alert.alert(
          "הורדה הושלמה",
          "הכרטיס נשמר בתיקיית המסמכים של האפליקציה."
        );
      }
    } catch (error) {
      console.error("Failed to download student card", error);
      Alert.alert(
        "הורדה נכשלה",
        "אנחנו מתקשים לשמור את הכרטיס כרגע. נסו שוב מאוחר יותר."
      );
    } finally {
      setDownloading(false);
    }
  }, [downloading, resolveCardImageUri]);

  const features = [
    {
      id: "1",
      title: "כניסה לקמפוס",
      detail: "הציגו את הכרטיס להגעה מהירה ושמירת ביטחון.",
    },
    {
      id: "2",
      title: "הנחות סטודנטים",
      detail: "הטבות בתחבורה ציבורית, תרבות ועוד.",
    },
    {
      id: "3",
      title: "ספרייה ושירותים",
      detail: "גישה לליווי אקדמי, מדפסות ושירותי השאלה.",
    },
  ];
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container} useGradient>
        <HeroBanner
          title="כרטיס סטודנט דיגיטלי"
          subtitle="תמיד בהישג יד"
          description="הצג את הכרטיס כדי להיכנס לקמפוס, ליהנות מהטבות ולהזדהות מול שירותי האוניברסיטה."
          align="right"
        >
          <View style={styles.heroRow}>
            <View style={styles.heroPill}>
              <IconSymbol name="checkmark.seal" size={16} color="#fff" />
              <Text style={styles.heroPillText}>מאושר לשנת הלימודים</Text>
            </View>
            <View style={styles.heroPill}>
              <IconSymbol name="sparkles" size={16} color="#fff" />
              <Text style={styles.heroPillText}>זכאות להנחות סטודנט</Text>
            </View>
          </View>
        </HeroBanner>

        <Card style={styles.cardWrap}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>הכרטיס שלך</Text>
              <Text style={styles.cardSubtitle}>זמין גם ללא חיבור לרשת</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.cardAction,
                pressed && !downloading ? styles.cardActionPressed : null,
                downloading ? styles.cardActionDisabled : null,
              ]}
              onPress={handleDownload}
              disabled={downloading}
              accessibilityRole="button"
              accessibilityLabel="הורדת כרטיס הסטודנט"
            >
              <View style={styles.cardActionContent}>
                {downloading ? (
                  <ActivityIndicator size="small" color={Colors.light.tint} />
                ) : (
                  <IconSymbol
                    name="square.and.arrow.down"
                    size={16}
                    color={Colors.light.tint}
                  />
                )}
                <Text style={styles.cardActionText}>
                  {downloading ? "מוריד..." : "הורדה"}
                </Text>
              </View>
            </Pressable>
          </View>
          <ExpoImage
            source={cardImageSource}
            style={styles.image}
            contentFit="cover"
            transition={160}
          />
          <View style={styles.identityRow}>
            <View>
              <Text style={styles.name}>{student?.fullName}</Text>
              <Text style={styles.idLabel}>תעודת זהות</Text>
              <Text style={styles.id}>{student?.id}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>סטודנט פעיל</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>איך משתמשים בכרטיס?</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>פתחו את האפליקציה</Text>
                <Text style={styles.stepDescription}>
                  גשו למסך זה גם במצב לא מקוון – הכרטיס נשמר במכשיר.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>הציגו בשערי הקמפוס</Text>
                <Text style={styles.stepDescription}>
                  סורקים בקוד האחורי במידת הצורך ומוודאים שהפרטים גלויים.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>נהנו מהטבות</Text>
                <Text style={styles.stepDescription}>
                  ברשתות התחבורה, תרבות וספורט – הציגו את הכרטיס וקבלו הנחות.
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>מה כלול בכרטיס</Text>
          {features.map((item) => (
            <View key={item.id} style={styles.featureRow}>
              <View style={styles.featureIconWrap}>
                <IconSymbol name="star" size={16} color={Colors.light.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
  },
  heroPill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heroPillText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
    writingDirection: "rtl",
  },
  cardWrap: { gap: 16 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  cardSubtitle: { color: "#4B5563", marginTop: 4 },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  cardActionPressed: { opacity: 0.85 },
  cardActionDisabled: { opacity: 0.6 },
  cardActionContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  cardActionText: {
    color: Colors.light.tint,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  image: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.2)",
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: { fontSize: 18, fontWeight: "800", color: Colors.light.text },
  idLabel: { color: "#6B7280", fontSize: 12, marginTop: 4 },
  id: { color: "#1F2937", fontWeight: "600" },
  statusPill: {
    backgroundColor: "rgba(21,101,216,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    color: Colors.light.tint,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  stepsList: { gap: 14 },
  stepItem: { flexDirection: "row-reverse", gap: 12 },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  stepNumberText: { color: Colors.light.tint, fontWeight: "700" },
  stepContent: { flex: 1 },
  stepTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  stepDescription: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
  featureRow: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 12,
  },
  featureIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  featureTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  featureDetail: {
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "right",
    writingDirection: "rtl",
  },
});

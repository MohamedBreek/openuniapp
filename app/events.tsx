import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Event = {
  id: string;
  title: string;
  subtitle?: string;
  dateDay: string;
  dateMonth: string;
  dateYear?: string;
  image: any;
  priceLabel?: string;
  location?: string;
  time?: string;
  url?: string;
};

const SAMPLE: Event[] = [
  {
    id: "e1",
    title: "מפגש מידע על תואר שני בלמידת מכונה",
    subtitle: "ניתוח נתוני עתק",
    dateDay: "19",
    dateMonth: "נוב",
    dateYear: "2025",
    image: {
      uri: "https://images.unsplash.com/photo-1532619675605-9f3b6f2f4b2d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6c927a7a5d4f8d5d8a3f7b9b1c1f9b3a",
    },
    priceLabel: "ללא תשלום",
    url: "https://www.openu.ac.il/events/mlbd19112025.aspx",
    location: "Zoom",
    time: "19.00",
  },
  {
    id: "e2",
    title: "מפגש מידע לתואר שני במנהל עסקים",
    subtitle: "הזדמנויות תעסוקה",
    dateDay: "2",
    dateMonth: "נוב",
    dateYear: "2025",
    image: {
      uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2c6f2b6defb3f7e5f6a8c9d6b4a8c8d2",
    },
    priceLabel: "ללא תשלום",
    url: "https://www.openu.ac.il/events/mba02112025.aspx",
    location: "Zoom",
    time: "20.00",
  },
];

export default function EventsScreen() {
  const renderItem = React.useCallback(({ item }: { item: Event }) => {
    return (
      <Pressable
        style={styles.cardWrap}
        android_ripple={{ color: "rgba(0,0,0,0.04)" }}
        onPress={() => {
          if (item.url) {
            Linking.openURL(item.url).catch(() => {
              /* ignore open errors for now */
            });
          }
        }}
        accessibilityRole={item.url ? "link" : undefined}
      >
        <Card style={styles.card}>
          <View style={styles.imageWrap}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.dateBadge}>
              <Text style={styles.dateMonth}>{item.dateMonth}</Text>
              <Text style={styles.dateDay}>{item.dateDay}</Text>
              {item.dateYear ? (
                <Text style={styles.dateYear}>{item.dateYear}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            {item.subtitle ? (
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            ) : null}

            <View style={styles.metaRow}>
              <View style={styles.metaLeft}>
                <IconSymbol name="tag" size={14} color={Colors.light.icon} />
                <Text style={styles.metaText}>{item.priceLabel}</Text>
              </View>

              <View style={styles.metaCenter}>
                <IconSymbol
                  name="map.pin"
                  size={14}
                  color={Colors.light.icon}
                />
                <Text style={styles.metaText}>{item.location}</Text>
              </View>

              <View style={styles.metaRight}>
                <IconSymbol name="clock" size={14} color={Colors.light.icon} />
                <Text style={styles.metaText}>{item.time}</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
    );
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "אירועים" }} />
      <ThemedView style={styles.container} useGradient>
        <FlatList
          data={SAMPLE}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  cardWrap: { flex: 1, marginHorizontal: 6 },
  card: { padding: 0, overflow: "hidden" },
  imageWrap: { width: "100%", height: 110, backgroundColor: "#eee" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  dateBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  dateMonth: { fontSize: 11, color: Colors.light.tint, fontWeight: "700" },
  dateDay: { fontSize: 18, color: Colors.light.tint, fontWeight: "800" },
  dateYear: { fontSize: 10, color: Colors.light.tint },
  cardBody: { padding: 12 },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  subtitle: {
    color: Colors.light.icon,
    marginTop: 8,
    textAlign: "right",
    writingDirection: "rtl",
  },
  metaRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
  metaLeft: { flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  metaCenter: { flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  metaRight: { flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  metaText: { marginLeft: 6, color: Colors.light.icon, fontSize: 12 },
});

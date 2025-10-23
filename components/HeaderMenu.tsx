import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type MenuAction = {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
  meta?: string;
  tone?: "default" | "danger";
};

export default function HeaderMenu(): React.ReactElement {
  const router = useRouter();
  const { logout } = useAuth();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const [visible, setVisible] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-12)).current;

  const closeMenu = React.useCallback(
    (onClosed?: () => void) => {
      if (!visible) {
        onClosed?.();
        return;
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -12,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setVisible(false);
          fadeAnim.setValue(0);
          translateY.setValue(-12);
          onClosed?.();
        }
      });
    },
    [fadeAnim, translateY, visible]
  );

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    fadeAnim.setValue(0);
    translateY.setValue(-12);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 14,
        stiffness: 160,
        mass: 0.65,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, visible]);

  const runAfterClose = React.useCallback(
    (cb?: () => void | Promise<void>) => () => {
      closeMenu(() => {
        if (!cb) {
          return;
        }

        try {
          Promise.resolve(cb()).catch(() => {});
        } catch {
          // Navigation failures are ignored silently to avoid crashing the menu.
        }
      });
    },
    [closeMenu]
  );

  const navigationItems = React.useMemo<MenuAction[]>(
    () => [
      {
        id: "grades",
        label: "ציונים",
        icon: "checkmark.seal",
        onPress: runAfterClose(() => {
          router.push("/grades");
        }),
      },
      {
        id: "exams",
        label: "מבחנים",
        icon: "doc.text",
        onPress: runAfterClose(() => {
          router.push("/exams");
        }),
      },
      {
        id: "calendar",
        label: "לוח שלי",
        icon: "calendar",
        onPress: runAfterClose(() => {
          router.push("/calendar");
        }),
      },
      {
        id: "student-card",
        label: "הפרופיל שלי",
        icon: "id.card",
        onPress: runAfterClose(() => {
          router.push("/student-card");
        }),
      },
    ],
    [router, runAfterClose]
  );

  const utilityItems = React.useMemo<MenuAction[]>(
    () => [
      {
        id: "contact",
        label: "צור קשר",
        icon: "bubble.left",
        meta: "info@openu.ac.il",
        onPress: runAfterClose(async () => {
          await Linking.openURL("mailto:info@openu.ac.il");
        }),
      },
    ],
    [runAfterClose]
  );

  const destructiveItem = React.useMemo<MenuAction>(
    () => ({
      id: "logout",
      label: "התנתק",
      icon: "rectangle.portrait.and.arrow.right",
      tone: "danger",
      onPress: runAfterClose(async () => {
        await logout();
      }),
    }),
    [logout, runAfterClose]
  );

  const overlayColor = isDark ? "rgba(4,7,17,0.7)" : "rgba(15,23,42,0.32)";
  const menuSurface = isDark ? "rgba(17,23,41,0.95)" : "rgba(255,255,255,0.97)";
  const dividerColor = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(21,101,216,0.08)";
  const iconBackground = isDark
    ? "rgba(21,101,216,0.22)"
    : "rgba(21,101,216,0.12)";
  const pressedBackground = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(21,101,216,0.1)";
  const dangerColor = isDark ? "#f87171" : "#d94848";
  const dangerIconBackground = isDark
    ? "rgba(248,113,113,0.18)"
    : "rgba(217,72,72,0.12)";
  const subtitleColor = isDark ? "rgba(236,237,238,0.7)" : "#4B5563";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(17,24,39,0.12)";

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          styles.trigger,
          {
            borderColor,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.7)",
          },
          pressed && styles.triggerPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="פתח תפריט"
      >
        <IconSymbol
          name="ellipsis.circle"
          size={22}
          color={isDark ? "#fff" : palette.tint}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => closeMenu()}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: overlayColor }]}
          onPress={() => closeMenu()}
        >
          <Animated.View
            style={[
              styles.menu,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
                backgroundColor: menuSurface,
                borderColor,
                shadowColor: isDark ? "#000" : "rgba(17,24,39,0.45)",
              },
            ]}
          >
            <View style={[styles.menuHeader, { borderColor: dividerColor }]}>
              <Text style={[styles.menuTitle, { color: palette.text }]}>
                ניווט מהיר
              </Text>
              <Text style={[styles.menuSubtitle, { color: subtitleColor }]}>
                גשו למסכים המרכזיים ולפעולות החשובות
              </Text>
            </View>

            {navigationItems.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { backgroundColor: pressedBackground },
                ]}
                onPress={item.onPress}
                accessibilityRole="button"
              >
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.iconPill,
                      { backgroundColor: iconBackground },
                    ]}
                  >
                    <IconSymbol
                      name={item.icon}
                      size={18}
                      color={palette.tint}
                    />
                  </View>
                  <Text style={[styles.itemLabel, { color: palette.text }]}>
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            ))}

            <View style={[styles.divider, { backgroundColor: dividerColor }]} />

            {utilityItems.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { backgroundColor: pressedBackground },
                ]}
                onPress={item.onPress}
              >
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.iconPill,
                      { backgroundColor: iconBackground },
                    ]}
                  >
                    <IconSymbol
                      name={item.icon}
                      size={18}
                      color={palette.tint}
                    />
                  </View>
                  <View>
                    <Text style={[styles.itemLabel, { color: palette.text }]}>
                      {item.label}
                    </Text>
                    {item.meta ? (
                      <Text style={[styles.itemMeta, { color: subtitleColor }]}>
                        {item.meta}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            ))}

            <View style={[styles.divider, { backgroundColor: dividerColor }]} />

            <Pressable
              style={({ pressed }) => [
                styles.item,
                pressed && { backgroundColor: pressedBackground },
              ]}
              onPress={destructiveItem.onPress}
              accessibilityRole="button"
            >
              <View style={styles.itemContent}>
                <View
                  style={[
                    styles.iconPill,
                    { backgroundColor: dangerIconBackground },
                  ]}
                >
                  <IconSymbol
                    name={destructiveItem.icon}
                    size={18}
                    color={dangerColor}
                  />
                </View>
                <Text style={[styles.itemLabel, { color: dangerColor }]}>
                  {destructiveItem.label}
                </Text>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 999,
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  triggerPressed: {
    transform: [{ scale: 0.96 }],
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 64,
    paddingRight: 16,
  },
  menu: {
    width: 260,
    borderRadius: 20,
    paddingVertical: 8,
    borderWidth: 1,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
    overflow: "hidden",
  },
  menuHeader: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 6,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: "500",
  },
  item: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  itemMeta: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 18,
    opacity: 0.7,
  },
});

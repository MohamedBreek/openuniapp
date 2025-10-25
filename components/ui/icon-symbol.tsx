// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = string;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  calendar: "calendar-today",
  "doc.text": "article",
  "checkmark.seal": "verified",
  "bubble.left": "chat-bubble",
  bus: "directions-bus",
  "id.card": "badge",
  "hand.heart": "favorite",
  graduationcap: "school",
  "ellipsis.circle": "more-horiz",
  sparkles: "auto-awesome",
  star: "star",
  "square.and.arrow.down": "file-download",
  "rectangle.portrait.and.arrow.right": "logout",
  "phone.fill": "call",
  envelope: "mail",
  "location.fill": "location-on",
  "clock.fill": "schedule",
  "person.2.fill": "groups",
  link: "link",
  "bolt.fill": "bolt",
  "book.fill": "menu-book",
  globe: "public",
  "chart.bar": "bar-chart",
  "doc.richtext": "article",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mapped = MAPPING[name] ?? "help-outline";
  // Icons are decorative by default; hide them from screen readers unless
  // an explicit accessibilityLabel is passed via `style` or wrapper.
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={mapped}
      style={style}
      accessible={false}
    />
  );
}

import * as ExpoSecureStore from "expo-secure-store";

// Compatibility wrapper around expo-secure-store.
// Uses the standard getItemAsync / setItemAsync / deleteItemAsync API when
// available. If the runtime provides a legacy `ExpoSecureStore.default.getValueWithKeyAsync`
// (older bundling or patched environment), we attempt to call it as a fallback.

const hasModernAPI =
  typeof (ExpoSecureStore as any).getItemAsync === "function";
const legacy = (ExpoSecureStore as any).default;

export async function getItem(key: string): Promise<string | null> {
  try {
    if (hasModernAPI) return await (ExpoSecureStore as any).getItemAsync(key);
    if (legacy && typeof legacy.getValueWithKeyAsync === "function") {
      // legacy signature
      return await legacy.getValueWithKeyAsync(key);
    }
  } catch {
    // swallow and return null
  }
  return null;
}

export async function setItem(key: string, value: string): Promise<void> {
  try {
    if (hasModernAPI)
      return await (ExpoSecureStore as any).setItemAsync(key, value);
    if (legacy && typeof legacy.setValueWithKeyAsync === "function") {
      return await legacy.setValueWithKeyAsync(key, value);
    }
  } catch {
    // ignore storage errors in wrapper
  }
}

export async function deleteItem(key: string): Promise<void> {
  try {
    if (hasModernAPI)
      return await (ExpoSecureStore as any).deleteItemAsync(key);
    if (legacy && typeof legacy.removeItemWithKeyAsync === "function") {
      return await legacy.removeItemWithKeyAsync(key);
    }
  } catch {
    // ignore
  }
}

export default {
  getItem,
  setItem,
  deleteItem,
};

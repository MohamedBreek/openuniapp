// Push notifications were temporarily removed. This file keeps lightweight
// stubs so imports don't break while the feature is disabled.

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  console.warn(
    "Push notifications are disabled in this build. Re-enable the feature to register for push tokens."
  );
  return null;
}

export async function sendExpoPushNotification() {
  throw new Error("Push notifications are disabled in this build.");
}

export default function usePushNotifications() {
  // no-op hook while notifications are disabled
  return;
}

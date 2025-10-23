Open University (OPENU) demo app

Quick start (Expo)

1. Install Expo CLI (if you don't have it):

```powershell
npm install -g expo-cli
```

2. Install project dependencies (run in repository root):

```powershell
npm install
# If you add packages below, install them:
npm install expo-secure-store
```

3. Run the app:

```powershell
npm start
```

What I changed

- Added a small auth context (`context/auth.tsx`) with mock auth.
- Added `app/login.tsx` with a simple login form (Hebrew + English labels).
- Updated `app/_layout.tsx` to provide the auth context.
- Added `types.ts` with mock data.
- Updated home screen (`app/(tabs)/index.tsx`) to show student info, courses, category filters and a student card modal.
- Small UI components in `components/` for modal, course item and filters.

Next steps

- Replace mock auth with a real API (see notes below).
- Store tokens securely with `expo-secure-store` and implement refresh tokens.
- Polish UI and localization (strings in English/Hebrew files).

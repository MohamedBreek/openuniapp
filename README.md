# OpenUniApp
Open University of Israel App for students — a companion app for Open University students to view courses, grades, schedule and campus news.


---

## Key features
- Personal dashboard: student name, current semester, next lesson
- Academic summary: average grade, active courses, credits/points
- Quick actions: schedule, grades, messages, notices, exams, resources
- News and announcements feed
- Localized UI (example: Hebrew support)
- Mobile-first responsive design (React Native / Expo compatible)

---

## Quick start

Prerequisites:
- Node.js >= 14
- npm or yarn
- (If mobile) React Native environment (Android/iOS) or Expo

Install dependencies:
- npm
  - npm install
  - npm run start
- yarn
  - yarn
  - yarn start

Run (web/React):
- npm run dev or yarn dev (depends on your project scripts)

Run (React Native / Expo):
- expo start
- react-native run-android
- react-native run-ios

Adjust commands to match the project's package.json scripts.

---

## How to use

- Open the app and sign in with your Open University credentials (if implemented).
- From the dashboard, you can:
  - See your current semester summary
  - Open the "My Schedule" to see upcoming lessons
  - Check grades, exam dates, and announcements
  - Open course details and resources

(Exact navigation depends on the app's current implementation — check the source components in `src/`.)

---

## Recommended file structure
- assets/
  - openuni-screenshot.png
- src/
  - components/
  - screens/
  - services/
- README.md
- package.json
- tsconfig.json

---

## Screenshots 

![screenshot](https://i.ibb.co/FqDMyFpg/Screenshot-20251025-174003-Expo-Go-2.jpg)

![screenshot](https://i.ibb.co/zTRFvhZn/Screenshot-20251025-174013-Expo-Go-2.jpg)

![screenshot](https://i.ibb.co/JwBmRnrw/Screenshot-20251025-174023-Expo-Go-2.jpg)


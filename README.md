# OpenUniApp
Open University of Israel App for students — a companion app for Open University students to view courses, grades, schedule and campus news.


---

## Features
- Student dashboard: name, current semester, next lesson
- Quick stats: average grade, number of active courses, credits
- Useful shortcuts: grades, schedule, messages, notices, exams, and more
- News and announcements feed
- Localized (Hebrew) UI support (example screenshot included)

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
- From the dashboard you can:
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

## Contributing
- Fork the repo
- Create a branch: `git checkout -b feature/your-feature`
- Make changes and add tests where appropriate
- Commit: `git commit -m "Add feature"`
- Push and open a pull request

If you want me to write a CONTRIBUTING.md or an issue template, tell me what rules you'd like and I can generate it.

---

## Hebrew (עברית) — תקציר מהיר
OpenUniApp הוא אפליקציית עזר לסטודנטים של האוניברסיטה הפתוחה. התכונות כוללות: דשבורד אישי, ציונים, לוח זמנים, הודעות וחדשות. כדי להוסיף את תמונת המסך שסיפקת, שמור אותה ב־assets/openuni-screenshot.png והשתמש ב־Markdown: `![OpenUniApp screenshot](./assets/openuni-screenshot.png)` או בקוד React/React Native כפי שמופיע למעלה.

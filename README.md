# OpenUniApp
Open Uni App for students — a companion app for Open University students to view courses, grades, schedule and campus news.

> NOTE: This README includes usage instructions and how to add the screenshot image you provided (referenced as image1 in our conversation). The UI screenshot appears to be in Hebrew and shows the Open University layout.

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

## Adding the screenshot (the image you provided)

You can add the screenshot to the repository and use it both inside the app and in this README.

1. Save the screenshot file to the repository
   - Create an `assets/` folder at the project root if it doesn't exist:
     - mkdir assets
   - Save the provided image as:
     - assets/openuni-screenshot.png
     - (Or use a `.jpg` extension if you prefer)

2. Show it in the README (Markdown)
   - Add this line to the README where you want the image to appear:
     ```markdown
     ![OpenUniApp screenshot](./assets/openuni-screenshot.png)
     ```
   - Markdown will display the image on GitHub when the file is present at that path.

3. Use the image in a React web app
   - Example:
     ```tsx
     import React from 'react';
     import screenshot from '../assets/openuni-screenshot.png';

     export default function Demo() {
       return (
         <div>
           <h3>App screenshot</h3>
           <img src={screenshot} alt="Open University app screenshot" style={{maxWidth: '100%'}} />
         </div>
       );
     }
     ```

4. Use the image in React Native
   - Local asset:
     ```tsx
     import React from 'react';
     import { Image, View, StyleSheet } from 'react-native';

     export default function Demo() {
       return (
         <View style={styles.container}>
           <Image
             source={require('../assets/openuni-screenshot.png')}
             style={styles.image}
             resizeMode="contain"
           />
         </View>
       );
     }

     const styles = StyleSheet.create({
       container: { alignItems: 'center', padding: 16 },
       image: { width: 300, height: 650 } // adjust for your layout
     });
     ```
   - If using Expo, you can also use `import` for static assets similarly to web.

5. Optimize (optional)
   - Resize the image (e.g., to 720px wide) to keep repo size reasonable.
   - Use `pngquant`/`mozjpeg` or an image optimization tool before committing.

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

## License
Add a LICENSE file (MIT, Apache-2.0, or another license you prefer). If you want, I can add an MIT license for you.

---

## Hebrew (עברית) — תקציר מהיר
OpenUniApp הוא אפליקציית עזר לסטודנטים של האוניברסיטה הפתוחה. התכונות כוללות: דשבורד אישי, ציונים, לוח זמנים, הודעות וחדשות. כדי להוסיף את תמונת המסך שסיפקת, שמור אותה ב־assets/openuni-screenshot.png והשתמש ב־Markdown: `![OpenUniApp screenshot](./assets/openuni-screenshot.png)` או בקוד React/React Native כפי שמופיע למעלה.

---

If you want, I can:
- Generate a localized README fully in Hebrew.
- Add a CONTRIBUTING.md, LICENSE, or sample demo page that includes the screenshot.
- Create a small demo component that shows the screenshot and the dashboard mock.

Which would you like next?

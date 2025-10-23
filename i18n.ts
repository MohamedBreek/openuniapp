import * as i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      importantApps: "Important applications",
      newsSource: "Open University",
      newsTitle: "Dear students",
      newsBody:
        "Welcome to the new academic year — important updates and news for all students.",
      tiles: {
        system: "System",
        exams: "Exams",
        grades: "Grades",
        support: "Support",
        courses: "Courses",
        discount: "Discount",
        studentCard: "Student Card",
        dean: "Dean Office",
        department: "Department",
        more: "More",
      },
      close: "Close",
    },
  },
  he: {
    translation: {
      home: "דף הבית",
      importantApps: "יישומים חשובים",
      newsSource: "האוניברסיטה הפתוחה",
      newsTitle: "סטודנטים יקרים",
      newsBody:
        "שמחים לבשר על תחילת שנת לימודים חדשה — קבלו עדכונים חשובים לסטודנטים.",
      system: "מערכת",
      exams: "מבחנים",
      support: "תמיכה",
      discount: "הנחות",
      studentCard: "כרטיס סטודנט",
      dean: "דיקנט הסטודנטים",
      department: "האגף",
      more: "עוד",
      openMaterials: "פתח חומרי קורס",
      call: "Call",
      email: "Email",
      courseNotFound: "הקורס לא נמצא",
      courseMetaCode: "קוד",
      courseMetaCredits: "זכ'י",
      courseMetaSemester: "סמסטר",
      tiles: {
        system: "מערכת",
        exams: "מבחנים",
        grades: "ציונים",
        support: "תמיכה",
        courses: "קורסים",
        discount: "הנחות",
        studentCard: "כרטיס סטודנט",
        dean: "דיקנט הסטודנטים",
        department: "האגף",
        more: "עוד",
      },
      close: "סגור",
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "he",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;

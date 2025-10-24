export type StudentStatus = "active" | "on-leave" | "graduated" | "suspended";

export type Student = {
  id: string;
  username: string;
  fullName: string;
  photoUrl?: string;
  status: StudentStatus;
  gpa?: number;
  degree?: string;
  faculties?: string[];
  cardImageUrl?: string;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  semester: string;
  credits: number;
  grade?: string;
  status?: "enrolled" | "completed" | "dropped";
};

export const MOCK_STUDENT: Student = {
  id: "12345678",
  username: "Mohamed",
  fullName: "Mohamed breek",
  status: "active",
  gpa: 96,
  degree: "BSc Computer Science",
  faculties: ["Computer Science"],
  cardImageUrl: require("@/assets/images/studentcard.png"),
};

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    code: "04101",
    title: "אשנב למתמטיקה",
    semester: "2025-10",
    credits: 6,
    grade: "90",
    status: "completed",
  },
  {
    id: "c2",
    code: "20476",
    title: "מתמטיקה בדידה",
    semester: "2025-10",
    credits: 4,
    grade: "85",
    status: "enrolled",
  },
  {
    id: "c3",
    code: "20109",
    title: "1 אלגברה ליניארית",
    semester: "2025-10",
    credits: 7,
    status: "enrolled",
  },
  {
    id: "c4",
    code: "20441",
    title: "java מבוא למדעי המחשב",
    semester: "2025-10",
    credits: 6,
    status: "enrolled",
  },
  {
    id: "c5",
    code: "10234",
    title: "2 אלגברה ליניארית",
    semester: "2025-10",
    credits: 2,
    status: "enrolled",
  },
  {
    id: "c6",
    code: "20476",
    title: "מבוא לפסיכולוגיה",
    semester: "2025-10",
    credits: 2,
    grade: "88",
    status: "completed",
  },
  {
    id: "c7",
    code: "20476",
    title: "מבוא לפסיכולוגיה",
    semester: "2025-10",
    credits: 2,
    grade: "88",
    status: "completed",
  },
  {
    id: "c8",
    code: "20476",
    title: "מבוא לפסיכולוגיה",
    semester: "2025-10",
    credits: 2,
    grade: "88",
    status: "completed",
  },
];

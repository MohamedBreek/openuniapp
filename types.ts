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
  photoUrl: "https://placehold.co/128x128",
  status: "active",
  gpa: 3.6,
  degree: "BSc Computer Science",
  faculties: ["Computer Science"],
  cardImageUrl: "https://placehold.co/600x400",
};

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    code: "CS101",
    title: "Intro to Computer Science",
    semester: "2025-10",
    credits: 3,
    grade: "A",
    status: "completed",
  },
  {
    id: "c2",
    code: "MA201",
    title: "Calculus II",
    semester: "2025-10",
    credits: 4,
    grade: "B+",
    status: "enrolled",
  },
  {
    id: "c3",
    code: "HS300",
    title: "History of Israel",
    semester: "2025-10",
    credits: 2,
    status: "enrolled",
  },
];

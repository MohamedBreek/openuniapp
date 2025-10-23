import { Course, MOCK_COURSES, MOCK_STUDENT, Student } from "@/types";
import * as SecureStore from "@/utils/secureStorage";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const TOKEN_KEY = "openu_token_v1";

type AuthState = {
  token?: string;
  student?: Student;
  courses: Course[];
  initializing?: boolean;
  register: (
    username: string,
    password: string,
    id: string,
    fullName?: string
  ) => Promise<{ ok: boolean; error?: string }>;
  login: (
    username: string,
    password: string,
    id: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refreshCourses: () => Promise<void>;
  refreshing: boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [initializing, setInitializing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Silent sign-in: load token from secure storage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await SecureStore.getItem(TOKEN_KEY);
        if (stored && mounted) {
          // restore mock user & courses for now
          setToken(stored);
          setStudent(MOCK_STUDENT);
          setCourses(MOCK_COURSES);
          try {
            router.replace("/");
          } catch {}
        } else {
          try {
            router.replace("/login");
          } catch {}
        }
      } catch {
        try {
          router.replace("/login");
        } catch {}
      } finally {
        if (mounted) setInitializing(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  const login = async (username: string, password: string, id: string) => {
    if (!username || !password || !id)
      return { ok: false, error: "Missing credentials" };
    if (id !== MOCK_STUDENT.id)
      return { ok: false, error: "Invalid student ID" };

    const t = "mock-token-" + Date.now();
    setToken(t);
    setStudent(MOCK_STUDENT);
    setCourses(MOCK_COURSES);
    try {
      await SecureStore.setItem(TOKEN_KEY, t);
    } catch {
      // ignore storage errors for mock
    }
    try {
      router.replace("/");
    } catch {
      // ignore navigation errors in environments where router isn't available
    }
    return { ok: true };
  };

  const register = async (
    username: string,
    password: string,
    id: string,
    fullName?: string
  ) => {
    if (!username || !password || !id) {
      return { ok: false, error: "Missing registration fields" };
    }
    // In this mock implementation we simply create a new Student object and persist a token.
    const newStudent: Student = {
      id: id.trim(),
      username: username.trim(),
      fullName: fullName?.trim() || username.trim(),
      status: "active",
      photoUrl: "https://placehold.co/128x128",
      cardImageUrl: "https://placehold.co/600x400",
    } as Student;

    const t = "mock-token-" + Date.now();
    setToken(t);
    setStudent(newStudent);
    setCourses([]);
    try {
      await SecureStore.setItem(TOKEN_KEY, t);
    } catch {
      // ignore
    }
    try {
      router.replace("/");
    } catch {
      // ignore
    }
    return { ok: true };
  };

  const logout = () => {
    setToken(undefined);
    setStudent(undefined);
    setCourses([]);
    try {
      SecureStore.deleteItem(TOKEN_KEY);
    } catch {}
    try {
      router.replace("/login");
    } catch {
      // ignore
    }
  };

  const refreshCourses = async () => {
    setRefreshing(true);
    try {
      // Simulate fetch delay
      await new Promise((res) => setTimeout(res, 700));
      setCourses(MOCK_COURSES);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        student,
        courses,
        register,
        login,
        logout,
        refreshCourses,
        refreshing,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

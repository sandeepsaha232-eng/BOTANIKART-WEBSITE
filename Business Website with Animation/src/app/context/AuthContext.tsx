import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS = [
  { name: "Sandeep Saha", email: "demo@botanikart.in", password: "demo123", avatar: "SS" },
  { name: "Priya Sharma", email: "priya@botanikart.in", password: "priya123", avatar: "PS" },
  { name: "Admin", email: "admin@botanikart.in", password: "admin123", avatar: "AD" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("botanikart_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("botanikart_user");
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // Check registered users from localStorage
    const registeredRaw = localStorage.getItem("botanikart_registered_users");
    const registeredUsers = registeredRaw ? JSON.parse(registeredRaw) : [];

    const allUsers = [...DEMO_USERS, ...registeredUsers];
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      const userData: User = { name: found.name, email: found.email, avatar: found.avatar };
      setUser(userData);
      localStorage.setItem("botanikart_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Try demo@botanikart.in / demo123" };
  };

  const register = (name: string, email: string, password: string) => {
    // Check if email already exists
    const registeredRaw = localStorage.getItem("botanikart_registered_users");
    const registeredUsers = registeredRaw ? JSON.parse(registeredRaw) : [];
    const allUsers = [...DEMO_USERS, ...registeredUsers];

    if (allUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" };
    }

    // Create initials for avatar
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newUser = { name, email, password, avatar: initials || "U" };
    registeredUsers.push(newUser);
    localStorage.setItem("botanikart_registered_users", JSON.stringify(registeredUsers));

    // Auto-login after register
    const userData: User = { name, email, avatar: initials || "U" };
    setUser(userData);
    localStorage.setItem("botanikart_user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("botanikart_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type StoredUser = {
  email: string;
  password: string;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);

  // load current user
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(stored);
  }, []);

  const getUsers = (): StoredUser[] => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // 🔐 LOGIN
  const login = (email: string, password: string) => {
    const users = getUsers();

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      localStorage.setItem("currentUser", email);
      setUser(email);
      return true;
    }

    return false;
  };

  // 🆕 SIGNUP
  const signup = (email: string, password: string) => {
    const users = getUsers();

    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    const updated = [...users, { email, password }];
    saveUsers(updated);

    localStorage.setItem("currentUser", email);
    setUser(email);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Auth not found");
  return ctx;
};
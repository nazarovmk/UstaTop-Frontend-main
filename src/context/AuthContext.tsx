import React, { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  uid?: string;
  token?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  currentUser: UserData | null;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const API_URL = "http://89.117.60.117:3001/api/v1";

// ❗️ Bu yerda `undefined`dan boshlaymiz
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth contextdan tashqarida chaqirildi");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🚀 LocalStorage’dan userni yuklash
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🚀 Register
  async function signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const res = await fetch(`${API_URL}/client/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Signup error:", data);
      throw new Error(data.message || "Ro'yxatdan o'tishda xatolik");
    }

    const userData = { ...data.user, token: data.token };
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  }

  // 🚀 Login
  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/client/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login javobi:", data); // Xato haqida ma'lumot
    if (!res.ok) throw new Error(data.message || "Login xatolik");

    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  }

  // 🚀 Logout
  function logout() {
    localStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

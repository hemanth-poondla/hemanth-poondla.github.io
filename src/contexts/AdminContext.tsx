import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple obfuscation for the password
const ADMIN_HASH = btoa("asdf()*");

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin session exists
    const adminSession = sessionStorage.getItem("admin_session");
    if (adminSession === ADMIN_HASH) {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (btoa(password) === ADMIN_HASH) {
      setIsAdmin(true);
      sessionStorage.setItem("admin_session", ADMIN_HASH);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("admin_session");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}

import React, { createContext, ReactNode, useContext, useState } from "react";
import { LoggedUser } from "../types";

interface AuthContextType {
  loggedUser: LoggedUser | null;
  setLoggedUser: (loggedUser: LoggedUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

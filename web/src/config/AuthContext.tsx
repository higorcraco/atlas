import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { LoggedUser } from "../types";
import { alertError } from "./Notification";

interface AuthContextType {
  loggedUser: LoggedUser | null;
  setLoggedUser: (user: LoggedUser) => void;
  signin: (username: string, password: string) => void;
  refreshToken: () => Promise<LoggedUser>;
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
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(() => {
    const username = localStorage.getItem("user");
    const acessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return username && acessToken && refreshToken
      ? { username, acessToken, refreshToken }
      : null;
  });

  const from = location.state?.from?.pathname || "/";

  const saveLoggeduser = (
    username: string,
    acessToken: string,
    refreshToken: string
  ) => {
    setLoggedUser({ username, acessToken, refreshToken });
    localStorage.setItem("user", username);
    localStorage.setItem("token", acessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const signin = (username: string, password: string) => {
    AuthService.login(username, password).then(({ data }) => {
      saveLoggeduser(data.username, data.acessToken, data.refreshToken);
      navigate(from, { replace: true });
    });
  };

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login", { replace: true });
  };

  const refreshToken = () => {
    return AuthService.refreshToken(
      loggedUser!.username!,
      loggedUser!.refreshToken!
    )
      .then(({ data }) => {
        saveLoggeduser(data.username, data.acessToken, data.refreshToken);
        return data;
      })
      .catch((error) => {
        logout();
        alertError(error);
        return Promise.reject(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ loggedUser, signin, refreshToken, setLoggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

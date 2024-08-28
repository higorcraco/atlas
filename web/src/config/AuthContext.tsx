import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { LoggedUser } from "../types";

interface AuthContextType {
  loggedUser: LoggedUser | null;
  signin: (username: string, password: string) => void;
  refreshToken: () => void;
  loadUserData: () => string | null;
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
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  const loadUserData = () => {
    console.log("useEffect AuthProvider");

    const username = localStorage.getItem("user");
    const acessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (username && acessToken && refreshToken) {
      console.log("save loggedUser");
      saveLoggeduser(username, acessToken, refreshToken);
    }

    console.log("loggedUser AuthProvider", loggedUser);
    return username;
  };

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

  const refreshToken = () => {
    AuthService.refreshToken(
      loggedUser!.username!,
      loggedUser!.refreshToken!
    ).then(({ data }) => {
      saveLoggeduser(data.username, data.acessToken, data.refreshToken);
    });
  };

  return (
    <AuthContext.Provider
      value={{ loggedUser, signin, refreshToken, loadUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

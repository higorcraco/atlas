import axios from "axios";

const API_URL = "http://localhost:8080";

type LoginResponse = {
  acessToken: string;
  refreshToken: string;
  expiration: Date;
};

const setTokens = (data: LoginResponse) => {
  localStorage.setItem("token", data.acessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const login = async (username: string, password: string) => {
  try {
    return await axios
      .post(`${API_URL}/auth/signin`, { username, password })
      .then(({ data }) => {
        setTokens(data);
        return true;
      });
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return false;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    return await axios
      .post(`${API_URL}/refresh-token`, { refreshToken })
      .then(({ data }) => {
        setTokens(data);
        return data.token;
      });
  } catch (error) {
    console.error("Erro ao fazer atualizar o token", error);
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

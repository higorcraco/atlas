import axios from "axios";
import API_BASE_URL from "../config/ApiConfig";

const resource = `${API_BASE_URL}/auth`;

type LoginResponse = {
  acessToken: string;
  refreshToken: string;
  expiration: Date;
};

const setTokens = (data: LoginResponse) => {
  localStorage.setItem("token", data.acessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const login = (username: string, password: string) => {
  try {
    return axios.post(`${resource}/signin`, { username, password });
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return Promise.reject("Erro ao fazer login: " + error);
  }
};

export const refreshToken = async (username: string, refreshToken: string) => {
  try {
    return await axios
      .put(`${resource}/refresh/${username}`, undefined, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .then(({ data }) => {
        setTokens(data);
        return data;
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

import axios from "axios";

const resource = "/auth";

export const login = (username: string, password: string) => {
  try {
    return axios.post(`${resource}/signin`, { username, password });
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return Promise.reject("Erro ao fazer login: " + error);
  }
};

export const refreshToken = (username: string, refreshToken: string) =>
  axios.put(`${resource}/refresh/${username}`, { refreshToken });

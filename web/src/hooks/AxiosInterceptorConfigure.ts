import axios from "axios";
import { useAuth } from "../config/AuthContext";

const useAxiosInterceptorConfigure = () => {
  const auth = useAuth();

  axios.interceptors.request.use((config) => {
    console.log("config.baseURL", config);
    const token = localStorage.getItem("token");
    if (token && !config.url?.includes("/auth/")) {
      console.log("adicionou header");
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken || !auth.loggedUser?.username) {
            console.log("Não foi possivel atualizar o token");
          }

          auth.refreshToken();
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${auth.loggedUser?.acessToken}`;
          return axios(originalRequest);
        } catch (error) {
          window.location.href = "/login";

          return Promise.reject(error);
        }
      }
    }
  );
};

export default useAxiosInterceptorConfigure;

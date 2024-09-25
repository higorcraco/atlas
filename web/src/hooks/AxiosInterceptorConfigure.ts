import axios from "axios";
import { useAuth } from "../config/AuthContext";

const useAxiosInterceptorConfigure = () => {
  const auth = useAuth();

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url?.includes("/auth/")) {
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

          console.log(refreshToken, auth.loggedUser);
          if (!refreshToken || !auth.loggedUser?.username) {
            console.error("Não foi possivel atualizar o token");
          }

          await auth.refreshToken();

          return await axios(originalRequest);
        } catch (error) {
          window.location.href = "/login";

          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptorConfigure;

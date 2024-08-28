import axios from "axios";
import { AuthService } from "../services";
import { useAuth } from "./AuthContext";

const useAxiosInterceptor = () => {
  const { loggedUser, setLoggedUser } = useAuth();

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
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

          if (!refreshToken || !loggedUser?.username) {
            console.log("Não foi possivel atualizar o token");
          }

          return AuthService.refreshToken(loggedUser!.username!, refreshToken!)
            .then((data) => {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.acessToken}`;
              setLoggedUser({ username: data.username });
            })
            .finally(() => axios(originalRequest));
        } catch (error) {
          window.location.href = "/login";

          return Promise.reject(error);
        }
      }
    }
  );
};

export default useAxiosInterceptor;

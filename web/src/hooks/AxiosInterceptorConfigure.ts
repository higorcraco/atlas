import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import { alertError } from "../config/Notification";

const useAxiosInterceptorConfigure = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

          auth.refreshToken();

          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${auth.loggedUser?.acessToken}`;
          return axios(originalRequest);
        } catch (error) {
          navigate(location.state?.from?.pathname || "/", { replace: true });

          return Promise.reject(error);
        }
      } else {
        alertError(error);
        console.log(error);
      }
    }
  );
};

export default useAxiosInterceptorConfigure;

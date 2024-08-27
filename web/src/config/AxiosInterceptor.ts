import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer ${token}";
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
        const newToken = localStorage.getItem("refreshToken");

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        window.location.href = "/login";

        return Promise.reject(error);
      }
    }
  }
);

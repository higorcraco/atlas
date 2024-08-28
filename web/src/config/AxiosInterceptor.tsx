import { ReactNode } from "react";
import useAxiosInterceptorConfigure from "../hooks/AxiosInterceptorConfigure";

const AxiosInterceptor: React.FC<{ children: ReactNode }> = ({ children }) => {
  useAxiosInterceptorConfigure();

  return children;
};

export default AxiosInterceptor;

import "./config/AxiosInterceptor";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./config/AuthContext";
import AxiosInterceptor from "./config/AxiosInterceptor";
import MainRoutes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor>
          <MainRoutes />
        </AxiosInterceptor>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

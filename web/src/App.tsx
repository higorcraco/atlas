import "./config/AxiosInterceptor";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "sweetalert2/dist/sweetalert2.min.css";
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

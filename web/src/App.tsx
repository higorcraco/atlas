import "./config/AxiosInterceptor";
import Login from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./config/AuthContext";
import useAxiosInterceptor from "./config/AxiosInterceptor";

function App() {
  useAxiosInterceptor();

  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;

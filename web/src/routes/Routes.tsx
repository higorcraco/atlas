import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";

const MainRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route key={"/login"} path={"/login"} element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        key={"/home"}
        path={"/home"}
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Route>
  </Routes>
);

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loggedUser, loadUserData } = useAuth();
  const location = useLocation();

  let user = loggedUser?.username;

  if (!user) {
    user = loadUserData() || "";
  }

  console.log("user", user);
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default MainRoutes;

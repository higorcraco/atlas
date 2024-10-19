import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavbarApp from "../components/Navbar";
import { useAuth } from "../config/AuthContext";
import Home from "../pages/Home";

import { lazy, Suspense } from "react";
const UsersPage = lazy(() => import("../pages/users/UsersPage"));
const Login = lazy(() => import("../pages/Login"));
const TasksPage = lazy(() => import("../pages/tasks/TasksPage"));

const privateRoutes = [
  { path: "/users", component: <UsersPage /> },
  { path: "/tasks", component: <TasksPage /> },
];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/login", component: <Login /> },
];

const MainRoutes = () => {
  const { loggedUser } = useAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          element={
            <>
              {loggedUser?.acessToken && <NavbarApp />}
              <div className="wrapper">
                <Outlet />
              </div>
            </>
          }
        >
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RequireAuth>{route.component}</RequireAuth>}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loggedUser } = useAuth();
  const location = useLocation();
  if (!loggedUser?.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default MainRoutes;

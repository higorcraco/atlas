import { Container } from "react-bootstrap";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import TasksPage from "../pages/tasks/TasksPage";
import UsersPage from "../pages/users/UsersPage";

const privateRoutes = [
  { path: "/home", component: <Home /> },
  { path: "/users", component: <UsersPage /> },
  { path: "/tasks", component: <TasksPage /> },
];

const MainRoutes = () => (
  <Routes>
    <Route
      element={
        <Container
          fluid
          style={{ width: "1024px" }}
          className="justify-content-center"
        >
          <Outlet />
        </Container>
      }
    >
      <Route key={"/login"} path={"/login"} element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RequireAuth>{route.component}</RequireAuth>}
        />
      ))}
    </Route>
  </Routes>
);

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loggedUser } = useAuth();
  const location = useLocation();
  if (!loggedUser?.username) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default MainRoutes;

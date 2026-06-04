import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";

import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import LeaveRequests from "../pages/LeaveRequests";
import Reports from "../pages/Reports";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";

const routes = {
  "/": {
    component: Dashboard,
    roles: [
      "CEO",
      "HR",
      "DIVISIONAL_HEAD",
      "MANAGER",
      "EXECUTIVE",
      "EMPLOYEE",
    ],
  },

  "/users": {
    component: Users,
    roles: [
      "CEO",
      "HR",
      "DIVISIONAL_HEAD",
    ],
  },

  "/departments": {
    component: Departments,
    roles: [
      "CEO",
    ],
  },

  "/tasks": {
    component: Tasks,
    roles: [
      "CEO",
      "DIVISIONAL_HEAD",
      "MANAGER",
      "EXECUTIVE",
      "EMPLOYEE",
    ],
  },

  "/reports": {
    component: Reports,
    roles: [
      "CEO",
      "HR",
      "DIVISIONAL_HEAD",
      "MANAGER",
    ],
  },

  "/leave-requests": {
    component: LeaveRequests,
    roles: [
      "CEO",
      "HR",
      "DIVISIONAL_HEAD",
      "MANAGER",
      "EXECUTIVE",
      "EMPLOYEE",
    ],
  },
};

function AppRoutes() {
  const [currentPath, setCurrentPath] = useState(
      window.location.pathname
  );

  const route =
      routes[currentPath] ||
      routes["/"];

  const Page =
      route.component;

  useEffect(() => {
    const handlePopState = () =>
        setCurrentPath(
            window.location.pathname
        );

    window.addEventListener(
        "popstate",
        handlePopState
    );

    return () =>
        window.removeEventListener(
            "popstate",
            handlePopState
        );
  }, []);

  const navigate = (path) => {
    window.history.pushState(
        {},
        "",
        path
    );

    setCurrentPath(path);
  };

  return (
      <ProtectedRoute>
        <div className="app-shell">
          <Sidebar
              currentPath={currentPath}
              onNavigate={navigate}
          />

          <main className="main-panel">
            <Navbar />

            <ProtectedRoute
                allowedRoles={
                  route.roles
                }
            >
              <Page />
            </ProtectedRoute>
          </main>
        </div>
      </ProtectedRoute>
  );
}

export default AppRoutes;
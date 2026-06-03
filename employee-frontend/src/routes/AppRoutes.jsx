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
  "/": Dashboard,
  "/users": Users,
  "/departments": Departments,
  "/tasks": Tasks,
  "/reports": Reports,
  "/leave-requests": LeaveRequests,
};

function AppRoutes() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const Page = routes[currentPath] || Dashboard;

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <ProtectedRoute>
      <div className="app-shell">
        <Sidebar currentPath={currentPath} onNavigate={navigate} />
        <main className="main-panel">
          <Navbar />
          <Page />
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default AppRoutes;

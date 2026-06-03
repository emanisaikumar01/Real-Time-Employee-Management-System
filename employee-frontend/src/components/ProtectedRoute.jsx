import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
}

export default ProtectedRoute;

import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";

function ProtectedRoute({
                          children,
                          allowedRoles = [],
                        }) {
  const {
    isAuthenticated,
    user,
  } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(
          user?.roleName
      )
  ) {
    return (
        <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
        >
          <h2>Access Denied</h2>

          <p>
            You do not have
            permission to access
            this page.
          </p>
        </div>
    );
  }

  return children;
}

export default ProtectedRoute;
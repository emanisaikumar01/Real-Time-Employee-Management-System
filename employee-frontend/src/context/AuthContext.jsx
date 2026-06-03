import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContextValue";
import { login as loginRequest } from "../services/authService";

const storedUser = () => {
  const value = localStorage.getItem("employee_user");
  return value ? JSON.parse(value) : null;
};

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("employee_token"));
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    if (token) {
      localStorage.setItem("employee_token", token);
    } else {
      localStorage.removeItem("employee_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("employee_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("employee_user");
    }
  }, [user]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      user,
        async login(credentials) {

            const data = await loginRequest(credentials);

            setToken("local-session");

            setUser(data);
        },
      logout() {
        setToken(null);
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };

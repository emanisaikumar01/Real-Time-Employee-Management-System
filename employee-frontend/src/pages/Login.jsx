import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCredentials((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(credentials);
    } catch (requestError) {
      console.error(requestError);
      setError("Login failed. Check your credentials and API connection.");
    }
  };

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome to Thrisul</p>
        <h1>Sign in</h1>
        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={credentials.email}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={credentials.password}
          />
        </label>
        {error && <p className="notice">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;

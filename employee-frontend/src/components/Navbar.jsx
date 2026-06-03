import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Thrisul</p>
        <h1>Your companion in success</h1>
      </div>
      <div className="navbar-actions">
        <span>{user?.name || user?.email || "Admin User"}</span>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;

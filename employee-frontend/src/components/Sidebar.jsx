import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

function Sidebar({ currentPath, onNavigate }) {

    const { user } = useAuth();

    const role = user?.roleName;

    let navItems = [];

    switch (role) {

        case "CEO":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Users", path: "/users" },
                { label: "Departments", path: "/departments" },
                { label: "Tasks", path: "/tasks" },
                { label: "Reports", path: "/reports" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Notice Board", path: "/notice-board" },
                { label: "Meetings", path: "/meetings" },
            ];
            break;

        case "HR":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Users", path: "/users" },
                { label: "Reports", path: "/reports" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Notice Board", path: "/notice-board" },
                { label: "Meetings", path: "/meetings" },
            ];
            break;

        case "DIVISIONAL_HEAD":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Users", path: "/users" },
                { label: "Tasks", path: "/tasks" },
                { label: "Reports", path: "/reports" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Meetings", path: "/meetings" },
                { label: "Notice Board", path: "/notice-board" },
            ];
            break;

        case "MANAGER":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Tasks", path: "/tasks" },
                { label: "Reports", path: "/reports" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Meetings", path: "/meetings" },
                { label: "Notice Board", path: "/notice-board" },
            ];
            break;

        case "EXECUTIVE":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Tasks", path: "/tasks" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Meetings", path: "/meetings" },
                { label: "Notice Board", path: "/notice-board" },
            ];
            break;

        case "EMPLOYEE":
            navItems = [
                { label: "Dashboard", path: "/" },
                { label: "Tasks", path: "/tasks" },
                { label: "Leave Requests", path: "/leave-requests" },
                { label: "Meetings", path: "/meetings" },
                { label: "Notice Board", path: "/notice-board" },
            ];
            break;

        default:
            navItems = [
                { label: "Dashboard", path: "/" },
            ];
    }

    return (
        <aside className="sidebar">
            <div className="brand">
                <img src={logo} alt="EMS" />
                <span>Welcome</span>
            </div>

            <div
                style={{
                    padding: "15px",
                    borderBottom: "1px solid #333",
                    marginBottom: "15px",
                }}
            >
                <h4>{user?.name}</h4>
                <small>{user?.roleName}</small>
            </div>

            <nav>
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        type="button"
                        className={
                            currentPath === item.path
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            onNavigate(item.path)
                        }
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
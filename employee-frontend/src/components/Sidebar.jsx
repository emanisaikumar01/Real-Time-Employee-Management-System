import logo from "../assets/logo.png";

function Sidebar({ currentPath, onNavigate }) {

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    let navItems = [
        {
            label: "Dashboard",
            path: "/",
        },
    ];

    if (role === "CEO") {
        navItems = [
            { label: "Dashboard", path: "/" },
            { label: "Users", path: "/users" },
            { label: "Departments", path: "/departments" },
            { label: "Tasks", path: "/tasks" },
            { label: "Reports", path: "/reports" },
            {
                label: "Leave Requests",
                path: "/leave-requests",
            },
        ];
    }

    else if (role === "MANAGER") {
        navItems = [
            { label: "Dashboard", path: "/" },
            { label: "Users", path: "/users" },
            { label: "Tasks", path: "/tasks" },
            { label: "Reports", path: "/reports" },
            {
                label: "Leave Requests",
                path: "/leave-requests",
            },
        ];
    }

    else if (role === "DIVISIONAL_HEAD") {
        navItems = [
            { label: "Dashboard", path: "/" },
            { label: "Tasks", path: "/tasks" },
            { label: "Reports", path: "/reports" },
            {
                label: "Leave Requests",
                path: "/leave-requests",
            },
        ];
    }

    else if (role === "EXECUTIVE") {
        navItems = [
            { label: "Dashboard", path: "/" },
            { label: "Tasks", path: "/tasks" },
            { label: "Reports", path: "/reports" },
        ];
    }

    else if (role === "EMPLOYEE") {
        navItems = [
            { label: "Dashboard", path: "/" },
            { label: "Tasks", path: "/tasks" },
            {
                label: "Leave Requests",
                path: "/leave-requests",
            },
        ];
    }

    return (
        <aside className="sidebar">
            <div className="brand">
                <img src={logo} alt="EMS" />
                <span> Welcome</span>
            </div>

            <div
                style={{
                    padding: "15px",
                    borderBottom: "1px solid #333",
                    marginBottom: "15px",
                }}
            >
                <h4>{user?.name}</h4>

                <small>
                    {user?.roleName}
                </small>
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
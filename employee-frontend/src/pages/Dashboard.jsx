import { useEffect, useState } from "react";
import {
    getDashboardStats,
    getEmployeeDashboard
} from "../services/reportService";
import { useAuth } from "../hooks/useAuth";

const fallbackStats = {
    users: 0,
    departments: 0,
    tasks: 0,
    leaveRequests: 0,
};

function Dashboard() {

    const [stats, setStats] = useState(fallbackStats);

    const { user } = useAuth();

    const role = user?.roleName;

    const isCEO = role === "CEO";

    const isHR = role === "HR";

    const isManager =
        role === "MANAGER" ||
        role === "DIVISIONAL_HEAD";

    const isEmployee =
        role === "EMPLOYEE" ||
        role === "EXECUTIVE";

    useEffect(() => {

        if (!user) return;

        if (isEmployee) {

            getEmployeeDashboard(user.id)
                .then((data) => {

                    setStats({
                        users: 0,
                        departments: 0,
                        tasks: data.myTasks || 0,
                        leaveRequests: data.myLeaves || 0,
                    });

                })
                .catch(console.error);

        } else {

            getDashboardStats()
                .then((data) => {

                    setStats({
                        users: data.users || 0,
                        departments: data.departments || 0,
                        tasks: data.tasks || 0,
                        leaveRequests: data.leaveRequests || 0,
                    });

                })
                .catch(console.error);

        }

    }, [user, role]);

    if (isEmployee) {
        return (
            <section className="page-section">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">Overview</p>
                        <h2>My Dashboard</h2>
                    </div>
                </div>

                <div className="stat-grid">

                    <article>
                        <span>{stats.tasks}</span>
                        <p>My Tasks</p>
                    </article>

                    <article>
                        <span>{stats.leaveRequests}</span>
                        <p>My Leave Requests</p>
                    </article>

                </div>

            </section>
        );
    }

    if (isHR) {
        return (
            <section className="page-section">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">Overview</p>
                        <h2>HR Dashboard</h2>
                    </div>
                </div>

                <div className="stat-grid">

                    <article>
                        <span>{stats.users}</span>
                        <p>Employees</p>
                    </article>

                    <article>
                        <span>{stats.leaveRequests}</span>
                        <p>Leave Requests</p>
                    </article>

                </div>

            </section>
        );
    }

    if (isManager) {
        return (
            <section className="page-section">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">Overview</p>
                        <h2>Management Dashboard</h2>
                    </div>
                </div>

                <div className="stat-grid">

                    <article>
                        <span>{stats.tasks}</span>
                        <p>Tasks</p>
                    </article>

                    <article>
                        <span>{stats.leaveRequests}</span>
                        <p>Leave Requests</p>
                    </article>

                </div>

            </section>
        );
    }

    if (isCEO) {
        return (
            <section className="page-section">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">Overview</p>
                        <h2>CEO Dashboard</h2>
                    </div>
                </div>

                <div className="stat-grid">

                    <article>
                        <span>{stats.users}</span>
                        <p>Employees</p>
                    </article>

                    <article>
                        <span>{stats.departments}</span>
                        <p>Departments</p>
                    </article>

                    <article>
                        <span>{stats.tasks}</span>
                        <p>Tasks</p>
                    </article>

                    <article>
                        <span>{stats.leaveRequests}</span>
                        <p>Leave Requests</p>
                    </article>

                </div>

            </section>
        );
    }

    return null;
}

export default Dashboard;
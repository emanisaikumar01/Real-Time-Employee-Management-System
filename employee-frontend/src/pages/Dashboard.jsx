import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/reportService";

const fallbackStats = {
  users: 0,
  departments: 0,
  tasks: 0,
  leaveRequests: 0,
};

function Dashboard() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats({ ...fallbackStats, ...data }))
      .catch(() => setStats(fallbackStats));
  }, []);

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
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

export default Dashboard;

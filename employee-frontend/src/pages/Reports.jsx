import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports()
      .then((data) => setReports(Array.isArray(data) ? data : data.content || []))
      .catch(() => setReports([]));
  }, []);

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Insights</p>
          <h2>Reports</h2>
        </div>
        <button type="button">Export</button>
      </div>
      <div className="table-list">
        {reports.map((report) => (
          <article key={report.id || report.title}>
            <strong>{report.title || report.name}</strong>
            <span>{report.createdAt || report.date || "No date"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reports;

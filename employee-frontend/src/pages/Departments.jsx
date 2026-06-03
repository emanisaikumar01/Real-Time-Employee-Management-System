import { useEffect, useState } from "react";
import { getDepartments } from "../services/userService";

function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments()
      .then((data) => setDepartments(Array.isArray(data) ? data : data.content || []))
      .catch(() => setDepartments([]));
  }, []);

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Organization</p>
          <h2>Departments</h2>
        </div>
        <button type="button">Add Department</button>
      </div>
      <div className="table-list">
        {departments.map((department) => (
          <article key={department.id || department.name}>
            <strong>{department.name}</strong>
            <span>{department.employeeCount || 0} employees</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Departments;

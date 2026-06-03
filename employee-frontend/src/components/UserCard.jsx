function UserCard({ user, onEdit, onDelete, onAssignTask }) {
    return (
        <article className="card">
            <div className="card-header">
                <div>
                    <h3>{user.name || "Unnamed Employee"}</h3>
                    <p>{user.email || "No email added"}</p>
                </div>

                <span className="pill">
          {user.roleName || "Employee"}
        </span>
            </div>

            <dl className="meta-grid">
                <div>
                    <dt>Department</dt>
                    <dd>{user.departmentName || "Unassigned"}</dd>
                </div>

                <div>
                    <dt>Status</dt>
                    <dd>Active</dd>
                </div>
            </dl>

            <div className="card-actions">
                <button onClick={() => onEdit(user)}>
                    Edit
                </button>

                <button onClick={() => onDelete(user.id)}>
                    Delete
                </button>

                <button onClick={() => onAssignTask(user)}>
                    Assign Task
                </button>
            </div>
        </article>
    );
}

export default UserCard;
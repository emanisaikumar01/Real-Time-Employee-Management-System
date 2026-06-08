function TaskCard({
                      task,
                      onEdit,
                      onDelete,
                      onMarkComplete,
                  }) {

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    const canManageTask =
        role === "CEO" ||

        (role === "DIVISIONAL_HEAD" &&
            task.assignedToName !== "Tharuni") ||

        (role === "MANAGER" &&
            task.assignedToName !== "Tharuni" &&
            task.assignedToName !== "Rohit");

    return (
        <article className="card">

            <div className="card-header">

                <div>

                    <h3>
                        {task.title || "Untitled Task"}
                    </h3>

                    <p>
                        {task.description ||
                            "No description provided"}
                    </p>

                </div>

                <span className="pill">
                    {task.status || "PENDING"}
                </span>

            </div>

            <dl className="meta-grid">

                <div>

                    <dt>Assignee</dt>

                    <dd>
                        {task.assignedToName ||
                            "Unassigned"}
                    </dd>

                </div>

                <div>

                    <dt>Due</dt>

                    <dd>
                        {task.dueDate || "Not set"}
                    </dd>

                </div>

            </dl>

            <div className="card-actions">

                {canManageTask &&
                    task.status !== "COMPLETED" && (
                        <>
                            <button
                                onClick={() =>
                                    onEdit(task)
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    onDelete(task.id)
                                }
                            >
                                Delete
                            </button>
                        </>
                    )}

                {task.status !== "COMPLETED" &&
                    Number(task.assignedToId) === Number(user.id) && (
                        <button
                            onClick={() =>
                                onMarkComplete(task.id)
                            }
                        >
                            Mark Complete
                        </button>
                    )}

            </div>

        </article>
    );
}

export default TaskCard;
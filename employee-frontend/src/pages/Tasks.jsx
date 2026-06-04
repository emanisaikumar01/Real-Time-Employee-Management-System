import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import {
    getTasks,
    deleteTask,
    updateTaskStatus
} from "../services/taskService";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    const loadTasks = async () => {
        try {

            const data = await getTasks();

            let taskList = Array.isArray(data)
                ? data
                : data.content || [];

            if (
                role === "EMPLOYEE" ||
                role === "EXECUTIVE"
            ) {

                taskList = taskList.filter(
                    (task) =>
                        task.assignedToId === user.id
                );
            }

            setTasks(taskList);

        } catch (error) {
            console.error(error);
            setTasks([]);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            loadTasks();

        } catch (error) {

            console.error(error);
            alert("Failed to delete task");
        }
    };

    const handleEdit = (task) => {

        console.log(
            "Edit Task:",
            task
        );

        alert(
            "Edit feature coming next"
        );
    };

    const handleMarkComplete = async (id) => {

        try {

            await updateTaskStatus(
                id,
                "COMPLETED"
            );

            loadTasks();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update task"
            );
        }
    };

    return (
        <section className="page-section">

            <div className="section-header">

                <div>
                    <p className="eyebrow">
                        Work
                    </p>

                    <h2>
                        Tasks
                    </h2>
                </div>

                {(role === "CEO" ||
                    role === "MANAGER" ||
                    role === "DIVISIONAL_HEAD") && (
                    <button type="button">
                        Create Task
                    </button>
                )}

            </div>

            {tasks.length === 0 ? (

                <div
                    style={{
                        textAlign: "center",
                        padding: "40px",
                    }}
                >
                    <h3>No Tasks Assigned</h3>

                    <p>
                        You currently do not have any assigned tasks.
                    </p>
                </div>

            ) : (

                <div className="card-grid">

                    {tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onMarkComplete={handleMarkComplete}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default Tasks;
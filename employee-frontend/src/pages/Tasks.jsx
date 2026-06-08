import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import {
    getTasks,
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTask
} from "../services/taskService";
import { getUsers } from "../services/userService";

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        assignedToId: "",
        dueDate: "",
    });

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;
    const assignableUsers = users.filter((u) => {

        if (role === "CEO") {
            return u.id !== user.id;
        }

        if (role === "DIVISIONAL_HEAD") {
            return (
                u.roleName === "MANAGER" ||
                u.roleName === "EXECUTIVE" ||
                u.roleName === "EMPLOYEE"
            );
        }

        if (role === "MANAGER") {
            return (
                u.roleName === "EXECUTIVE" ||
                u.roleName === "EMPLOYEE"
            );
        }

        if (role === "HR") {
            return (
                u.roleName === "EXECUTIVE" ||
                u.roleName === "EMPLOYEE"
            );
        }

        return false;
    });

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
                        Number(task.assignedToId) ===
                        Number(user?.id)
                );
            }
            console.log(taskList);

            setTasks(taskList);

        } catch (error) {

            console.error(error);

            setTasks([]);
        }
    };

    const loadUsers = async () => {

        try {

            const response = await getUsers();

            const list = Array.isArray(response)
                ? response
                : response.data || [];

            setUsers(list);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        loadTasks();
        loadUsers();

    }, []);

    const handleCreateTask = async () => {

        if (
            !taskData.title ||
            !taskData.description ||
            !taskData.assignedToId ||
            !taskData.dueDate
        ) {

            alert("Please fill all fields");
            return;
        }
        console.log("Logged User:", user);
        console.log("Tasks:", tasks);

        try {

            if (editingTask) {

                await updateTask(
                    editingTask.id,
                    {
                        title: taskData.title,
                        description: taskData.description,
                        assignedToId: Number(taskData.assignedToId),
                        dueDate: taskData.dueDate,
                    }
                );

                alert("Task Updated Successfully");

            } else {

                await createTask({
                    title: taskData.title,
                    description: taskData.description,
                    assignedToId: Number(taskData.assignedToId),
                    assignedById: Number(user.id),
                    dueDate: taskData.dueDate,
                });

                alert("Task Created Successfully");
            }

            setTaskData({
                title: "",
                description: "",
                assignedToId: "",
                dueDate: "",
            });

            setEditingTask(null);

            setShowForm(false);

            await loadTasks();

        } catch (error) {

            console.error(error);

            alert(
                editingTask
                    ? "Failed to update task"
                    : "Failed to create task"
            );
        }
    };

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            await loadTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to delete task");
        }
    };

    const handleEdit = (task) => {

        setEditingTask(task);

        setTaskData({
            title: task.title,
            description: task.description,
            assignedToId: task.assignedToId,
            dueDate: task.dueDate,
        });

        setShowForm(true);
    };

    const handleMarkComplete = async (id) => {

        try {

            await updateTaskStatus(
                id,
                "COMPLETED"
            );

            await loadTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to update task");
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
                    role === "HR" ||
                    role === "MANAGER" ||
                    role === "DIVISIONAL_HEAD") && (

                    <button
                        type="button"
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >
                        Create Task
                    </button>

                )}

            </div>

            {showForm && (

                <div className="card">

                    <h3>
                        {editingTask
                            ? "Edit Task"
                            : "Create Task"}
                    </h3>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                title: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Task Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                description:
                                e.target.value,
                            })
                        }
                    />

                    <select
                        value={taskData.assignedToId}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                assignedToId:
                                e.target.value,
                            })
                        }
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {assignableUsers.map((u) => (

                            <option
                                key={u.id}
                                value={u.id}
                            >
                                {u.name} (
                                {u.roleName}
                                )
                            </option>

                        ))}

                    </select>

                    <input
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                dueDate:
                                e.target.value,
                            })
                        }
                    />

                    <button onClick={handleCreateTask}>
                        {editingTask
                            ? "Update Task"
                            : "Assign Task"}
                    </button>

                </div>

            )}

            {tasks.length === 0 ? (

                <div
                    style={{
                        textAlign: "center",
                        padding: "40px",
                    }}
                >
                    <h3>
                        No Tasks Assigned
                    </h3>

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
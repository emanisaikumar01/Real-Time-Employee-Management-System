import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import {
    getUsers,
    createUser,
    deleteUser
} from "../services/userService";
import { createTask } from "../services/taskService";
import { permissions } from "../utils/permissions";
import { useAuth } from "../hooks/useAuth";

function Users() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        roleId: 4,
        departmentId: null
    });

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const { user: currentUser } = useAuth();

    const role = currentUser?.roleName;

    const canManageUsers =
        permissions[role]?.hireEmployee;

    const canAssignTasks =
        permissions[role]?.assignTask;

    const canViewUsers =
        permissions[role]?.users;

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUsers(
                    Array.isArray(data)
                        ? data
                        : data.content || []
                );
                setError("");
            })
            .catch((requestError) => {
                console.error(requestError);
                setError(
                    "Unable to load users from the API."
                );
            });
    }, []);

    const handleCreateUser = async () => {

        try {

            const createdUser =
                await createUser(newUser);

            setUsers((prev) => [
                ...prev,
                createdUser
            ]);

            setShowAddForm(false);

            setNewUser({
                name: "",
                email: "",
                password: "",
                roleId: 4,
                departmentId: null
            });

        } catch (error) {

            console.error(error);

            alert("Failed to create user");
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {

            await deleteUser(id);

            setUsers((prev) =>
                prev.filter(
                    (user) => user.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Failed to delete user");
        }
    };

    const handleEdit = (user) => {

        console.log(
            "Edit user",
            user
        );
    };

    const handleAssignTask = (user) => {

        if (!canAssignTasks) {
            return;
        }

        setSelectedUser(user);

        setShowTaskForm(true);
    };

    const submitTask = async () => {

        try {

            await createTask({
                title: taskData.title,
                description:
                taskData.description,
                dueDate: taskData.dueDate,
                status: "PENDING",

                assignedToId:
                selectedUser.id,

                assignedById:
                currentUser.id
            });

            alert("Task Assigned");

            setShowTaskForm(false);

            setTaskData({
                title: "",
                description: "",
                dueDate: ""
            });

        } catch (error) {

            console.error(error);

            alert(
                "Failed to assign task"
            );
        }
    };

    if (!canViewUsers) {

        return (
            <section className="page-section">
                <h2>Access Denied</h2>

                <p>
                    You do not have permission
                    to view users.
                </p>
            </section>
        );
    }

    return (
        <section className="page-section">

            <div className="section-header">

                <div>
                    <p className="eyebrow">
                        Directory
                    </p>

                    <h2>Users</h2>
                </div>

                {
                    canManageUsers && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowAddForm(true)
                            }
                        >
                            Add User
                        </button>
                    )
                }

            </div>

            {error && (
                <p className="notice">
                    {error}
                </p>
            )}

            {
                showAddForm && (
                    <div className="card">

                        <h3>
                            Create User
                        </h3>

                        <input
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    name:
                                    e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email:
                                    e.target.value
                                })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password:
                                    e.target.value
                                })
                            }
                        />

                        <button
                            onClick={
                                handleCreateUser
                            }
                        >
                            Save User
                        </button>

                    </div>
                )
            }

            {
                showTaskForm && (
                    <div className="card">

                        <h3>
                            Assign Task To{" "}
                            {
                                selectedUser?.name
                            }
                        </h3>

                        <input
                            placeholder="Task Title"
                            value={
                                taskData.title
                            }
                            onChange={(e) =>
                                setTaskData({
                                    ...taskData,
                                    title:
                                    e.target.value
                                })
                            }
                        />

                        <textarea
                            placeholder="Description"
                            value={
                                taskData.description
                            }
                            onChange={(e) =>
                                setTaskData({
                                    ...taskData,
                                    description:
                                    e.target.value
                                })
                            }
                        />

                        <input
                            type="date"
                            value={
                                taskData.dueDate
                            }
                            onChange={(e) =>
                                setTaskData({
                                    ...taskData,
                                    dueDate:
                                    e.target.value
                                })
                            }
                        />

                        <button
                            onClick={
                                submitTask
                            }
                        >
                            Assign Task
                        </button>

                    </div>
                )
            }

            <div className="card-grid">

                {users.map((user) => (

                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAssignTask={
                            handleAssignTask
                        }
                        canManageUsers={
                            canManageUsers
                        }
                        canAssignTasks={
                            canAssignTasks
                        }
                    />

                ))}

            </div>

        </section>
    );
}

export default Users;
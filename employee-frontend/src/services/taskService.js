import api from "./api";

export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data;
}

export async function createTask(task) {
  const response = await api.post(
      "/tasks",
      task
  );

  return response.data;
}

export async function deleteTask(id) {
  return await api.delete(
      `/tasks/${id}`
  );
}

export async function updateTaskStatus(
    id,
    status
) {
  const response = await api.put(
      `/tasks/${id}/status?status=${status}`
  );

  return response.data;
}
import api from "./api";

export async function getReports() {
  const response = await api.get("/reports");
  return response.data;
}

export async function createReport(reportData) {
  const response = await api.post(
      "/reports",
      reportData
  );

  return response.data;
}

export async function deleteReport(id) {
  const response = await api.delete(
      `/reports/${id}`
  );

  return response.data;
}

export async function getDashboardStats() {
  const response = await api.get("/dashboard");
  return response.data;
}

export async function getEmployeeDashboard(userId) {
  const response = await api.get(
      `/dashboard/employee/${userId}`
  );

  return response.data;
}
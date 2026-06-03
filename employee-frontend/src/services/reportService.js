import api from "./api";

export async function getReports() {
  const response = await api.get("/reports");
  return response.data;
}

export async function getDashboardStats() {
  const response = await api.get("/dashboard");
  return response.data;
}

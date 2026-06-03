import api from "./api";

export async function login(credentials) {
  const response = await api.post("/users/login", credentials);
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/me");
  return response.data;
}

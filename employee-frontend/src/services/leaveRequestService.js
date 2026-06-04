import api from "./api";

export const getLeaveRequests = () =>
    api.get("/leave-requests");

export const createLeaveRequest = (data) =>
    api.post("/leave-requests", data);

export const updateLeaveStatus = (id, status) =>
    api.patch(
        `/leave-requests/${id}/status?status=${status}`
    );
import api from "./api";

export const getLeaveRequests = async () => {
    const response =
        await api.get("/leave-requests");

    return response.data;
};

export const createLeaveRequest = async (
    data
) => {
    const response =
        await api.post(
            "/leave-requests",
            data
        );

    return response.data;
};

export const updateLeaveStatus = async (
    id,
    status
) => {
    const response =
        await api.patch(
            `/leave-requests/${id}/status?status=${status}`
        );

    return response.data;
};
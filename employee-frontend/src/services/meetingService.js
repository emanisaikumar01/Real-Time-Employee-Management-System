import api from "./api";

export const getMeetings = () =>
    api.get("/meetings");

export const createMeeting = (data) =>
    api.post("/meetings", data);

export const deleteMeeting = (id) =>
    api.delete(`/meetings/${id}`);
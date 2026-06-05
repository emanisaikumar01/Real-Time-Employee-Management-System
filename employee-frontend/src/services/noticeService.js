import api from "./api";

export const getNotices = () =>
    api.get("/notices");

export const createNotice = (data) =>
    api.post("/notices", data);
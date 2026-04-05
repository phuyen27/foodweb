import axiosClient from "../../api/axiosClient";

export const registerApi = (data) => axiosClient.post("/auth/register", data);

export const loginApi = (data) => axiosClient.post("/auth/login", data);
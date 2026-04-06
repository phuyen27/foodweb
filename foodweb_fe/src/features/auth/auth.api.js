import axiosClient from "../../api/axiosClient";

export const registerApi = (data) => 
    axiosClient.post("/auth/register", data);

export const loginApi = (data) => 
    axiosClient.post("/auth/login", data);

export const updateProfileApi = (data) => 
    axiosClient.put("/auth/update-profile", data);

export const changePasswordApi = (data) => 
    axiosClient.put("/auth/change-password", data);
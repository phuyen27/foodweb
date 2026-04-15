import axiosClient from "../../api/axiosClient";

export const getPreferenceApi = async () => 
    axiosClient.get("/preferences");

export const savePreferenceApi = async (data) =>
    axiosClient.post("/preferences", data);

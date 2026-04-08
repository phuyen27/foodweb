import axiosClient from "../../api/axiosClient";

export const getFavoriteListApi = () =>
    axiosClient.get("/favorites");

export const addFavoriteApi = (foodId) =>
    axiosClient.post(`/favorites/${foodId}`);

export const removeFavoriteApi = (foodId) =>
    axiosClient.delete(`/favorites/${foodId}`);
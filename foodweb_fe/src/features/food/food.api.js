import axiosClient from "../../api/axiosClient";

export const getFoodListApi = () =>
    axiosClient.get("/foods");

export const getFoodDetailApi = (id) =>
    axiosClient.get(`/foods/${id}`);

export const getFoodBySearchApi = (keyword) =>
    axiosClient.get("/foods/search", { params: { keyword } });

export const getFoodCategoriesApi = (category) =>
    axiosClient.get("/foods/by-category", { params: { category } });
import axiosClient from "../../api/axiosClient";

export const getMealPlanApi = (date) => {
    return axiosClient.get("/meal-plans", {
        params: { date }
    });
}

export const addMealItemApi = (data) => {
    return axiosClient.post("/meal-plans/items", data);
}

export const deleteMealItemApi = (itemId) => {
    return axiosClient.delete(`/meal-plans/items/${itemId}`);
}

export const updateMealItemApi = (itemId, data) => {
    return axiosClient.put(`/meal-plans/items/${itemId}`, data);
}
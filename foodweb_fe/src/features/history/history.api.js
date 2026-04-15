import axiosClient from "../../api/axiosClient";

export const addHistoryApi =
  (foodId, action) =>
    axiosClient.post(
      `/history/${foodId}`,
      null,
      {
        params: { action }
      }
    );

export const getHistoryApi =
  () => axiosClient.get("/history");
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { getMealPlanApi, addMealItemApi,deleteMealItemApi,updateMealItemApi } from "./meal.api";

export const getMealPlan = createAsyncThunk(
    "meal/getMealPlan",
    async (date, { rejectWithValue }) => {  
        try {
            const response = await getMealPlanApi(date);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch meal plan");
        }
    }
);

export const addMealItem = createAsyncThunk(
    "meal/addMealItem",
    async (data, { rejectWithValue }) => {
        try {
            const response = await addMealItemApi(data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add meal item");
        }   
    }
);

export const deleteMealItem = createAsyncThunk(
    "meal/deleteMealItem",
    async (itemId, { rejectWithValue }) => {
        try {
            await deleteMealItemApi(itemId);
            return itemId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete meal item");
        }
    }
);

export const updateMealItem = createAsyncThunk(
    "meal/updateMealItem",
    async ({ itemId, data }, { rejectWithValue }) => {
        try {
            const response = await updateMealItemApi(itemId, data);
            return itemId,data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update meal item");
        }
    }
);

const mealSlice = createSlice({
    name: "meal",
    initialState: {
        mealPlan: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getMealPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMealPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.mealPlan = action.payload;
        })
        .addCase(getMealPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(addMealItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addMealItem.fulfilled, (state, action) => {
            state.loading = false;
           
        })
        .addCase(addMealItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(deleteMealItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteMealItem.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(deleteMealItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(updateMealItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateMealItem.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(updateMealItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default mealSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getFoodDetailApi,
    getFoodListApi,
    getFoodBySearchApi,
    getFoodCategoriesApi
 } from "./food.api";

 export const getFoodList = createAsyncThunk(
    "food/getFoodList",
     async (_, { rejectWithValue }) => {
        try {
            const res = await getFoodListApi();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch food list");
        }   
});

export const getFoodDetail = createAsyncThunk(
    "food/getFoodDetail",
     async (id, { rejectWithValue }) => {
        try {
            const res = await getFoodDetailApi(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch food detail");
        }
});

export const searchFood = createAsyncThunk(
    "food/searchFood",
    async (searchTerm, { rejectWithValue }) => {
        try {
            const res = await getFoodBySearchApi(searchTerm);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to search food");
        }
    }
);

export const getFoodCategory = createAsyncThunk(
    "food/getFoodCategory",
    async (category, { rejectWithValue }) => {
        try {
            const res = await getFoodCategoriesApi(category);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch food category");
        }
    }
);


//SLICE

const foodSlice = createSlice({
    name: "food",
    initialState: {
        foodList: [],
        foodDetail: null,
        searchResults: [],
        categoryResults: [],
        status: false,
        error: null
    },
    reducers: {
        clearFoodDetail: (state) => {
            state.foodDetail = null;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoodList.pending, (state) => {
                state.status = true;
                state.error = null;
            })
            .addCase(getFoodList.fulfilled, (state, action) => {
                state.status = false;
                state.foodList = action.payload;
            })
            .addCase(getFoodList.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload|| action.error.message;
            })

            //get food detail
            .addCase(getFoodDetail.pending, (state) => {
                state.status = true;
                state.error = null;
            })
            .addCase(getFoodDetail.fulfilled, (state, action) => {
                state.status = false;
                state.foodDetail = action.payload;
            })
            .addCase(getFoodDetail.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload || action.error.message;
            })

            //search food by keyword
            .addCase(searchFood.pending, (state) => {
                state.status = true;
                state.error = null;
            })
            .addCase(searchFood.fulfilled, (state, action) => {
                state.status = false;
                state.searchResults = action.payload;
            })
            .addCase(searchFood.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload || action.error.message;
            })

            //get food by category
            .addCase(getFoodCategory.pending, (state) => {
                state.status = true;
                state.error = null;
            })
            .addCase(getFoodCategory.fulfilled, (state, action) => {
                state.status = false;
                state.categoryResults = action.payload;
            })
            .addCase(getFoodCategory.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload ||action.error.message;
            }); 
    }
});

export const {
  clearFoodDetail,
  clearSearchResults
} = foodSlice.actions;

export default foodSlice.reducer;
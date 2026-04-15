import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import { getPreferenceApi, savePreferenceApi } from "./preference.api";

export const getPreference = createAsyncThunk(
    "preference/getPreference",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await getPreferenceApi(userId);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch preference");
        }
    }
);

export const savePreference = createAsyncThunk(
    "preference/savePreference",
    async (data, { rejectWithValue }) => {
        try {
            const res = await savePreferenceApi(data);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to save preference");
        }
    }
);

const preferenceSlice = createSlice({
    name: "preference",
    initialState: {
        preference: null,
        status: "false",
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {

    builder

      /* GET */

      .addCase(getPreference.pending, (state) => {

        state.status = true;

      })

      .addCase(getPreference.fulfilled, (state, action) => {

        state.status = false;

        state.preference =
          action.payload;

      })

      .addCase(getPreference.rejected, (state, action) => {

        state.status = false;

        state.error =
          action.payload;

      })

      /* SAVE */

      .addCase(savePreference.fulfilled, (state, action) => {

        state.preference =
          action.payload;

      });

  }

});

export default preferenceSlice.reducer;
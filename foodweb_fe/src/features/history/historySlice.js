import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  addHistoryApi,
  getHistoryApi
} from "./history.api";

/* GET */

export const getHistory =
  createAsyncThunk(
    "history/getHistory",
    async (_, { rejectWithValue }) => {

      try {

        const res =
          await getHistoryApi();

        return res.data;

      } catch (err) {

        return rejectWithValue(
          err.response?.data
        );

      }

    }
  );

/* ADD */

export const addHistory =
  createAsyncThunk(
    "history/addHistory",
    async (
      { foodId, action },
      { rejectWithValue }
    ) => {

      try {

        const res =
          await addHistoryApi(
            foodId,
            action
          );

        return res.data;

      } catch (err) {

        return rejectWithValue(
          err.response?.data
        );

      }

    }
  );

const historySlice = createSlice({

  name: "history",

  initialState: {
    history: [],
    loading: false
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        getHistory.fulfilled,
        (state, action) => {

          state.history =
            action.payload;

        }
      )

      .addCase(
        addHistory.fulfilled,
        (state, action) => {

          state.history.unshift(
            action.payload
          );

        });

  }

});

export default historySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoriteListApi, addFavoriteApi, removeFavoriteApi } from './favorite.api';

// GET LIST
export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getFavoriteListApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch favorite list'
      );
    }
  }
);

// ADD
export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async (foodId, { dispatch, rejectWithValue }) => {
    try {
      await addFavoriteApi(foodId);
      dispatch(getFavorites());
      return foodId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to favorite'
      );
    }
  }
);

// REMOVE
export const removeFavorite = createAsyncThunk(
  'favorite/removeFavorite',
  async (foodId, { dispatch, rejectWithValue }) => {
    try {
      await removeFavoriteApi(foodId);
      dispatch(getFavorites());
      return foodId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove from favorite'
      );
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteList = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (!state.favoriteList.some(item => String(item?.id || item) === String(action.payload))) {
          state.favoriteList.push({ id: action.payload });
        }
      })

      // REMOVE
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteList = state.favoriteList.filter(
          (item) => String(item?.id || item) !== String(action.payload)
        );
      });
  },
});

export default favoriteSlice.reducer;
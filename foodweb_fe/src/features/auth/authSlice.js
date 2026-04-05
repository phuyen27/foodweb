import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi, loginApi } from "./auth.api";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    const res = await registerApi(userData);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    const res = await loginApi(userData);
    Cookies.set("token", res.data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        token: Cookies.get("token") || null, 
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, 
        loading: false, 
        error: null 
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            Cookies.remove("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state, action) => { 
        state.status = "succeeded";  
       })
      .addCase(registerUser.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action) => { 
        state.status = "succeeded"; 
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
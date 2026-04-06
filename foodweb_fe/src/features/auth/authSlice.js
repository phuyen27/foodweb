import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  registerApi, 
  loginApi, 
  updateProfileApi, 
  changePasswordApi 
} from "./auth.api";

import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const res = await registerApi(userData);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const res = await loginApi(userData);

    Cookies.set("token", res.data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data) => {
    const res = await updateProfileApi(data);

    localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data) => {
    const res = await changePasswordApi(data);

    
    if (res.data.token) {
      Cookies.set("token", res.data.token, { expires: 7 });
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
    }

    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: { 
    token: Cookies.get("token") || null, 
    user: localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")) 
        : null, 
    status: "idle",
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

      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },

});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
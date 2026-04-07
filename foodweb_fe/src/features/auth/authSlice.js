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
  async (userData, { rejectWithValue }) => {
    try {
      const res = await loginApi(userData);

      Cookies.set("token", res.data.token, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (error) {
       return rejectWithValue(error.response?.data?.message || "Login failed");
    }
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
  async (data, { rejectWithValue }) => {

    try {

      const res = await changePasswordApi(data);

    
      if (res.data.token) {

        Cookies.set("token", res.data.token, {
          expires: 7
        });

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

      }

      return res.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message
        || "Password change failed"
      );

    }

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

  registerStatus: "idle",
  registerError: null,

  loginStatus: "idle",
  loginError: null,

  profileStatus: "idle",
  profileError: null,

  passwordStatus: "idle",
  passwordError: null,
    error: null 
  },

  reducers: {

    resetPasswordStatus: (state) => {
    state.passwordStatus = "idle";
    state.passwordError = null;
    },

    resetProfileStatus: (state) => {
      state.profileStatus = "idle";
      state.profileError = null;
    },

    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
      state.loginError = null;
    },

    resetRegisterStatus: (state) => {
      state.registerStatus = "idle";
      state.registerError = null;
    },

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
        state.registerStatus = "loading";
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = "succeeded";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload || action.error.message;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.message;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.profileStatus = "loading";
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.profileError = action.error.message;
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        state.passwordStatus = "loading";
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordStatus = "succeeded";

        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.passwordStatus = "failed";
        state.passwordError = action.payload || action.error.message;
      });

  },

});

export const { logout,
  resetRegisterStatus,
  resetLoginStatus,
  resetProfileStatus,
  resetPasswordStatus
  } = authSlice.actions;

export default authSlice.reducer;
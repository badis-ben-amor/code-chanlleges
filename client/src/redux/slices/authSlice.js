import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, login, refresh, logout } from "../../services/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await login({ email, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credential, thunkAPI) => {
    try {
      const res = await register(credential);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refresh();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await logout();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //m
    isSuccess: false,
    isError: false,
    message: "",
    //
    accessToken: null,
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isRejected: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        // state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.accessToken = action.payload.newAccessToken;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../services/profileService";
import { refresh } from "../../services/authService";

export const fetchUserProfileThunk = createAsyncThunk(
  "user/fetchUserProfile",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getProfile(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await getProfile(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    isSuccess: false,
    isRejected: false,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isRejected = true;
      });
  },
});

export const { logout, isAuth } = userSlice.actions;
export default userSlice.reducer;

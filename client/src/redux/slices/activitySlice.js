import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivity } from "../../services/activityService";
import { refresh } from "../../services/authService";

export const getActivityThunk = createAsyncThunk(
  "activity/getActivity",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getActivity(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const anotherGetActivity = await getActivity(newAccessToken);
          return anotherGetActivity.data;
        }
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Error feching activity:("
        );
      }
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activity: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builde) => {
    builde
      .addCase(getActivityThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivityThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activity = action.payload;
      })
      .addCase(getActivityThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default activitySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "../../services/leaderboardService";
import { refresh } from "../../services/authService";

export const getLeaderboardThunk = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getLeaderboard(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryResponse = await getLeaderboard(newAccessToken);
          return retryResponse.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    leaderboard: [],
    isLoading: false,
    isError: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaderboardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboard = action.payload.leaderboard;
      })
      .addCase(getLeaderboardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";

// export const fetchLeaderboard = createAsyncThunk(
//   "leaderboard/fetchLeaderboard",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get("/api/leaderboard");
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data);
//     }
//   }
// );

// const leaderboardSlice = createSlice({
//   name: "leaderboard",
//   initialState: {
//     leaderboard: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeaderboard.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchLeaderboard.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.leaderboard = action.payload;
//       })
//       .addCase(fetchLeaderboard.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default leaderboardSlice.reducer;

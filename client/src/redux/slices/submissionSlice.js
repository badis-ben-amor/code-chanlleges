import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitSolution } from "../../services/submissionService";
import { refresh } from "../../services/authService";

export const submitSolutionThunk = createAsyncThunk(
  "submission/submit",
  async ({ accessToken, challengeId, selectedOption }, thunkAPI) => {
    try {
      const res = await submitSolution({
        accessToken,
        challengeId,
        selectedOption,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await submitSolution({
            accessToken: newAccessToken,
            challengeId,
            selectedOption,
          });
          return retryRes.data;
        }
      }
      thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    isLoading: false,
    error: null,
    userChoise: null,
    isCorrect: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSolutionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitSolutionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCorrect = action.payload.isCorrect;
      })
      .addCase(submitSolutionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default submissionSlice.reducer;

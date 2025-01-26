import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOneChallengeAdmin,
  deleteChallengeAdmin,
  fetchAllChallengesAdmin,
  updateChallengeAdmin,
} from "../../../services/admin/adminChallegeService";
import { refresh } from "../../../services/authService";

export const fetchAllChallengesAdminThunk = createAsyncThunk(
  "adminChallenge/fetchAllChallenges",
  async (accessToken, thunkAPI) => {
    try {
      const res = await fetchAllChallengesAdmin(accessToken);
      return res;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh(accessToken);
        if (newAccessToken) {
          const retryRes = await fetchAllChallengesAdmin(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createOneChallengeAdminThunk = createAsyncThunk(
  "adminChallenge/createOneChallenge",
  async ({ challengeData, accessToken }, thunkAPI) => {
    try {
      const res = await createOneChallengeAdmin({ challengeData, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await createOneChallengeAdmin({
            challengeData,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateChallengeAdminThunk = createAsyncThunk(
  "adminchallenge/updateChallenge",
  async ({ challengeId, challengeData, accessToken }, thunkAPI) => {
    try {
      const res = await updateChallengeAdmin({
        challengeId,
        challengeData,
        accessToken,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status == 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await updateChallengeAdmin({
            challengeData,
            challengeId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }

      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteChallengeAdminThunk = createAsyncThunk(
  "adminChallenge/deleteChallenge",
  async ({ challengeId, accessToken }, thunkAPI) => {
    try {
      const res = await deleteChallengeAdmin({ challengeId, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await deleteChallengeAdmin({
            challengeId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const adminChallengeSlice = createSlice({
  name: "adminChallenge",
  initialState: {
    challenges: [],
    challenge: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChallengesAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllChallengesAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(fetchAllChallengesAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createOneChallengeAdminThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createOneChallengeAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenge = action.payload;
      })
      .addCase(createOneChallengeAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateChallengeAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChallengeAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenge = action.payload;
      })
      .addCase(updateChallengeAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteChallengeAdminThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteChallengeAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteChallengeAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminChallengeSlice.reducer;

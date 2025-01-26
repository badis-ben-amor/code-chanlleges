import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllChallenges,
  getOneChallenge,
} from "../../services/challengeService";

export const getAllChallengesThunk = createAsyncThunk(
  "challenge/getChallengs",
  async (_, thunkAPI) => {
    try {
      const res = await getAllChallenges();
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getOneChallengeThunk = createAsyncThunk(
  "/challenge/getOneChallenge",
  async (challengeId, thunkAPI) => {
    try {
      const res = await getOneChallenge(challengeId);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const challengeSlice = createSlice({
  name: "challenge",
  initialState: {
    challenges: [],
    challenge: {},
    isLoding: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChallengesThunk.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllChallengesThunk.fulfilled, (state, action) => {
        state.isLoding = false;
        state.challenges = action.payload;
      })
      .addCase(getAllChallengesThunk.rejected, (state, action) => {
        state.isLoding = false;
        state.error = action.payload;
      })
      .addCase(getOneChallengeThunk.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getOneChallengeThunk.fulfilled, (state, action) => {
        state.isLoding = false;
        state.challenge = action.payload;
      })
      .addCase(getOneChallengeThunk.rejected, (state, action) => {
        state.isLoding = false;
        state.error = action.payload;
      });
  },
});

export default challengeSlice.reducer;

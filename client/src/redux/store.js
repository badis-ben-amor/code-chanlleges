import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import challengeReducer from "./slices/challengeSlice";
import submissionReducer from "./slices/submissionSlice";
import adminChallengeReducer from "./slices/admin/adminChallengeSlice";
import adminUserReducer from "./slices/admin/adminUserSlice";
import leaderboardReducer from "./slices/leaderboardSlice";
import activityReducer from "./slices/activitySlice";

const store = configureStore({
  reducer: {
    // public
    auth: authReducer,
    challenge: challengeReducer,
    // user
    user: userReducer,
    submission: submissionReducer,
    leaderboard: leaderboardReducer,
    activity: activityReducer,
    // admin
    adminChallenge: adminChallengeReducer,
    adminUser: adminUserReducer,
  },
});

export default store;

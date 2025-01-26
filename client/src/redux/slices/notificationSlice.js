import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    message: [],
  },
  reducers: {
    addNotification: (state, action),
  },
});

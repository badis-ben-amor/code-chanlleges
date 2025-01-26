import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUserAdmin,
  getOneUserAdmin,
  createUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
} from "../../../services/admin/adminUserService";
import { refresh } from "../../../services/authService";

export const getAllUserAdminThunk = createAsyncThunk(
  "adminUser/getAllUser",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getAllUserAdmin(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await getAllUserAdmin(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getOneUserAdminThunk = createAsyncThunk(
  "adminUser/getOneUser",
  async ({ userId, accessToken }, thunkAPI) => {
    try {
      const res = await getOneUserAdmin(userId, accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await getOneUserAdmin(userId, newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createUserAdminThunk = createAsyncThunk(
  "adminUser/createUser",
  async ({ userData, accessToken }, thunkAPI) => {
    try {
      const res = await createUserAdmin(userData, accessToken);
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await createUserAdmin(userData, newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateUserAdminThunk = createAsyncThunk(
  "adminUser/updateUser",
  async ({ userData, userId, accessToken }, thunkAPI) => {
    try {
      const res = await updateUserAdmin(userData, userId, accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await updateUserAdmin(
            userData,
            userId,
            newAccessToken
          );
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteUserAdminThunk = createAsyncThunk(
  "adminUser/deleteUser",
  async ({ userId, accessToken }, thunkAPI) => {
    try {
      const res = await deleteUserAdmin(userId, accessToken);
    } catch (error) {
      if (error.response?.status === 403) {
        const { newAccessToken } = await refresh();
        if (newAccessToken) {
          const retryRes = await deleteUserAdmin(userId, newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUserAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOneUserAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneUserAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getOneUserAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUserAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUserAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUserAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminUserSlice.reducer;

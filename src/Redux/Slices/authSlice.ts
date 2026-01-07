import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthSlice } from "../../Interfaces/Iuser";
import { loginApi, signupApi } from "../../Apis/AuthApi";

// ===> Thunks
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    try {
      const res = await loginApi(data);
      if (res.data?.accessToken) {
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
      }
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (data: any, thunkAPI) => {
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ===> auth slice
const inialState: IAuthSlice = {
  token: null,
  status: "idle",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: inialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      AsyncStorage.setItem("accessToken", action.payload);
    },
    logoutUser: (state) => {
      state.token = null;
      AsyncStorage.removeItem("accessToken");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.status = "succeeded";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })
      // Signup
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { setToken, logoutUser, setLoading, setError } = authSlice.actions;
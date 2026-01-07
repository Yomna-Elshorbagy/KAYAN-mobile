import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthSlice } from "../../Interfaces/Iuser";

// ===> auth slice
const inialState: IAuthSlice = {
  token: null,
  status: "idle",
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: inialState,
  reducers: {
    setToken: (state, action : PayloadAction<string>) => {
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
});

export default authSlice.reducer;
export const { setToken, logoutUser, setLoading, setError } = authSlice.actions;
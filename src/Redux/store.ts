import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "./Slices/authSlice";
import productsSlice from "./Slices/productsSlice";
import wishlistSlice from './Slices/wishlistSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    wishlist: wishlistSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

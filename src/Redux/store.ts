import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "./Slices/authSlice";
import productsSlice from "./Slices/productsSlice";
import wishlistSlice from "./Slices/wishlistSlice";
import cartSlice from "./Slices/cartSlice";
import reviewsSlice from "./Slices/reviewsSlice";
import orderSlice from "./Slices/orderSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    review: reviewsSlice,
    order: orderSlice,
    user: userSlice
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

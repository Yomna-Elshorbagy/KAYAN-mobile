import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../Apis/CartApis";
import { CartState } from "../../Interfaces/ICart";

const initialState: CartState = {
  cart: null,
  noOfCartItems: 0,
  noOfProducts: 0,
  isLoading: false,
  error: null,
};

// ================= THUNKS =================

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getCart();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/add",
  async (
    { productId, quantity }: { productId: string; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      return await addToCart(productId, quantity);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (productId: string, { rejectWithValue }) => {
    try {
      return await removeFromCart(productId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await clearCart();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await updateCartQuantity(productId, quantity);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SLICE =================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
        state.noOfCartItems = action.payload.noOfCartItems;
        state.noOfProducts = action.payload.noOfProducts;
      })

      // Add
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.noOfCartItems = action.payload.noOfCartItems;
        state.noOfProducts = action.payload.noOfProducts;
      })

      // Remove
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.noOfCartItems = action.payload.noOfCartItems;
        state.noOfProducts = action.payload.noOfProducts;
      })

      // Clear
      .addCase(clearCartItems.fulfilled, (state) => {
        state.cart = null;
        state.noOfCartItems = 0;
        state.noOfProducts = 0;
      })

      // Update quantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.noOfCartItems = action.payload.noOfCartItems;
        state.noOfProducts = action.payload.noOfProducts;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;

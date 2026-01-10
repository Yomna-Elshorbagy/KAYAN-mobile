import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, clearWishlist, getWishlist, removeFromWishlist } from "../../Apis/WishlistApis";
import { WishlistState } from "../../Interfaces/IWishlist";


const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

// ================= Thunks =================

// ===> Get wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getWishlist();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> Add product
export const addWishlistItem = createAsyncThunk(
  "wishlist/add",
  async (productId: string, { rejectWithValue }) => {
    try {
      return await addToWishlist(productId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> Remove product
export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId: string, { rejectWithValue }) => {
    try {
      return await removeFromWishlist(productId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> Clear wishlist
export const clearWishlistItems = createAsyncThunk(
  "wishlist/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await clearWishlist();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= Slice =================

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // Remove
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // Clear
      .addCase(clearWishlistItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;

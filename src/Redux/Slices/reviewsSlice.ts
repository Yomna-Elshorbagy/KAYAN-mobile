import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewAPI from "./../../Apis/ReviewsApis";
import { ReviewsState } from "../../Interfaces/IReviews";

const initialState: ReviewsState = {
  reviews: [],
  productReviews: [],
  isLoading: false,
  error: null,
};

// ================= THUNKS =================

// User
export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async (_, thunkAPI) => {
    try {
      return await reviewAPI.getUserReviews();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId: string, thunkAPI) => {
    try {
      return await reviewAPI.getProductReviews(productId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createOrUpdateReview = createAsyncThunk(
  "reviews/createOrUpdateReview",
  async (
    {
      product,
      rate,
      comment,
    }: { product: string; rate: number; comment: string },
    thunkAPI
  ) => {
    try {
      return await reviewAPI.addReview(product, rate, comment);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Admin
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAllReviews",
  async (query: string = "", thunkAPI) => {
    try {
      return await reviewAPI.getAllReviews(query);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const adminSoftDeleteReview = createAsyncThunk(
  "reviews/adminSoftDeleteReview",
  async (reviewId: string, thunkAPI) => {
    try {
      return await reviewAPI.softDeleteReview(reviewId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SLICE =================

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.productReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Reviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Product Reviews
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.productReviews = action.payload.data;
      })

      // Fetch All Reviews (Admin)
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.data;
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;

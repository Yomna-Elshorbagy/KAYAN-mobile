import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  getCategoryById,
  getCategoryStats,
  getTrendingCategories,
} from "../../Apis/CategoriesApis";

interface CategoryState {
  categories: any[];
  selectedCategory: any | null;
  trending: any[];
  stats: any | null;
  loading: boolean;
  error: string | null;
  metadata: any;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  trending: [],
  stats: null,
  loading: false,
  error: null,
  metadata: null,
};

// ==============================
// Thunks
// ==============================

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (params: any, { rejectWithValue }) => {
    try {
      return await getCategories(params);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getCategoryById(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchTrendingCategories = createAsyncThunk(
  "categories/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      return await getTrendingCategories();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchCategoryStats = createAsyncThunk(
  "categories/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoryStats();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> Slice

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload.data;
      })

      // Trending
      .addCase(fetchTrendingCategories.fulfilled, (state, action) => {
        state.trending = action.payload.data;
      })

      // Stats
      .addCase(fetchCategoryStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      });
  },
});

export const { clearSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

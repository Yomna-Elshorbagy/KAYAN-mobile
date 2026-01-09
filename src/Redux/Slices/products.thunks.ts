import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getLowStockProducts,
  getProductById,
  getProducts,
  getRelatedProducts,
  getTopSellingProducts,
  getTrendingProducts,
  updateProduct,
} from "../../Apis/ProductsApi";

/* ===================== GET ALL ===================== */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      page,
      size,
      search,
      category,
    }: {
      page?: number;
      size?: number;
      search?: string;
      category?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await getProducts(page, size, search, category);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== GET BY ID ===================== */
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== CREATE ===================== */
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await addProduct(formData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== UPDATE ===================== */
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (
    { id, formData }: { id: string; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      return await updateProduct(id, formData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== DELETE ===================== */
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== TRENDING ===================== */
export const fetchTrendingProducts = createAsyncThunk(
  "products/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      return await getTrendingProducts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== RELATED ===================== */
export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelated",
  async (productId: string, { rejectWithValue }) => {
    try {
      return await getRelatedProducts(productId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== LOW STOCK ===================== */
export const fetchLowStockProducts = createAsyncThunk(
  "products/fetchLowStock",
  async (threshold: number | undefined, { rejectWithValue }) => {
    try {
      return await getLowStockProducts(threshold);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== TOP SELLING ===================== */
export const fetchTopSellingProducts = createAsyncThunk(
  "products/fetchTopSelling",
  async (_, { rejectWithValue }) => {
    try {
      return await getTopSellingProducts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

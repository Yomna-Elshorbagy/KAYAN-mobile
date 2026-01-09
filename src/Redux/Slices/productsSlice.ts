import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  editProduct,
  removeProduct,
  fetchTrendingProducts,
  fetchRelatedProducts,
  fetchLowStockProducts,
  fetchTopSellingProducts,
} from "./products.thunks";
import { IProduct } from "../../Interfaces/Iproducts";

interface ProductsState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  trending: IProduct[];
  related: IProduct[];
  lowStock: IProduct[];
  topSelling: IProduct[];
  loading: boolean;
  error: string | null;
  metadata: any;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  trending: [],
  related: [],
  lowStock: [],
  topSelling: [],
  loading: false,
  error: null,
  metadata: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===================== GET ALL ===================== */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===================== GET BY ID ===================== */
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      /* ===================== CREATE ===================== */
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      /* ===================== UPDATE ===================== */
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })

      /* ===================== DELETE ===================== */
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      })

      /* ===================== TRENDING ===================== */
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.trending = action.payload;
      })

      /* ===================== RELATED ===================== */
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.related = action.payload;
      })

      /* ===================== LOW STOCK ===================== */
      .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
        state.lowStock = action.payload;
      })

      /* ===================== TOP SELLING ===================== */
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        state.topSelling = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

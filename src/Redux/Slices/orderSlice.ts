import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as OrderAPI from "../../Apis/OrderApis";
import { OrderState } from "../../Interfaces/IOrder";

const initialState: OrderState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

// ================= THUNKS =================

// ==> 1- Get User Orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await OrderAPI.getUserOrders();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> 2- Get Order Details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await OrderAPI.getOrderDetails(orderId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ===> 3- Create Order
export const createNewOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      return await OrderAPI.createOrder(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
// ===> 4- Create Order With Location
export const createOrderWithLocationThunk = createAsyncThunk(
  "orders/createOrderWithLocation",
  async (
    payload: {
      fullName: string;
      phone: string;
      address?: string;
      location?: {
        latitude: number;
        longitude: number;
        description?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      return await OrderAPI.createOrderWithLocation(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SLICE =================

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Order
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      // ================= CREATE ORDER WITH LOCATION =================
      .addCase(createOrderWithLocationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderWithLocationThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.orders.unshift(action.payload.data);
        }
      })
      .addCase(createOrderWithLocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;

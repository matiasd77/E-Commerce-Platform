import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminOrderService, Order, UpdateOrderStatusRequest } from '../../services/adminOrderService';

interface AdminOrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminOrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const fetchAllOrders = createAsyncThunk(
  'adminOrders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await adminOrderService.getAllOrders();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'adminOrders/fetchOrderById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await adminOrderService.getOrderById(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ id, data }: { id: number; data: UpdateOrderStatusRequest }, { rejectWithValue }) => {
    try {
      return await adminOrderService.updateOrderStatus(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder } = adminOrderSlice.actions;
export default adminOrderSlice.reducer; 
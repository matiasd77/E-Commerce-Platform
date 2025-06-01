import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminProductService, Product, CreateProductRequest, UpdateProductRequest, UpdateStockRequest } from '../../services/adminProductService';

interface AdminProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  'adminProducts/addProduct',
  async (data: CreateProductRequest, { rejectWithValue }) => {
    try {
      return await adminProductService.addProduct(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'adminProducts/updateProduct',
  async ({ id, data }: { id: number; data: UpdateProductRequest }, { rejectWithValue }) => {
    try {
      return await adminProductService.updateProduct(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      await adminProductService.deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStock = createAsyncThunk(
  'adminProducts/updateStock',
  async ({ id, data }: { id: number; data: UpdateStockRequest }, { rejectWithValue }) => {
    try {
      return await adminProductService.updateStock(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Stock
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStock.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProduct } = adminProductSlice.actions;
export default adminProductSlice.reducer; 
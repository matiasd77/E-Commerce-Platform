import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminCategoryService, Category, CreateCategoryRequest } from '../../services/adminCategoryService';

interface AdminCategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const addCategory = createAsyncThunk(
  'adminCategories/addCategory',
  async (data: CreateCategoryRequest, { rejectWithValue }) => {
    try {
      return await adminCategoryService.addCategory(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  'adminCategories/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await adminCategoryService.getAllCategories();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminCategorySlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch All Categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCategorySlice.reducer; 
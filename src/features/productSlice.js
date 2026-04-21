import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8081/products";

// 🔥 Fetch Products with Pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 0, size = 5 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}?page=${page}&size=${size}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch products ❌");
    }
  }
);

// 🔥 Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, product);
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to add product ❌");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalPages: 0,     // 🔥 NEW
    currentPage: 0     // 🔥 NEW
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 FETCH LOADING
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ FETCH SUCCESS
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 IMPORTANT FIX
        state.items = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
      })

      // ❌ FETCH ERROR
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 ADD LOADING
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })

      // ✅ ADD SUCCESS
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      // ❌ ADD ERROR
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
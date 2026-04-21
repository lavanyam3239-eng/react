import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, createProduct } from "../services/productService";

// 🔥 FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      return await getProducts(page, size);
    } catch (error) {
      return rejectWithValue("Failed to fetch products ❌");
    }
  }
);

// 🔥 ADD PRODUCT
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      return await createProduct(product);
    } catch (error) {
      return rejectWithValue("Failed to add product ❌");
    }
  }
);

// 🔥 SLICE
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 0
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
        state.items = action.payload.content || [];
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.number || 0;
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
        state.items.unshift(action.payload); // add new product at top
      })

      // ❌ ADD ERROR
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// 🔥 VERY IMPORTANT (FIX YOUR ERROR)
export default productSlice.reducer;
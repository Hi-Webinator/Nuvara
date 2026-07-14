import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// The API endpoint is configurable via env; falls back to the public demo API
// so the app renders out of the box. `VITE_API_KEY` is kept for backwards
// compatibility with existing deployments.
const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_KEY ||
  "https://fakestoreapi.com/products";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get(API_URL);
    return data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error?.message || "Failed to load products";
      });
  },
});

export const productReducer = productSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "../services/api/productsApi";

const initialState = {
  products: [],
  categories: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        const { products, categoryList } = action.payload;
        state.products = products;
        state.categories = categoryList;
      },
    );
  },
});

export default productSlice.reducer;

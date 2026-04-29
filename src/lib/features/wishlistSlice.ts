import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wishlistApi } from "../services/api/wishlistApi";

// interface User {
//   id: string;
//   phoneNumber: string;
//   fullName?: string;
//   email?: string;
//   addresses:[]
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean; // Track initial auth check
// }

const initialState = {
  wishlistProducts: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      wishlistApi.endpoints.getWishlistProducts.matchFulfilled,
      (state, action) => {
        state.wishlistProducts = action.payload.wishlistProducts;
      },
    );
  },
});

export default wishlistSlice.reducer;

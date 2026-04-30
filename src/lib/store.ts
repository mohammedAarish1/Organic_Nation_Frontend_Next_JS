import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/api/productsApi";
import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/authSlice";
import wishlistReducer from "./features/wishlistSlice";
import productsReducer from "./features/productSlice";
import { cartApi } from "./services/api/cartApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/api/authApi";
import { ordersApi } from "./services/api/ordersApi";
import { wishlistApi } from "./services/api/wishlistApi";
import { reviewsApi } from "./services/api/reviewsApi";
import { contactUsApi } from "./services/api/contactUsApi";
// ... other reducers

export const makeStore = () => {
  return configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [ordersApi.reducerPath]: ordersApi.reducer,
      [wishlistApi.reducerPath]: wishlistApi.reducer,
      [reviewsApi.reducerPath]: reviewsApi.reducer,
      [contactUsApi.reducerPath]: contactUsApi.reducer,
      products: productsReducer,
      cart: cartReducer,
      auth: authReducer,
      wishlist: wishlistReducer,
      //   auth: authReducer,
      // ... other reducers
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productsApi.middleware)
        .concat(cartApi.middleware)
        .concat(authApi.middleware)
        .concat(ordersApi.middleware)
        .concat(wishlistApi.middleware)
        .concat(reviewsApi.middleware)
        .concat(contactUsApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Enable refetchOnFocus and refetchOnReconnect behaviors
// setupListeners(store.dispatch);

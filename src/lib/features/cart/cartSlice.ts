// // src/features/cart/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { cartApi } from '../../services/api/cartApi';

// // Local storage utilities
// const CART_STORAGE_KEY = 'cart';

// //  Check if we're in browser before accessing localStorage
// const isBrowser = typeof window !== 'undefined';
// interface FilterState {
//   isCartNotificationVisible: boolean;
// }

// const loadLocalCart = () => {
//   //  Return empty array if not in browser (SSR)
//   if (!isBrowser) {
//     return [];
//   }

//   try {
//     const cartData = localStorage.getItem(CART_STORAGE_KEY);
//     return cartData ? JSON.parse(cartData) : [];
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     return [];
//   }
// };

// const saveLocalCart = (cart: any[]) => {
//   // ✅ Only save if in browser
//   if (!isBrowser) return;

//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// const clearLocalCart = () => {
//   //  Only clear if in browser
//   if (!isBrowser) return;

//   try {
//     localStorage.removeItem(CART_STORAGE_KEY);
//   } catch (error) {
//     console.error('Error clearing cart from localStorage:', error);
//   }
// };

// const initialState = {
//   // Single source of truth for cart items (with full product details)
//   cartItems: [], // For guest users, loaded from localStorage

//   // UI states
//   loading: false,
//   error: null as string | null,

//   // Computed values (will be updated from API or calculated)
//   totalCartItems: 0,
//   totalCartAmount: 0,
//   totalTax: 0,

//   // Discount & coupon
//   couponCodeApplied: [],
//   discountProgress: {},

//   // Track if user is guest
//   isGuestCart: true,

//   // For showing cart notification when add a new item
//   isCartNotificationVisible:false
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {

//     // === INITIALIZE CART FROM LOCALSTORAGE (call on client mount) ===
//     initializeCartFromStorage: (state) => {
//       if (isBrowser) {
//         const localCart = loadLocalCart();
//         state.cartItems = localCart;
//         state.totalCartItems = localCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
//       }
//     },

// // === FOR HIDE/SHOW CARTNOTIFICATION
//      showCartNotification: (state) => {
//       state.isCartNotificationVisible = true;
//     },

//     hideCartNotification: (state) => {
//       state.isCartNotificationVisible = false;
//     },

//     // === LOCAL CART ACTIONS (for guest users) ===

//     addToLocalCart: (state, action) => {
//       const { productId, quantity, productName } = action.payload;
//       const existingItem = state.cartItems.find(item => item.productName === productName);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.cartItems.push({
//           productId,
//           quantity,
//           productName,
//           // Product details will be fetched separately
//         });
//       }

//       saveLocalCart(state.cartItems);
//       state.couponCodeApplied = [];

//       // Update total count
//       state.totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     },

//     updateLocalCartQty: (state, action) => {
//       const { productName, type } = action.payload;

//       const item = state.cartItems.find(item => item.productName === productName);

//       if (item) {
//         if (type === 'increase') {
//           item.quantity += 1;
//         } else if (type === 'decrease') {
//           item.quantity = Math.max(item.quantity - 1, 1);
//         }
//       }

//       saveLocalCart(state.cartItems);
//       state.couponCodeApplied = [];
//       state.totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     },

//     removeFromLocalCart: (state, action) => {
//       const productName = action.payload;
//       state.cartItems = state.cartItems.filter(item => item.productName !== productName);

//       saveLocalCart(state.cartItems);
//       state.couponCodeApplied = [];
//       state.totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     },

//     clearLocalCartState: (state) => {
//       state.cartItems = [];
//       state.couponCodeApplied = [];
//       state.totalCartItems = 0;
//       state.totalCartAmount = 0;
//       state.totalTax = 0;
//       state.discountProgress = {};

//       clearLocalCart();
//     },

//     // Update cart with full product details (for guest users after fetching)
//     updateLocalCartDetails: (state, action) => {
//       const { productDetails, totals } = action.payload;

//       // Merge product details with existing cart items
//       state.cartItems = state.cartItems.map(item => {
//         const details = productDetails.find(p => p.productName === item.productName);
//         return details ? { ...item, ...details } : item;
//       });

//       state.totalCartAmount = totals?.finalAmount || 0;
//       state.totalTax = totals?.totalTax || 0;
//       state.discountProgress = totals || {};
//       state.totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     },

//     // Switch between guest and logged-in cart
//     setCartMode: (state, action) => {
//       state.isGuestCart = action.payload;
//     },

//     // Sync server cart to local state (after login or fetch)
//     syncServerCart: (state, action) => {
//       const { items, totalCartAmount, totalTax, couponCodeApplied, discountProgress } = action.payload;

//       state.cartItems = items;
//       state.totalCartAmount = totalCartAmount;
//       state.totalTax = totalTax;
//       state.couponCodeApplied = couponCodeApplied;
//       state.discountProgress = discountProgress || {};
//       state.totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
//       state.isGuestCart = false;

//       // Clear localStorage when syncing with server
//       clearLocalCart();
//     },
//   },

//   extraReducers: (builder) => {
//     // Listen to RTK Query cache updates for logged-in users
//     builder
//       .addMatcher(
//         cartApi.endpoints.getCart.matchFulfilled,
//         (state, action) => {
//           const { items, totalCartAmount, totalTax, couponCodeApplied, discountProgress } = action.payload;

//           state.cartItems = items;
//           state.totalCartAmount = totalCartAmount;
//           state.totalTax = totalTax;
//           state.couponCodeApplied = couponCodeApplied;
//           state.discountProgress = discountProgress;
//           state.totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
//           state.loading = false;
//           state.isGuestCart = false;
//         }
//       )
//       .addMatcher(
//         cartApi.endpoints.getCart.matchPending,
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         cartApi.endpoints.getCart.matchRejected,
//         (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         }
//       )
//       // Handle cart details fetch (for guest users)
//       .addMatcher(
//         cartApi.endpoints.getCartDetails.matchFulfilled,
//         (state, action) => {
//             const { productDetails, totals } = action.payload;
//           // Merge product details with existing cart
//          const updatedData= state.cartItems.map(item => {
//             const details = productDetails.find(p => p['name-url'] === item.productName);
//             return details ? { ...item, ...details } : item;
//           });

//           state.cartItems=updatedData

//           state.totalCartAmount = totals?.finalAmount || 0;
//           state.totalTax = totals?.totalTax || 0;
//           state.discountProgress = totals || {};
//           state.totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
//           state.loading = false;
//         }
//       );
//   },
// });

// export const {
//   addToLocalCart,
//   updateLocalCartQty,
//   removeFromLocalCart,
//   clearLocalCartState,
//   updateLocalCartDetails,
//   setCartMode,
//   syncServerCart,
//   showCartNotification,
//   hideCartNotification,
// } = cartSlice.actions;

// // Selectors
// export const selectCartItems = (state) => state.cart.cartItems;
// export const selectTotalCartItems = (state) => state.cart.totalCartItems;
// export const selectTotalCartAmount = (state) => state.cart.totalCartAmount;
// export const selectTotalTax = (state) => state.cart.totalTax;
// export const selectCouponCodeApplied = (state) => state.cart.couponCodeApplied;
// export const selectDiscountProgress = (state) => state.cart.discountProgress;
// export const selectIsGuestCart = (state) => state.cart.isGuestCart;
// export const selectCartLoading = (state) => state.cart.loading;
// export const selectCartError = (state) => state.cart.error;

// export default cartSlice.reducer;

// src/lib/features/cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "@/lib/services/api/cartApi";

// Local storage utilities with SSR check
const CART_STORAGE_KEY = "cart";

// ✅ FIXED: Check if we're in browser before accessing localStorage
const isBrowser = typeof window !== "undefined";

export const loadLocalCart = () => {
  // ✅ Return empty array if not in browser (SSR)
  if (!isBrowser) {
    return [];
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveLocalCart = (cart: any[]) => {
  // ✅ Only save if in browser
  if (!isBrowser) return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const clearLocalCart = () => {
  // ✅ Only clear if in browser
  if (!isBrowser) return;

  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error);
  }
};

const initialState = {
  // Single source of truth for cart items (with full product details)
  cartItems: [], // ✅ Initialize as empty array, will load in useEffect on client

  // UI states
  loading: false,
  error: null as string | null,
  // Computed values (will be updated from API or calculated)
  totalMRP: 0,
  totalCartItems: 0,
  totalCartAmount: 0,
  totalTax: 0,
  discountAmount: 0,
  specialDiscount: 0,
  // Discount & coupon
  couponCodeApplied: [] as string[],
  discountProgress: {} as any,
  shippingFee: 0,
  CODCharge: 0,
  // Track if user is guest
  isGuestCart: true,
  // for showing and hiding cart notification
  isCartNotificationVisible: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // === INITIALIZE CART FROM LOCALSTORAGE (call on client mount) ===
    initializeCartFromStorage: (state) => {
      if (isBrowser) {
        // const localCart = action.payload.cart;
        const localCart = loadLocalCart();
        state.cartItems = localCart;
        state.totalCartItems = localCart.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0,
        );
      }
    },

    // === FOR HIDE/SHOW CARTNOTIFICATION
    showCartNotification: (state) => {
      state.isCartNotificationVisible = true;
    },

    hideCartNotification: (state) => {
      state.isCartNotificationVisible = false;
    },

    // === LOCAL CART ACTIONS (for guest users) ===

    addToLocalCart: (state, action) => {
      const { productId, quantity, productName } = action.payload;

      const existingItem = state.cartItems.find(
        // (item: any) => item.productName === productName,
        (item: any) => (item.productName ?? item["name-url"]) === productName,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          productId,
          quantity,
          productName,
          // Product details will be fetched separately
        });
      }

      saveLocalCart(state.cartItems);
      state.couponCodeApplied = [];

      // Update total count
      state.totalCartItems = state.cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );
    },

    updateLocalCartQty: (state, action) => {
      const { productName, type } = action.payload;
      const item = state.cartItems.find(
        (item: any) => item["name-url"] === productName,
      );
      if (item) {
        if (type === "increase") {
          item.quantity += 1;
        } else if (type === "decrease") {
          item.quantity = Math.max(item.quantity - 1, 1);
        }
      }

      saveLocalCart(state.cartItems);
      state.couponCodeApplied = [];
      state.totalCartItems = state.cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );
    },

    removeFromLocalCart: (state, action) => {
      const productName = action.payload;

      state.cartItems = state.cartItems.filter(
        (item: any) => item["name-url"] !== productName,
      );

      saveLocalCart(state.cartItems);
      state.couponCodeApplied = [];
      state.totalCartItems = state.cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );
    },

    clearLocalCartState: (state) => {
      state.cartItems = [];
      state.couponCodeApplied = [];
      state.totalCartItems = 0;
      state.totalCartAmount = 0;
      state.totalTax = 0;
      state.discountProgress = {};

      clearLocalCart();
    },

    // Update cart with full product details (for guest users after fetching)
    updateLocalCartDetails: (state, action) => {
      const { productDetails, totals } = action.payload;

      // Merge product details with existing cart items
      state.cartItems = state.cartItems.map((item: any) => {
        const details = productDetails.find(
          (p: any) => p.productName === item.productName,
        );
        return details ? { ...item, ...details } : item;
      });

      state.totalCartAmount = totals?.finalAmount || 0;
      state.totalTax = totals?.totalTax || 0;
      state.discountProgress = totals || {};
      state.totalCartItems = state.cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );
    },

    // Switch between guest and logged-in cart
    setCartMode: (state, action) => {
      state.isGuestCart = action.payload;
    },

    // Sync server cart to local state (after login or fetch)
    syncServerCart: (state, action) => {
      if (action.payload.length > 0) {
        state.cartItems = action.payload;
        state.totalCartItems = action.payload.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0,
        );
      }

      // state.isGuestCart = false;

      // Clear localStorage when syncing with server
      clearLocalCart();
    },
  },

  extraReducers: (builder) => {
    // Listen to RTK Query cache updates for logged-in users
    builder
      .addMatcher(
        cartApi.endpoints.getLoggedInCart.matchFulfilled,
        (state, action) => {
          const { productDetails, totals, couponCodeApplied } = action.payload;
          state.cartItems = productDetails;
          state.totalMRP = totals?.totalMRP || 0;
          state.totalCartAmount = totals?.totalCartAmount || 0;
          state.discountAmount = totals?.discountAmount || 0;
          state.specialDiscount = totals?.offerDiscount;
          state.totalTax = totals?.totalTax || 0;
          state.couponCodeApplied = couponCodeApplied || [];
          state.totalCartItems = productDetails.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0,
          );
          state.loading = false;
        },
      )
      .addMatcher(cartApi.endpoints.getLoggedInCart.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        cartApi.endpoints.getLoggedInCart.matchRejected,
        (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        },
      )
      // Handle cart details fetch (for guest users)
      .addMatcher(
        cartApi.endpoints.getCartDetails.matchFulfilled,
        (state, action) => {
          const { productDetails, totals } = action.payload;
          // Merge product details with existing cart
          // const updatedCart = state.cartItems.map((item: any) => {
          //   const details = productDetails.find(
          //     (p: any) => p["name-url"] === item.productName,
          //   );
          //   // return details ? { ...item, ...details } : item;
          //   return details ? { ...details, quantity: item.quantity } : item;
          // });
          // state.cartItems = updatedCart;

          state.cartItems = productDetails;
          state.totalMRP = totals?.totalMRP || 0;
          state.totalCartAmount = totals?.totalCartAmount || 0;
          state.discountAmount = totals?.discountAmount || 0;
          state.specialDiscount = totals?.offerDiscount;
          state.totalTax = totals?.totalTax || 0;
          state.totalCartItems = state.cartItems.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0,
          );
          state.loading = false;
        },
      )

      //  .addMatcher(
      //   cartApi.endpoints.removeFromCart.matchFulfilled,
      //   (state, action) => {
      //     const { productDetails, totals } = action.payload;

      //     state.cartItems = productDetails;

      //     state.totalCartAmount = totals?.finalAmount || 0;
      //     state.totalTax = totals?.totalTax || 0;
      //     state.discountProgress = totals || {};
      //     state.totalCartItems = state.cartItems.reduce(
      //       (sum: number, item: any) => sum + item.quantity,
      //       0,
      //     );
      //     state.loading = false;
      //   },
      // )

      .addMatcher(
        cartApi.endpoints.mergeCart.matchFulfilled,
        (state, action) => {
          const { cart } = action.payload;
          // Merge product details with existing cart
          // const updatedCart = state.cartItems.map((item: any) => {
          //   const details = productDetails.find(
          //     (p: any) => p["name-url"] === item.productName,
          //   );
          //   return details ? { ...item, ...details } : item;
          //   // return details ? { ...details, quantity: item.quantity } : item;
          // });
          // const updatedCart=productDetails
          // state.cartItems = updatedCart;
          // state.cartItems = cart.items;
          state.loading = false;
        },
      )
      .addMatcher(
        cartApi.endpoints.calculateCODCharges.matchFulfilled,
        (state, action) => {
          state.CODCharge = action.payload.codCharge;
        },
      )
      .addMatcher(
        cartApi.endpoints.calculateShippingFee.matchFulfilled,
        (state, action) => {
          state.shippingFee = action.payload.deliveryCharge;
        },
      )
      .addMatcher(
        cartApi.endpoints.applyCouponCode.matchFulfilled,
        (state, action) => {
          const { couponCodeApplied, totalCartAmount, totalTax } =
            action.payload;
          state.totalCartAmount = totalCartAmount;
          state.totalTax = totalTax;
          state.couponCodeApplied = couponCodeApplied;
        },
      );
  },
});

export const {
  initializeCartFromStorage,
  addToLocalCart,
  updateLocalCartQty,
  removeFromLocalCart,
  clearLocalCartState,
  updateLocalCartDetails,
  setCartMode,
  syncServerCart,
  showCartNotification,
  hideCartNotification,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: any) => state.cart.cartItems;
export const selectTotalCartItems = (state: any) => state.cart.totalCartItems;
export const selectTotalMRP = (state: any) => state.cart.totalMRP;
export const selectTotalCartAmount = (state: any) => state.cart.totalCartAmount;
export const selectDiscountAmount = (state: any) => state.cart.discountAmount;
export const selectTotalTax = (state: any) => state.cart.totalTax;
export const selectSpecialDiscount = (state: any) => state.cart.specialDiscount;
export const selectCouponCodeApplied = (state: any) =>
  state.cart.couponCodeApplied;
export const selectDiscountProgress = (state: any) =>
  state.cart.discountProgress;
export const selectIsGuestCart = (state: any) => state.cart.isGuestCart;
export const selectCartLoading = (state: any) => state.cart.loading;
export const selectCartError = (state: any) => state.cart.error;

export default cartSlice.reducer;

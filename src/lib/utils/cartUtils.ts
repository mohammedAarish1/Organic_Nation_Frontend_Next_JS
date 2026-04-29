// Utility functions for cart operations

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculate cart totals
 */
export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    subtotal,
    totalItems,
  };
};

/**
 * Validate cart item before adding
 */
export const validateCartItem = (product, quantity) => {
  const errors = [];
  if (!product._id || !product.name) {
    errors.push("Invalid product data");
  }

  if (quantity < 1) {
    errors.push("Quantity must be at least 1");
  }

  if (product.availability && quantity > product.availability) {
    errors.push(`Only ${product.availability} items available in stock`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if item is in cart
 */
export const isItemInCart = (cartItems, productName) => {
  return cartItems.some((item) => item.productName === productName);
};

/**
 * Get item quantity from cart
 */
export const getItemQuantity = (cartItems, productName) => {
  const item = cartItems.find((item) => item.productName === productName);
  return item ? item.quantity : 0;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Group cart items by category
 */
export const groupCartItemsByCategory = (cartItems) => {
  return cartItems.reduce((groups, item) => {
    const category = item.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};

/**
 * Calculate shipping cost based on cart total
 */
export const calculateShipping = (cartTotal, freeShippingThreshold = 500) => {
  if (cartTotal >= freeShippingThreshold) {
    return 0;
  }
  return 50; // Flat rate
};

/**
 * Check if cart qualifies for free shipping
 */
export const qualifiesForFreeShipping = (cartTotal, threshold = 500) => {
  return cartTotal >= threshold;
};

/**
 * Calculate amount needed for free shipping
 */
export const amountNeededForFreeShipping = (cartTotal, threshold = 500) => {
  const needed = threshold - cartTotal;
  return needed > 0 ? needed : 0;
};

/**
 * Sanitize product data for cart storage
 */
export const sanitizeProductForCart = (product, quantity) => {
  return {
    productId: product._id || product.id,
    productName: product.nameUrl || product.slug,
    quantity: parseInt(quantity, 10),
    name: product.name,
    price: parseFloat(product.price),
    image: product.images?.[0] || product.image,
    category: product.category,
    // Add any other necessary fields
  };
};

/**
 * Check if cart has changed (for optimistic updates)
 */
export const hasCartChanged = (oldCart, newCart) => {
  if (oldCart.length !== newCart.length) return true;

  return oldCart.some((oldItem, index) => {
    const newItem = newCart[index];
    return (
      oldItem.productName !== newItem.productName ||
      oldItem.quantity !== newItem.quantity
    );
  });
};

/**
 * Merge two cart arrays (used during login)
 */
export const mergeCartArrays = (localCart, serverCart) => {
  const merged = [...serverCart];

  localCart.forEach((localItem) => {
    const existingIndex = merged.findIndex(
      (item) => item.productName === localItem.productName,
    );

    if (existingIndex >= 0) {
      // Item exists, add quantities
      merged[existingIndex].quantity += localItem.quantity;
    } else {
      // New item, add to cart
      merged.push(localItem);
    }
  });

  return merged;
};

/**
 * Check cart item availability
 */
export const checkItemAvailability = (item) => {
  return {
    isAvailable: item.inStock !== false && (item.stock ? item.stock > 0 : true),
    stock: item.stock || null,
    canPurchase: item.quantity <= (item.stock || Infinity),
  };
};

/**
 * Format cart for checkout
 */
export const formatCartForCheckout = (cartItems) => {
  return cartItems.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
  }));
};

/**
 * Validate entire cart before checkout
 */
export const validateCart = (cartItems) => {
  const errors = [];

  if (cartItems.length === 0) {
    errors.push("Cart is empty");
  }

  cartItems.forEach((item) => {
    const availability = checkItemAvailability(item);

    if (!availability.isAvailable) {
      errors.push(`${item.name} is out of stock`);
    }

    if (!availability.canPurchase) {
      errors.push(`Only ${availability.stock} ${item.name} available`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get cart summary for analytics
 */
export const getCartAnalytics = (cartItems, totalAmount) => {
  const { totalItems } = calculateCartTotals(cartItems);

  return {
    cart_value: totalAmount,
    cart_items_count: totalItems,
    cart_unique_items: cartItems.length,
    product_ids: cartItems.map((item) => item.productId),
    categories: [...new Set(cartItems.map((item) => item.category))],
  };
};

/**
 * Debounce function for quantity updates
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create debounced quantity update handler
 */
export const createDebouncedQuantityUpdate = (updateFn, delay = 500) => {
  return debounce((productName, type) => {
    updateFn({ productName, type });
  }, delay);
};

/**
 * Local storage helpers with error handling
 */
export const cartStorage = {
  get: (key = "cart") => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  set: (data, key = "cart") => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return false;
    }
  },

  remove: (key = "cart") => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};

/**
 * Generate unique cart ID for analytics
 */
export const generateCartId = () => {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate estimated delivery date
 */
export const calculateDeliveryDate = (processingDays = 2, shippingDays = 5) => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + processingDays + shippingDays);

  return deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

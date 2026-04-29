import { memo, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, getAllCartItems } from "../../features/cart/cart";
// import { toast } from "react-toastify";
// import { Tooltip } from "react-tooltip";
import { useCart } from "@/lib/custom-hooks/useCart";
import {
  getItemQuantity,
  isItemInCart,
  validateCartItem,
} from "@/lib/utils/cartUtils";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { showCartNotification } from "@/lib/features/cart/cartSlice";

export default function AddToCartBtn({
  product,
  quantity = 1,
  extraClasses = "px-4 py-3",
}) {
  // new set up
  const dispatch = useDispatch();
  const { addToCart, isAddingToCart, cartItems } = useCart();
  // const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const isInCart = isItemInCart(cartItems, product["name-Url"]);
  const currentQty = getItemQuantity(cartItems, product["name-Url"]);
  // const currentQtyInCart =
  //   cartItemsList?.find((cartItem) => cartItem._id === item._id)?.quantity || 0;

  const handleAddToCart = async (e) => {
    // e.stopPropagation(); // Prevent event from bubbling to the Link
    // e.preventDefault();
    setError("");
    // Validate before adding
    const validation = validateCartItem(product, quantity);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      return;
    }

    const result = await addToCart({
      productId: product._id,
      quantity,
      productName: product["name-url"],
    });
    if (result.success) {
      // setQuantity(1); // Reset quantity
      dispatch(showCartNotification());
    } else {
      setError("Please refresh the page");
    }
  };
  const isOutOfStock = product.availability === 0;

  // if (isInCart) {
  //   return (
  //     <div className="text-green-600">
  //       ✓ In Cart ({currentQty})
  //       <button className="ml-2 text-blue-600 underline">View Cart</button>
  //     </div>
  //   );
  // }

  return (
    <>
      <button
        onClick={handleAddToCart}
        // disabled={isAddingToCart || !product.inStock}
        disabled={isAddingToCart || isOutOfStock}
        // className="rounded bg-gradient-btn px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        className={`${extraClasses} ${isOutOfStock ? "cursor-not-allowed opacity-50" : "cursor-pointer"} group/btn bg-gradient-btn z-10 flex items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl`}
      >
        <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
        {isAddingToCart
          ? "Adding..."
          : isOutOfStock
            ? "Sold out"
            : "Add to Cart"}
      </button>

      {/* {error && <p className="text-sm text-red-600">{error}</p>}

      {product.availability && product.availability < 10 && (
        <p className="text-sm text-orange-600">
          Only {product.stock} left in stock!
        </p>
      )} */}

      {/* {isOutOfStock && (
        <Tooltip
          id={tooltipId}
          place="top"
          content="SOLD OUT"
          className="z-50 !rounded-lg !bg-red-500 !px-4 !py-2"
          classNameArrow="!border-red-500"
          style={{
            backgroundColor: "rgb(239 68 68)",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
          noArrow={false}
          animation="fade"
          delayShow={200}
          delayHide={300}
        />
      )} */}
    </>
  );
}

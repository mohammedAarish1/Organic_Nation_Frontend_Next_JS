import { motion } from "framer-motion";
import { useCheckoutModal } from "../providers/CheckoutModalProvider";
import { toast } from "react-toastify";
import { useCart } from "@/lib/custom-hooks/useCart";
import { Loader } from "lucide-react";
import { Product } from "@/types";

type BuyNowBtnProps = {
  product: Product;
  quantity: number;
  extraClasses?: string;
};

const BuyNowBtn = ({
  product,
  quantity,
  extraClasses = "",
}: BuyNowBtnProps) => {
  const { openCheckout } = useCheckoutModal();
  const { addToCart, isAddingToCart, cartItems } = useCart();

  const currentQtyInCart =
    cartItems?.find((cartItem) => cartItem._id === product._id)?.quantity || 0;

  const handleBuyNow = async () => {
    if (currentQtyInCart + quantity > product.availability) {
      toast.error(`Only ${product.availability} pcs. available`);
      return;
    }

    const result = await addToCart({
      productId: product._id,
      quantity,
      productName: product["name-url"],
    });

    if (result.success) {
      openCheckout();
    }
    // dispatch(addToCart({
    //   productId: item._id,
    //   quantity: qty,
    //   productName: item['name-url']
    // }))
    //   .then(() => {
    //     dispatch(getAllCartItems())
    //     .then(result=>{
    //       if(result.type==='cart/getAllCartItems/fulfilled'){
    //         setIsCheckoutOpen(true)
    //       }
    //     })
    //   });
  };

  const isOutOfStock = product?.availability === 0;

  return (
    <motion.button
      onClick={handleBuyNow}
      disabled={isAddingToCart}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${extraClasses} flex flex-1 justify-center rounded-xl bg-gray-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-gray-800 ${isAddingToCart && "opacity-30"}`}
    >
      {isAddingToCart ? <Loader className="animate-spin" /> : "Buy Now"}
    </motion.button>
  );
};

export default BuyNowBtn;

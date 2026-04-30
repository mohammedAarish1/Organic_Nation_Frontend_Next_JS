import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  useAddToWishListMutation,
  useLazyGetWishlistProductsQuery,
  useRemoveFromWishListMutation,
} from "@/lib/services/api/wishlistApi";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WishlistBtn = ({
  productId,
  extraClasses = "p-4 rounded-xl border-2",
  size = 24,
}) => {
  const router = useRouter();
  const [addToWishList, { isLoading: isAddingToWishlist }] =
    useAddToWishListMutation();
  const [removeFromWishList, { isLoading }] = useRemoveFromWishListMutation();
  const [getWishlistProducts] = useLazyGetWishlistProductsQuery();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);
  const isWishlisted = wishlistProducts?.some(
    (p) => p["name-url"] === productId,
  );
  const handleWishlistToggle = () => {
    if (isAuthenticated) {
      if (isWishlisted) {
        removeFromWishList(productId);
      } else {
        const result = addToWishList(productId);
      }
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      getWishlistProducts(undefined);
    }
  }, [isAuthenticated]);
  return (
    <motion.button
      //   whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleWishlistToggle}
      className={`${extraClasses} flex flex-1 cursor-pointer items-center justify-center gap-2 border-gray-300 transition-all hover:border-red-500 sm:flex-none`}
    >
      <Heart
        size={size}
        fill={isWishlisted ? "#EF4444" : "none"}
        color={isWishlisted ? "#EF4444" : "#6B7280"}
      />
      {/* <span className="text-sm font-medium text-gray-700 hidden sm:block">
        Wishlist
      </span> */}
    </motion.button>
  );
};

export default WishlistBtn;

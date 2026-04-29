import { useCart } from "@/lib/custom-hooks/useCart";
import { Minus, Plus } from "lucide-react";

export const QuantityControl = ({
  quantity,
  setQuantity,
  curItem,
  isCartPage = false,
  // onDecrease,
  // isUpdating,
}: {
  quantity: number;
  setQuantity: () => void;
  curItem: {};
  isCartPage?: boolean;
  // onIncrease: () => void;
  // onDecrease: () => void;
  // isUpdating?: boolean;
}) => {
  const { updateQuantity } = useCart();

  const handleIncreaseQty = () => {
    if (!isCartPage) {
      setQuantity((prevQty) => prevQty + 1);
    } else {
      if (curItem?.quantity) {
        if (curItem?.quantity === curItem?.availability) {
          // toast.error("No Quantity left in stock.");
          return;
        }

        updateQuantity({
          productName: curItem["name-url"],
          type: "increase",
        });
      }
    }
  };

  const handleDecreaseQty = () => {
    if (!isCartPage) {
      setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    } else {
      if (curItem?.quantity) {
        updateQuantity({
          productName: curItem["name-url"],
          type: "decrease",
        });
      }
    }
  };

  return (
    <div className="flex overflow-hidden rounded-xl border border-gray-300">
      <button
        onClick={handleDecreaseQty}
        // disabled={quantity <= 1 || isUpdating}
        // className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        className="px-4 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </button>
      <span className="w-16 border-x border-gray-300 px-6 py-2 text-center font-bold">
        {quantity}
      </span>
      <button
        onClick={handleIncreaseQty}
        // disabled={quantity >= availability || isUpdating}
        className="px-4 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <Plus className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
};

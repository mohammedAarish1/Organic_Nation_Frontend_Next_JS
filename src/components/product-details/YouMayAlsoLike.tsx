import { getProductByCategory } from "@/lib/services/api";
import ProductCardAlternate from "../common/ProductCardAlternate";

export default async function YouMayAlsoLike({ categoryId }) {
  let filteredProucts = null;

  try {
    filteredProucts = await getProductByCategory(categoryId);
  } catch (error) {}

  if (!filteredProucts) {
    return null;
  }

  return (
    <div className="mt-16 rounded-2xl bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            People Also Bought
          </h2>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
          >
            View All
            <ChevronRight size={20} />
          </motion.button> */}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filteredProucts?.map((item, idx) => (
            <ProductCardAlternate
              key={item["name-url"]}
              item={item}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

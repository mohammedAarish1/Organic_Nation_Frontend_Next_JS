import { getProductByCategory } from "@/lib/services/api";
import ProductCardAlternate from "../common/ProductCardAlternate";

export default async function YouMayAlsoLike({ categoryId }) {
  let filteredProucts = null;
  // const products = [
  //   {
  //     id: 1,
  //     name: "Organic Green Tea",
  //     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
  //     price: 399,
  //     originalPrice: 499,
  //     discount: 20,
  //     rating: 4.3,
  //     reviews: 89,
  //     tag: "Bestseller",
  //   },
  //   {
  //     id: 2,
  //     name: "Raw Honey - Pure & Natural",
  //     image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
  //     price: 549,
  //     originalPrice: 699,
  //     discount: 21,
  //     rating: 4.7,
  //     reviews: 156,
  //     tag: "New",
  //   },
  //   {
  //     id: 3,
  //     name: "Organic Turmeric Powder",
  //     image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
  //     price: 199,
  //     originalPrice: 299,
  //     discount: 33,
  //     rating: 4.5,
  //     reviews: 203,
  //     tag: "Hot Deal",
  //   },
  //   {
  //     id: 4,
  //     name: "Cold Pressed Coconut Oil",
  //     image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
  //     price: 449,
  //     originalPrice: 599,
  //     discount: 25,
  //     rating: 4.6,
  //     reviews: 178,
  //     tag: null,
  //   },
  // ];
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

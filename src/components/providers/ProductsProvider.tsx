"use client";

import { Product } from "@/types";
import { createContext, ReactNode, useContext } from "react";

// type ProductImage = {
//   blur: string;
//   sm: string;
//   md: string;
//   lg: string;
//   _id: {
//     $oid: string;
//   };
// };

// type ProductMeta = {
//   buy: number;
//   get: number;
//   season_special: boolean;
//   new_arrivals: boolean;
//   best_seller: boolean;
//   deal_of_the_day: boolean;
// };

// export type Product = {
//   _id: {
//     $oid: string;
//   };
//   product_id: number;
//   name: string;
//   "name-url": string;
//   weight: string;
//   grossWeight: string;
//   price: number;
//   discount: number;
//   tax: number;
//   "hsn-code": string;
//   category: string;
//   "category-url": string;
//   description: string;
//   availability: number;
//   img: ProductImage[];
//   meta: ProductMeta;
//   updatedAt: {
//     $date: string;
//   };
//   isActive: boolean;
//   title: string;
// };

type Category = {
  category: string;
  categoryUrl: string;
};

type ProductsContextType = {
  products: Product[];
  categories: Category[];
};

type ProductsProviderProps = {
  products: Product[];
  categories: Category[];
  children: ReactNode;
};
// const ProductsContext =createContext([]);
const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({
  products,
  categories,
  children,
}: ProductsProviderProps) {
  return (
    <ProductsContext.Provider value={{ products, categories }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
};

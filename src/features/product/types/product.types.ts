// import { MongoID } from "@/types/common";

import { Product } from "@/types";

// export interface ProductImage {
//   blur: string;
//   sm: string;
//   md: string;
//   lg: string;
// }

// export interface Product {
//   _id: MongoID;
//   product_id: number;
//   name: string;
//   "name-url": string;
//   "category-url"?: string;
//   weight: string;
//   price: number;
//   discount: number;
//   category: string;
//   img: ProductImage[]; // ✅ named interface, not inline array
// }

// ── Utility types ─────────────────────────────────────────────────────────────

// O(1) lookup map — built once in FilteredOrderList, passed down
// Stays here because it's a Product utility, not an Order concern
export type ProductMap = Map<string, Product>;

type ProductImage = {
  _id: string;
  blur: string;
  sm: string;
  md: string;
  lg: string;
};

type ProductMeta = {
  buy: number;
  get: number;
  season_special: boolean;
  new_arrivals: boolean;
  best_seller: boolean;
  deal_of_the_day: boolean;
};

export type Product = {
  _id: string;
  product_id: number;
  name: string;
  "name-url": string;
  weight: string;
  grossWeight: string;
  price: number;
  discount: number;
  tax: number;
  "hsn-code": string;
  category: string;
  "category-url": string;
  description: string;
  availability: number;
  img: ProductImage[];
  updatedAt: string; // or Date if you parse it
  isActive: boolean;
  title: string;
  quantity: number;
  meta: ProductMeta;
};

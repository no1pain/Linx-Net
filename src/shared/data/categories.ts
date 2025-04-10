export interface Category {
  id: string;
  name: string;
  image: string;
  models: number;
  path: string;
}

export const categories: Category[] = [
  {
    id: "phones",
    name: "Mobile phones",
    image: "/images/ShopByCategoryPhones.png",
    models: 95,
    path: "/phones",
  },
  {
    id: "tablets",
    name: "Tablets",
    image: "/images/ShopByCategoryTablets.png",
    models: 24,
    path: "/tablets",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/images/ShopByCategoryAccessories.png",
    models: 100,
    path: "/accessories",
  },
];

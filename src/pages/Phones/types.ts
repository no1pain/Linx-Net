export type SortOption = "Newest" | "Alphabetically" | "Cheapest";

export type Specs = {
  Screen: string;
  Capacity: string;
  RAM: string;
};

export type Phone = {
  id: number | string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  specs: Specs;
};

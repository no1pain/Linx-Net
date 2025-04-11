export type SortOption = "Newest" | "Alphabetically" | "Cheapest";

export type Specs = {
  Screen: string;
  Capacity: string;
  RAM: string;
  [key: string]: string;
};

export type DescriptionItem = {
  title: string;
  text: string[];
};

export type Phone = {
  id: number | string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  specs: Specs;

  // Additional properties from phones.json
  color?: string;
  category?: string;
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  images?: string[];
  description?: DescriptionItem[];
  processor?: string;
  resolution?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

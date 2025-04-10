export interface HotPricePhone {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  oldPrice: number;
  image: string;
  specs: {
    [key: string]: string;
  };
}

export const getHotPricesData = () => {
  return [];
};

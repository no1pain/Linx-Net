import React from "react";

interface ProductPriceProps {
  price: number;
  priceRegular: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  priceRegular,
}) => {
  return (
    <div className="mb-6 flex items-baseline gap-2">
      <div className="text-3xl font-bold">${price}</div>
      {priceRegular > price && (
        <div className="text-lg text-gray-500 line-through">
          ${priceRegular}
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { Icon } from "@ui/Icon";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: string;
  specs?: {
    [key: string]: string;
  };
  onAddToCart?: () => void;
  onAddToFavorites?: () => void;
  initialFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  price,
  image,
  specs = {},
  onAddToCart = () => {},
  onAddToFavorites = () => {},
  initialFavorite = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites();
  };

  return (
    <div className="border border-gray-200 p-6 flex flex-col h-full">
      <div className="flex justify-center mb-6">
        <img src={image} alt={title} className="max-h-48 object-contain" />
      </div>

      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{subtitle}</p>

      <p className="text-xl font-semibold mt-auto mb-4">${price}</p>

      <div className="space-y-1 mb-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-500">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAddToCart}
          className="bg-[#313237] text-white py-2 px-4 flex-1 hover:bg-opacity-90 transition"
        >
          Add to cart
        </button>
        <button
          onClick={handleToggleFavorite}
          className="border border-gray-300 p-2 flex items-center justify-center"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icon id={isFavorite ? "heart-active" : "heart"} size={16} />
        </button>
      </div>
    </div>
  );
};

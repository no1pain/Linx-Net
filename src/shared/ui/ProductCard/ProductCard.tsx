import React, { useState } from "react";
import { Icon } from "@ui/Icon";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  specs?: {
    [key: string]: string;
  };
  onAddToCart?: () => void;
  onAddToFavorites?: () => void;
  initialFavorite?: boolean;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  price,
  oldPrice,
  image,
  specs = {},
  onAddToCart = () => {},
  onAddToFavorites = () => {},
  initialFavorite = false,
  isAddedToCart = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites();
  };

  // Format the image path properly
  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `/${imagePath}`;
  };

  return (
    <div className="border border-gray-200 p-6 flex flex-col h-full">
      <div className="flex justify-center mb-6 h-[200px]">
        <img
          src={getImagePath(image)}
          alt={title}
          className="h-full object-contain"
        />
      </div>

      <div className="min-h-[60px] mb-2">
        <h3 className="text-base font-medium line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{subtitle}</p>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <p className="text-xl font-semibold">${price}</p>
        {oldPrice && oldPrice > price && (
          <p className="text-sm text-gray-500 line-through">${oldPrice}</p>
        )}
      </div>

      <div className="space-y-1 mb-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-500">{key}</span>
            <span className="text-black font-medium">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={onAddToCart}
          className={`py-2 px-4 flex-1 ${
            isAddedToCart
              ? "bg-white text-green-600 border border-gray-300"
              : "bg-[#313237] text-white hover:bg-opacity-90"
          } transition`}
        >
          {isAddedToCart ? "Added to cart" : "Add to cart"}
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

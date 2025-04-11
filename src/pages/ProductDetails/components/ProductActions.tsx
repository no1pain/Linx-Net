import React from "react";
import { Icon } from "@ui/Icon";

interface ProductActionsProps {
  inCart: boolean;
  favorited: boolean;
  handleAddToCart: () => void;
  handleToggleFavorite: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  inCart,
  favorited,
  handleAddToCart,
  handleToggleFavorite,
}) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={handleAddToCart}
        className={`py-3 w-[231px] sm:w-[180px] md:w-[263px] ${
          inCart
            ? "bg-white text-green-600 border border-gray-300"
            : "bg-[#313237] text-white hover:bg-opacity-90"
        } transition`}
      >
        {inCart ? "Added to cart" : "Add to cart"}
      </button>
      <button
        onClick={handleToggleFavorite}
        className="border border-gray-300 p-3 flex items-center justify-center w-[48px] h-[48px]"
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Icon id={favorited ? "heart-active" : "heart"} size={20} />
      </button>
    </div>
  );
};

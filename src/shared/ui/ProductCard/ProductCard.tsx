import React from "react";
import { Icon } from "@ui/Icon";
import { useFavorites } from "@/shared/contexts/FavoritesContext";
import { useCart } from "@/shared/contexts/CartContext";

interface ProductCardProps {
  id: string;
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
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  subtitle,
  price,
  oldPrice,
  image,
  specs = {},
  onAddToCart = () => {},
  onAddToFavorites = () => {},
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart } = useCart();

  const favorited = isFavorite(id);
  const inCart = isInCart(id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        title,
        subtitle,
        price,
        image,
        specs,
      });
    }
    // Call the original onAddToFavorites callback if provided
    onAddToFavorites();
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      subtitle,
      price,
      image,
      specs,
    });

    // Call the original onAddToCart callback if provided
    onAddToCart();
  };

  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `/${imagePath}`;
  };

  const modelMatch = subtitle.match(/\((.*?)\)/);
  const modelNumber = modelMatch ? modelMatch[1] : null;
  const displaySubtitle = modelMatch
    ? subtitle.replace(/\((.*?)\)/, "").trim()
    : subtitle;

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
        {modelNumber ? (
          <p className="text-sm text-gray-500 line-clamp-1">({modelNumber})</p>
        ) : (
          <p className="text-sm text-gray-500 line-clamp-1">
            {displaySubtitle}
          </p>
        )}
      </div>

      <div className="mb-4">
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
          onClick={handleAddToCart}
          className={`py-2 px-4 flex-1 ${
            inCart
              ? "bg-white text-green-600 border border-gray-300"
              : "bg-[#313237] text-white hover:bg-opacity-90"
          } transition`}
        >
          {inCart ? "Added to cart" : "Add to cart"}
        </button>
        <button
          onClick={handleToggleFavorite}
          className="border border-gray-300 p-2 flex items-center justify-center"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Icon id={favorited ? "heart-active" : "heart"} size={16} />
        </button>
      </div>
    </div>
  );
};

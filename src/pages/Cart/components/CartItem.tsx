import React from "react";
import { CartItem as CartItemType } from "@/shared/contexts/CartContext";
import { QuantityControl } from "./QuantityControl";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `/${imagePath}`;
  };

  return (
    <div className="border border-gray-200 p-4 relative">
      {/* Mobile layout */}
      <div className="sm:hidden">
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-4 left-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <div className="flex">
          {/* Left column: image and quantity controls */}
          <div className="flex flex-col items-start">
            {/* Product image */}
            <div className="w-[80px] h-[80px] flex items-center justify-center mb-4">
              <img
                src={getImagePath(item.image)}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Quantity control */}
            <QuantityControl
              quantity={item.quantity}
              onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
            />
          </div>

          {/* Right column: product details and price */}
          <div className="ml-4 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-base font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{item.subtitle}</p>
            </div>

            <div className="self-end">
              <p className="text-xl font-semibold">${item.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 text-xl mr-2"
        >
          ×
        </button>

        <div className="w-28 flex-shrink-0">
          <img
            src={getImagePath(item.image)}
            alt={item.title}
            className="w-full object-contain"
          />
        </div>

        <div className="ml-4 flex-grow">
          <h3 className="text-base font-medium leading-tight">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.subtitle}</p>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <QuantityControl
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
          />
        </div>

        <div className="min-w-[80px] text-right ml-4">
          <p className="text-xl font-semibold">${item.price}</p>
        </div>
      </div>
    </div>
  );
};

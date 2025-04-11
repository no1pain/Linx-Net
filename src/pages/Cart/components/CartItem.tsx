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
    <div className="border border-gray-200 p-4 flex flex-row items-center relative">
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-4 left-4 text-gray-400 hover:text-red-500"
      >
        ×
      </button>

      <div className="ml-8 w-20 sm:w-28 flex-shrink-0">
        <img
          src={getImagePath(item.image)}
          alt={item.title}
          className="w-full object-contain"
        />
      </div>

      <div className="ml-4 flex-grow">
        <h3 className="text-sm sm:text-base font-medium leading-tight">
          {item.title}
        </h3>
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
  );
};

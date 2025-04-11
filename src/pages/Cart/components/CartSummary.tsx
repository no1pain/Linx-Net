import React from "react";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  itemCount,
  onCheckout,
}) => {
  return (
    <div className="border border-gray-200 p-6 h-fit">
      <h2 className="text-2xl font-bold">${total}</h2>
      <p className="text-gray-500 text-sm mb-6">
        Total for {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      <button
        className="w-full py-3 bg-[#313237] text-white hover:bg-opacity-90 transition"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

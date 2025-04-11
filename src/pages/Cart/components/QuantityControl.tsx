import React from "react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 border border-gray-300 flex items-center justify-center"
        onClick={onDecrease}
      >
        –
      </button>
      <div className="w-8 h-8 border-t border-b border-gray-300 flex items-center justify-center">
        {quantity}
      </div>
      <button
        className="w-8 h-8 border border-gray-300 flex items-center justify-center"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

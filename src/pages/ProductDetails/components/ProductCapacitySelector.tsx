import React from "react";

interface ProductCapacitySelectorProps {
  capacities: string[];
  selectedCapacity: string | null;
  setSelectedCapacity: (capacity: string) => void;
}

export const ProductCapacitySelector: React.FC<
  ProductCapacitySelectorProps
> = ({ capacities, selectedCapacity, setSelectedCapacity }) => {
  return (
    <div className="mb-8">
      <div className="text-base font-medium mb-2">Select capacity</div>
      <div className="flex flex-wrap gap-2">
        {capacities.map((capacity) => {
          const formattedCapacity = capacity.replace(
            /([0-9]+)([A-Z]+)/,
            "$1 $2"
          );
          return (
            <button
              key={capacity}
              className={`py-1 px-3 border ${
                selectedCapacity === capacity ||
                (capacity.includes("GB") &&
                  selectedCapacity === capacity.replace("GB", " GB"))
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-black"
              }`}
              onClick={() => setSelectedCapacity(capacity)}
            >
              {formattedCapacity}
            </button>
          );
        })}
      </div>
    </div>
  );
};

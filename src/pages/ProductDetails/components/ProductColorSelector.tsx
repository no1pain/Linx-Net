import React from "react";

interface ProductColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  getColorClassName: (color: string) => string;
}

export const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
  colors,
  selectedColor,
  setSelectedColor,
  getColorClassName,
}) => {
  return (
    <div className="flex gap-3 mb-6">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-[32px] h-[32px] rounded-full ${
            selectedColor === color ? "ring-2 ring-black ring-offset-1" : ""
          }`}
          style={{
            backgroundColor:
              getColorClassName(color).replace("bg-", "") === "bg-gray-200"
                ? "#e5e7eb"
                : getColorClassName(color).replace("bg-", ""),
          }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
};

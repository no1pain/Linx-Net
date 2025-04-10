import React, { useState } from "react";
import { Icon } from "@ui/Icon";

interface ItemsPerPageDropdownProps {
  value: number;
  onChange: (count: number) => void;
  options?: number[];
}

export const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  value,
  onChange,
  options = [8, 16, 32, 64],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (option: number) => {
    onChange(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <p className="text-sm text-gray-500 mb-1">Items on page</p>
      <button
        className="w-[176px] h-[40px] border border-gray-300 flex items-center justify-between px-4"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{value}</span>
        <Icon id="arrow-right" size={16} className="transform rotate-90" />
      </button>
      {showDropdown && (
        <div className="absolute w-full mt-1 border border-gray-300 bg-white z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left p-3 hover:bg-gray-100 ${
                value === option ? "font-medium" : ""
              }`}
              onClick={() => handleChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

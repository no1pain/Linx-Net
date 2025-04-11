import React, { useState } from "react";

interface ItemsPerPageDropdownProps {
  value: number;
  onChange: (option: number) => void;
  options?: number[];
}

export const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  value,
  onChange,
  options = [4, 8, 16, 32],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <p className="text-sm text-gray-500 mb-1">Items on page</p>
      <div
        className="border border-gray-300 px-4 py-2 min-w-[90px] sm:min-w-[150px] md:min-w-[210px] flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <span className="text-xs ml-2">▼</span>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 bg-white border border-gray-300 mt-1 w-full">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option === value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

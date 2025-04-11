import React, { useState } from "react";

interface SortingDropdownProps {
  value: string;
  onChange: (option: string) => void;
  options?: string[];
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  value,
  onChange,
  options = ["Newest", "Alphabetically", "Cheapest"],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <p className="text-sm text-gray-500 mb-1">Sort by</p>
      <div
        className="border border-gray-300 px-4 py-2 min-w-[200px] flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <span className="text-xs ml-2">▼</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full">
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

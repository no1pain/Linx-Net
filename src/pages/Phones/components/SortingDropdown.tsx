import React, { useState } from "react";
import { Icon } from "@ui/Icon";
import { SortOption } from "../types";

interface SortingDropdownProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  value,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (option: SortOption) => {
    onChange(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <p className="text-sm text-gray-500 mb-1">Sort by</p>
      <button
        className="w-[250px] h-[40px] border border-gray-300 flex items-center justify-between px-4"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{value}</span>
        <Icon id="arrow-right" size={16} className="transform rotate-90" />
      </button>
      {showDropdown && (
        <div className="absolute w-full mt-1 border border-gray-300 bg-white z-10">
          {(["Newest", "Alphabetically", "Cheapest"] as SortOption[]).map(
            (option) => (
              <button
                key={option}
                className={`w-full text-left p-3 hover:bg-gray-100 ${
                  value === option ? "font-medium" : ""
                }`}
                onClick={() => handleChange(option)}
              >
                {option}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

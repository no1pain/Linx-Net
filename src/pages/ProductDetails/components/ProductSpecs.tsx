import React from "react";

interface ProductSpecsProps {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({
  screen,
  resolution,
  processor,
  ram,
}) => {
  return (
    <div className="w-[287px] sm:w-[236px] md:w-[319px]">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
          Screen
        </div>
        <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
          {screen || "–"}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
          Resolution
        </div>
        <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
          {resolution || "–"}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
          Processor
        </div>
        <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
          {processor || "–"}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-500 font-mont text-[12px] leading-normal tracking-[0]">
          RAM
        </div>
        <div className="font-mont font-semibold text-[12px] leading-normal tracking-[0] text-right">
          {ram || "–"}
        </div>
      </div>
    </div>
  );
};

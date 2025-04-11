import React from "react";
import { Typography } from "@ui/Typography";

interface ProductDetail {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  memory?: string;
  capacity?: string;
  camera?: string;
  zoom?: string;
  cell?: string;
}

interface ProductTechSpecsProps {
  product: ProductDetail;
}

export const ProductTechSpecs: React.FC<ProductTechSpecsProps> = ({
  product,
}) => {
  return (
    <div>
      <Typography
        variant="h2"
        as="h2"
        className="text-[22px] font-mont font-extrabold leading-[140%] mb-4 pb-2 border-b border-gray-300"
      >
        Tech specs
      </Typography>
      <div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Screen
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.screen || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Resolution
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.resolution || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Processor
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.processor || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            RAM
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.ram || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Built in memory
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.memory || product.capacity || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Camera
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.camera || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Zoom
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.zoom || "–"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="text-gray-500 font-mont text-[14px] font-medium leading-[21px]">
            Cell
          </div>
          <div className="font-mont text-[14px] font-medium leading-[21px] text-right">
            {product.cell || "–"}
          </div>
        </div>
      </div>
    </div>
  );
};

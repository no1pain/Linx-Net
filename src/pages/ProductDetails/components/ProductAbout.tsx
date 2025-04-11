import React from "react";
import { Typography } from "@ui/Typography";

interface ProductAboutProps {
  description: string;
}

export const ProductAbout: React.FC<ProductAboutProps> = ({ description }) => {
  return (
    <div>
      <Typography
        variant="h2"
        as="h2"
        className="text-[22px] font-mont font-extrabold leading-[140%] mb-4 pb-2 border-b border-gray-300"
      >
        About
      </Typography>
      <div className="text-base font-mont text-[14px] font-medium leading-[21px]">
        {description}
      </div>
    </div>
  );
};

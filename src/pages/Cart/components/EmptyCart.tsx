import React from "react";
import { Typography } from "@ui/Typography";

export const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Typography variant="h3" as="h3" className="mb-4">
        Your cart is empty
      </Typography>
      <p className="text-gray-500">
        Add products to your cart by clicking the "Add to cart" button on
        product pages.
      </p>
    </div>
  );
};

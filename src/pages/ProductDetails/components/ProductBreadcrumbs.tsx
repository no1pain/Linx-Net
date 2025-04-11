import React from "react";
import { Link } from "react-router-dom";

interface ProductBreadcrumbsProps {
  homeLink: string;
  categoryLink: string;
  categoryName: string;
  productName: string;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  homeLink,
  categoryLink,
  categoryName,
  productName,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <Link to={homeLink} className="text-gray-500 hover:text-black">
        Home
      </Link>
      <span className="text-gray-500">&gt;</span>
      <Link to={categoryLink} className="text-gray-500 hover:text-black">
        {categoryName}
      </Link>
      <span className="text-gray-500">&gt;</span>
      <span className="text-black">{productName}</span>
    </div>
  );
};

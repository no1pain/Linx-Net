import React from "react";
import { Typography } from "@ui/Typography";
import { Link } from "react-router-dom";

export const TabletsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black">Tablets</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Tablets
        </Typography>
        <p className="text-sm text-gray-500">Coming soon</p>
      </div>
    </div>
  );
};

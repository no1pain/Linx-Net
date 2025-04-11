import React from "react";

export const YouMayAlsoLikeLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center py-8">Loading related products...</div>
    </div>
  );
};

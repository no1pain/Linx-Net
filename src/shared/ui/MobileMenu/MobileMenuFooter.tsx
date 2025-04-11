import React from "react";
import { FavoritesBadge } from "@shared/ui/FavoritesBadge";
import { CartBadge } from "@shared/ui/CartBadge";

export const MobileMenuFooter: React.FC = () => {
  return (
    <div className="h-[64px] border-t border-[#E2E6E9] grid grid-cols-2">
      <div className="flex items-center justify-center border-r border-[#E2E6E9]">
        <FavoritesBadge />
      </div>
      <div className="flex items-center justify-center">
        <CartBadge />
      </div>
    </div>
  );
};

import React from "react";
import { FavoritesBadge } from "@shared/ui/FavoritesBadge";
import { CartBadge } from "@shared/ui/CartBadge";

interface MobileMenuFooterProps {
  onClose: () => void;
}

export const MobileMenuFooter: React.FC<MobileMenuFooterProps> = ({
  onClose,
}) => {
  return (
    <div className="h-[64px] border-t border-[#E2E6E9] grid grid-cols-2">
      <div className="flex items-center justify-center border-r border-[#E2E6E9]">
        <FavoritesBadge onClick={onClose} />
      </div>
      <div className="flex items-center justify-center">
        <CartBadge onClick={onClose} />
      </div>
    </div>
  );
};

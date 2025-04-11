import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@ui/Icon";

export const MobileMenuFooter: React.FC = () => {
  return (
    <div className="h-[64px] border-t border-[#E2E6E9] grid grid-cols-2">
      <NavLink
        to="/favorites"
        className="flex items-center justify-center border-r border-[#E2E6E9]"
      >
        <Icon id="heart" className="w-4 h-4" />
      </NavLink>
      <NavLink to="/cart" className="flex items-center justify-center">
        <Icon id="cart" className="w-4 h-4" />
      </NavLink>
    </div>
  );
};

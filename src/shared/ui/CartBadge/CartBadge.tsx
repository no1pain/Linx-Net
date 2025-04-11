import React from "react";
import { Icon } from "@ui/Icon";
import { useCart } from "@/shared/contexts/CartContext";
import { NavLink } from "react-router-dom";

interface CartBadgeProps {
  showCount?: boolean;
  className?: string;
}

export const CartBadge: React.FC<CartBadgeProps> = ({
  showCount = true,
  className = "",
}) => {
  const { cartCount } = useCart();

  return (
    <NavLink
      to="/cart"
      className={`relative flex items-center justify-center ${className}`}
      aria-label="Cart"
    >
      <Icon id="cart" className="w-4 h-4" />

      {showCount && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </NavLink>
  );
};

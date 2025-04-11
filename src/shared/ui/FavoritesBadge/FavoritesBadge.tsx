import React from "react";
import { Icon } from "@ui/Icon";
import { useFavorites } from "@/shared/contexts/FavoritesContext";
import { NavLink } from "react-router-dom";

interface FavoritesBadgeProps {
  showCount?: boolean;
  className?: string;
}

export const FavoritesBadge: React.FC<FavoritesBadgeProps> = ({
  showCount = true,
  className = "",
}) => {
  const { favoritesCount } = useFavorites();

  return (
    <NavLink
      to="/favorites"
      className={`relative flex items-center justify-center ${className}`}
      aria-label="Favorites"
    >
      <Icon id="heart" className="w-4 h-4" />

      {showCount && favoritesCount > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
          {favoritesCount > 9 ? "9+" : favoritesCount}
        </span>
      )}
    </NavLink>
  );
};

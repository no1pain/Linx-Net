import React from "react";
import { Icon } from "@ui/Icon";
import { Container } from "@ui/layout/Container";
import { NavLink } from "react-router-dom";

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return `font-mont text-[12px] leading-[11px] tracking-[0.04em] font-[800] uppercase transition-colors ${
    isActive ? "text-primary" : "text-secondary hover:text-primary"
  }`;
};

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-elements">
      <div className="h-[48px] xl:h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-8 xl:gap-[48px] pl-4 sm:pl-6 xl:pl-8">
          <div className="flex flex-col h-[22px] justify-between">
            <span className="text-primary font-bold text-[11px] leading-none">
              Linx
            </span>
            <span className="text-primary font-bold text-[11px] leading-none">
              Net👌
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-8">
            <NavLink to="/" className={getLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClassName}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClassName}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClassName}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className="flex items-stretch h-full">
          <button
            className="sm:hidden w-[48px] xl:w-[64px] flex items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
            aria-label="Menu"
          >
            <Icon id="burger" className="w-4 h-4" />
          </button>
          <button
            className="hidden sm:flex w-[48px] xl:w-[64px] items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
            aria-label="Favorites"
          >
            <Icon id="heart" className="w-4 h-4" />
          </button>
          <button
            className="hidden sm:flex w-[48px] xl:w-[64px] items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
            aria-label="Cart"
          >
            <Icon id="cart" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@ui/Icon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return `font-mont text-[14px] leading-[14px] tracking-[0.04em] font-[800] uppercase transition-colors inline-block relative
    ${
      isActive
        ? "text-black after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[1px] after:bg-black"
        : "text-[#89939A]"
    }`;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-white transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-[48px] flex items-center justify-between px-4 border-b border-[#E2E6E9]">
          <div className="flex flex-col h-[22px] justify-between">
            <span className="text-primary font-bold text-[11px] leading-none">
              Linx
            </span>
            <span className="text-primary font-bold text-[11px] leading-none">
              Net👌
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-[48px] h-[48px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 1L1 15M1 1L15 15" stroke="black" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-16 py-4 flex flex-col gap-8">
          <div className="flex justify-center">
            <NavLink to="/" className={getLinkClassName} onClick={onClose}>
              HOME
            </NavLink>
          </div>
          <div className="flex justify-center">
            <NavLink
              to="/phones"
              className={getLinkClassName}
              onClick={onClose}
            >
              PHONES
            </NavLink>
          </div>
          <div className="flex justify-center">
            <NavLink
              to="/tablets"
              className={getLinkClassName}
              onClick={onClose}
            >
              TABLETS
            </NavLink>
          </div>
          <div className="flex justify-center">
            <NavLink
              to="/accessories"
              className={getLinkClassName}
              onClick={onClose}
            >
              ACCESSORIES
            </NavLink>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="h-[64px] border-t border-[#E2E6E9] grid grid-cols-2">
          <NavLink
            to="/favorites"
            className="flex items-center justify-center border-r border-[#E2E6E9]"
          >
            <Icon id="heart" className="w-4 h-4" />
          </NavLink>
          <NavLink to="/cart" className="flex items-center justify-center">
            <Icon id="bag" className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

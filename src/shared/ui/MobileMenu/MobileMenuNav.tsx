import React from "react";
import { NavLink } from "react-router-dom";

interface MobileMenuNavProps {
  onClose: () => void;
}

export const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return `font-mont text-[14px] leading-[14px] tracking-[0.04em] font-[800] uppercase transition-colors inline-block relative
    ${
      isActive
        ? "text-black after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[1px] after:bg-black"
        : "text-[#89939A]"
    }`;
};

export const MobileMenuNav: React.FC<MobileMenuNavProps> = ({ onClose }) => {
  return (
    <nav className="flex-grow px-16 py-4 flex flex-col gap-8">
      <div className="flex justify-center">
        <NavLink to="/" className={getLinkClassName} onClick={onClose}>
          HOME
        </NavLink>
      </div>
      <div className="flex justify-center">
        <NavLink to="/phones" className={getLinkClassName} onClick={onClose}>
          PHONES
        </NavLink>
      </div>
      <div className="flex justify-center">
        <NavLink to="/tablets" className={getLinkClassName} onClick={onClose}>
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
  );
};

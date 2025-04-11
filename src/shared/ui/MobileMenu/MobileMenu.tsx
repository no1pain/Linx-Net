import React from "react";
import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileMenuNav } from "./MobileMenuNav";
import { MobileMenuFooter } from "./MobileMenuFooter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
        <MobileMenuHeader onClose={onClose} />
        <MobileMenuNav onClose={onClose} />
        <MobileMenuFooter onClose={onClose} />
      </div>
    </>
  );
};

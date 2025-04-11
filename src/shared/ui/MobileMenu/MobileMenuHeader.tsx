import React from "react";

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({
  onClose,
}) => {
  return (
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
  );
};

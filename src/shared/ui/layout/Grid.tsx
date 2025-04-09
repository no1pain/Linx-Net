import React from "react";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = "",
  cols = {
    mobile: 4,
    tablet: 12,
    desktop: 24,
  },
  gap = "16px",
}) => {
  const gridCols = {
    mobile: cols.mobile || 4,
    tablet: cols.tablet || 12,
    desktop: cols.desktop || 24,
  };

  return (
    <div
      className={`
        grid gap-4
        grid-cols-${gridCols.mobile}
        sm:grid-cols-${gridCols.tablet}
        xl:grid-cols-${gridCols.desktop}
        ${className}
      `}
      style={{ gap }}
    >
      {children}
    </div>
  );
};

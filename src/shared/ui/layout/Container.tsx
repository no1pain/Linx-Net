import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  noPadding = false,
}) => {
  return (
    <div
      className={`
      mx-auto overflow-hidden
      w-full max-w-[639px]
      sm:max-w-[1199px]
      xl:max-w-[1200px]
      ${!noPadding ? "px-4 sm:px-6 xl:px-8" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

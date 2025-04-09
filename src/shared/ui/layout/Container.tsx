import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
      mx-auto px-4
      w-full max-w-[639px]
      sm:max-w-[1199px] sm:px-6
      xl:max-w-[1200px] xl:px-8
      ${className}
    `}
    >
      {children}
    </div>
  );
};

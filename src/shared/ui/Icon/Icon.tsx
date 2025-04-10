import React from "react";
import sprite from "@assets/sprite.svg";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  id,
  size = 16,
  width,
  height,
  className = "",
  ...props
}) => {
  const spritePath =
    process.env.NODE_ENV === "production"
      ? `${process.env.PUBLIC_URL || ""}/sprite.svg`
      : sprite;

  return (
    <svg
      width={width || size}
      height={height || size}
      className={className}
      {...props}
    >
      <use href={`${spritePath}#${id}`} />
    </svg>
  );
};

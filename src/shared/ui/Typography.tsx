import React from "react";
import { typography } from "../config/theme";

type TypographyVariant = keyof typeof typography;
type Element = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a";

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: Element;
  href?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className = "",
  as: Component = "p",
  ...props
}) => {
  const styles = typography[variant];

  return React.createElement(
    Component,
    {
      className: `font-mont ${className}`,
      style: {
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        fontWeight: styles.fontWeight,
        ...(variant === "uppercase"
          ? { textTransform: "uppercase" as const }
          : {}),
      },
      ...props,
    },
    children
  );
};

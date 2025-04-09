export const breakpoints = {
  mobile: "320px",
  tablet: "640px",
  desktop: "1200px",
} as const;

export const grid = {
  desktop: {
    columns: 24,
    columnWidth: "32px",
    gutter: "16px",
    containerWidth: "1200px",
  },
  tablet: {
    columns: 12,
    gutter: "16px",
    padding: "24px",
    containerMinWidth: "640px",
    containerMaxWidth: "1199px",
  },
  mobile: {
    columns: 4,
    gutter: "16px",
    padding: "16px",
    containerMaxWidth: "639px",
  },
} as const;

export const media = {
  mobile: `@media (max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${
    parseInt(breakpoints.desktop) - 1
  }px)`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
} as const;

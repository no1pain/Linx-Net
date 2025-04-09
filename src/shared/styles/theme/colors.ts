export const colors = {
  primary: "#313237",
  secondary: "#89939A",
  icons: "#B4BDC3",
  elements: "#E2E6E9",
  hoverBg: "#FAFBFC",
  white: "#FFFFFF",
  green: "#27AE60",
  red: "#EB5757",
} as const;

export const colorUsage = {
  textPrimary: colors.primary,
  textSecondary: colors.secondary,

  bgPrimary: colors.white,
  bgSecondary: colors.hoverBg,
  bgHover: colors.elements,

  iconPrimary: colors.icons,
  iconSecondary: colors.secondary,

  success: colors.green,
  error: colors.red,

  borderPrimary: colors.elements,
  borderSecondary: colors.icons,
} as const;

export type ColorName = keyof typeof colors;
export type ColorUsage = keyof typeof colorUsage;

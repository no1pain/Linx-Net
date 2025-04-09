import { colors, colorUsage } from "./colors";
import { typography } from "./typography";

export const fontFamily = {
  mont: '"Mont", sans-serif',
} as const;

export const theme = {
  colors,
  colorUsage,
  typography,
  fontFamily,
} as const;

export * from "./colors";
export * from "./typography";

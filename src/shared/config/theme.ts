export const typography = {
  h1: {
    fontSize: "48px",
    lineHeight: "56px",
    letterSpacing: "-0.01em",
    fontWeight: "700",
  },
  h2: {
    fontSize: "32px",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    fontWeight: "700",
  },
  h3: {
    fontSize: "22px",
    lineHeight: "31px",
    letterSpacing: "0",
    fontWeight: "700",
  },
  h4: {
    fontSize: "20px",
    lineHeight: "26px",
    letterSpacing: "0",
    fontWeight: "600",
  },
  uppercase: {
    fontSize: "12px",
    lineHeight: "11px",
    letterSpacing: "0.04em",
    fontWeight: "700", // Bold
    textTransform: "uppercase" as const,
  },
  button: {
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "0",
    fontWeight: "600",
  },
  body: {
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "0",
    fontWeight: "400",
  },
  small: {
    fontSize: "12px",
    lineHeight: "15px",
    letterSpacing: "0",
    fontWeight: "600",
  },
} as const;

export const fontFamily = {
  mont: '"Mont", sans-serif',
} as const;

export const theme = {
  typography,
  fontFamily,
} as const;

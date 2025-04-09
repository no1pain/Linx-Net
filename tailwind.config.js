/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  important: true,
  theme: {
    extend: {
      fontFamily: {
        mont: ["Mont", "sans-serif"],
      },
      colors: {
        primary: "#313237",
        secondary: "#89939A",
        icons: "#B4BDC3",
        elements: "#E2E6E9",
        "hover-bg": "#FAFBFC",
        success: "#27AE60",
        error: "#EB5757",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
      gridTemplateColumns: {
        4: "repeat(4, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      spacing: {
        gutter: "16px",
        "gutter-mobile": "16px",
        "gutter-tablet": "16px",
        "gutter-desktop": "16px",
      },
      maxWidth: {
        container: "1200px",
        "container-tablet": "1199px",
        "container-mobile": "639px",
      },
    },
  },
  plugins: [],
};

const path = require("path");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@styles": path.resolve(__dirname, "src/shared/styles"),
      "@ui": path.resolve(__dirname, "src/shared/ui"),
      "@config": path.resolve(__dirname, "src/shared/config"),
      "@assets": path.resolve(__dirname, "src/shared/assets"),
    },
  },
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions = {
          plugins: [tailwindcss("./tailwind.config.js"), autoprefixer],
        };
        return postcssLoaderOptions;
      },
    },
  },
};

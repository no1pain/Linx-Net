export const preventHorizontalScrollStyles = `
  html, body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }
`;
export const applyGlobalStyles = (): (() => void) => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = preventHorizontalScrollStyles;
  document.head.appendChild(styleElement);

  return () => {
    document.head.removeChild(styleElement);
  };
};

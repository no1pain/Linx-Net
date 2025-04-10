import { Dispatch, SetStateAction } from "react";

export type SlideDirection = "left" | "right";

export const handlePrevious = (
  currentIndex: number,
  imagesLength: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  setDirection: Dispatch<SetStateAction<SlideDirection>>,
  setIsAnimating: Dispatch<SetStateAction<boolean>>,
  isAnimating: boolean
) => {
  if (isAnimating) return;

  setDirection("right");
  setIsAnimating(true);

  setTimeout(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesLength - 1 : prevIndex - 1
    );
    setIsAnimating(false);
  }, 300);
};

export const handleNext = (
  currentIndex: number,
  imagesLength: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  setDirection: Dispatch<SetStateAction<SlideDirection>>,
  setIsAnimating: Dispatch<SetStateAction<boolean>>,
  isAnimating: boolean
) => {
  if (isAnimating) return;

  setDirection("left");
  setIsAnimating(true);

  setTimeout(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesLength - 1 ? 0 : prevIndex + 1
    );
    setIsAnimating(false);
  }, 300);
};

export const getAnimationStyle = (
  isAnimating: boolean,
  direction: SlideDirection
) => {
  return isAnimating
    ? {
        transform:
          direction === "left" ? "translateX(-100%)" : "translateX(100%)",
        transition: "transform 300ms ease-in-out",
      }
    : {};
};

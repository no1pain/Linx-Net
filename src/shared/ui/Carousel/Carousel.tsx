import React, { useState, useCallback } from "react";
import { Icon } from "@ui/Icon";
import {
  SlideDirection,
  handleNext as nextSlide,
  handlePrevious as previousSlide,
  getAnimationStyle,
} from "./carouselUtils";

interface CarouselProps {
  heading?: string;
  images?: string[];
  mobileImages?: string[];
}

export const Carousel: React.FC<CarouselProps> = ({
  heading,
  images = ["/images/Carousel1", "/images/Carousel2", "/images/Carousel3"],
  mobileImages = [
    "/images/CarouselMobile1.png",
    "/images/CarouselMobile1.png",
    "/images/CarouselMobile1.png",
  ],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<SlideDirection>("left");

  // Memoize handler functions to prevent unnecessary re-renders
  const handlePrevious = useCallback(() => {
    previousSlide(
      currentIndex,
      images.length,
      setCurrentIndex,
      setDirection,
      setIsAnimating,
      isAnimating
    );
  }, [currentIndex, images.length, isAnimating]);

  const handleNext = useCallback(() => {
    nextSlide(
      currentIndex,
      images.length,
      setCurrentIndex,
      setDirection,
      setIsAnimating,
      isAnimating
    );
  }, [currentIndex, images.length, isAnimating]);

  const animationStyles = getAnimationStyle(isAnimating, direction);

  return (
    <div>
      {heading && (
        <div className="container mx-auto">
          <h1 className="text-[48px] font-normal mb-8 px-24">{heading}</h1>
        </div>
      )}

      <div className="w-full flex">
        {/* Navigation button - hidden on mobile */}
        <div className="hidden sm:flex items-center mr-4">
          <div
            onClick={handlePrevious}
            className="w-[32px] h-full flex items-center justify-center cursor-pointer border border-gray-300"
          >
            <Icon id="arrow-left" size={16} />
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center sm:px-0 overflow-hidden">
          <div style={animationStyles}>
            <img
              src={images[currentIndex]}
              alt={`Carousel ${currentIndex + 1}`}
              className="hidden sm:block max-w-full max-h-full object-contain"
            />

            <img
              src={mobileImages[currentIndex]}
              alt={`Carousel Mobile ${currentIndex + 1}`}
              className="block sm:hidden w-full h-auto"
            />
          </div>
        </div>

        <div className="hidden sm:flex items-center ml-4">
          <div
            onClick={handleNext}
            className="w-[32px] h-full flex items-center justify-center cursor-pointer border border-gray-300"
          >
            <Icon id="arrow-right" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Icon } from "@ui/Icon";

interface CarouselProps {
  heading?: string;
  images?: string[];
}

export const Carousel: React.FC<CarouselProps> = ({
  heading,
  images = ["/images/Carousel1", "/images/Carousel2", "/images/Carousel3"],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {heading && (
        <div className="container mx-auto">
          <h1 className="text-[48px] font-normal mb-8 px-24">{heading}</h1>
        </div>
      )}

      <div className="w-full flex">
        <div className="flex items-center mr-4">
          <div
            onClick={handlePrevious}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer border border-gray-300"
          >
            <Icon id="arrow-left" size={16} />
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img
            src={images[currentIndex]}
            alt={`Carousel ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex items-center ml-4">
          <div
            onClick={handleNext}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer border border-gray-300"
          >
            <Icon id="arrow-right" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

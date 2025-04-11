import React from "react";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";

interface NewModelsHeaderProps {
  isMobile: boolean;
  currentIndex: number;
  maxIndex: number;
  isAnimating: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const NewModelsHeader: React.FC<NewModelsHeaderProps> = ({
  isMobile,
  currentIndex,
  maxIndex,
  isAnimating,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-12">
      <div className="col-span-4 sm:col-span-12 flex justify-between items-center mb-6">
        <Typography variant={isMobile ? "h2Mobile" : "h2"} as="h2">
          Brand new models
        </Typography>
        <div className="flex gap-2 items-center">
          <button
            onClick={onPrevious}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
            aria-label="Previous models"
            disabled={currentIndex === 0 || isAnimating}
          >
            <Icon id="arrow-left" size={16} />
          </button>
          <button
            onClick={onNext}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
            aria-label="Next models"
            disabled={currentIndex >= maxIndex || isAnimating}
          >
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

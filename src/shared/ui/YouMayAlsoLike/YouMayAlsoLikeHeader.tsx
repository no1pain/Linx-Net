import React from "react";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";

interface YouMayAlsoLikeHeaderProps {
  isMobile: boolean;
  currentIndex: number;
  maxIndex: number;
  isAnimating: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const YouMayAlsoLikeHeader: React.FC<YouMayAlsoLikeHeaderProps> = ({
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
        <Typography
          variant={isMobile ? "h2Mobile" : "h2"}
          as="h2"
          className="font-mont text-[32px] font-bold leading-[41px] tracking-[-0.01em] text-[#313237]"
        >
          You may also like
        </Typography>
        <div className="flex gap-2 items-center">
          <button
            onClick={onPrevious}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
            aria-label="Previous products"
            disabled={currentIndex === 0 || isAnimating}
          >
            <Icon id="arrow-left" size={16} />
          </button>
          <button
            onClick={onNext}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
            aria-label="Next products"
            disabled={currentIndex >= maxIndex || isAnimating}
          >
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

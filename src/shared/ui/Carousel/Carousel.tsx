import React from "react";

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  heading?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ heading }) => {
  return (
    <div>
      {heading && (
        <div className="container mx-auto">
          <h1 className="text-[48px] font-normal mb-8 px-24">{heading}</h1>
        </div>
      )}

      <div className="flex w-full">
        <div className="bg-[#0F0F11] w-12 h-[580px] flex items-center justify-center cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex-1 bg-blue-500 h-[580px]"></div>

        <div className="bg-[#0F0F11] w-12 h-[580px] flex items-center justify-center cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12L10 8L6 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

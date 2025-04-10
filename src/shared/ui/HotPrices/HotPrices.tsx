import React from "react";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import iphonesData from "@shared/data/iphones.json";
import { HotPricePhone } from "@shared/data/hotprices";
import { useResponsive } from "@shared/hooks/useResponsive";
import { useCarousel } from "@shared/hooks/useCarousel";

export const HotPrices: React.FC = () => {
  const phones = iphonesData.slice(0, 8) as HotPricePhone[];
  const { isMobile } = useResponsive();

  const {
    currentIndex,
    isAnimating,
    containerRef,
    itemWidth,
    handlePrevious,
    handleNext,
    getItemsPerView,
    hasNext,
    hasPrevious,
  } = useCarousel({
    itemCount: phones.length,
    desktopItems: 4,
    tabletItems: 2,
    mobileItems: 1,
    gap: 16,
  });

  const HotPriceCard = ({ phone }: { phone: HotPricePhone }) => {
    return (
      <div className="border border-gray-200 p-6 flex flex-col h-full">
        <div className="flex justify-center mb-6">
          <img
            src={phone.image}
            alt={phone.title}
            className="max-h-48 object-contain"
          />
        </div>

        <h3 className="text-base font-medium">{phone.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{phone.subtitle}</p>

        <div className="flex items-center gap-2 mt-auto mb-4">
          <p className="text-xl font-semibold">${phone.price}</p>
          <p className="text-sm text-gray-500 line-through">
            ${phone.oldPrice}
          </p>
        </div>

        <div className="space-y-1 mb-4">
          {Object.entries(phone.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-500">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => console.log(`Add to cart: ${phone.title}`)}
            className="bg-[#313237] text-white py-2 px-4 flex-1 hover:bg-opacity-90 transition"
          >
            Add to cart
          </button>
          <button
            onClick={() => console.log(`Add to favorites: ${phone.title}`)}
            className="border border-gray-300 p-2 flex items-center justify-center"
          >
            <Icon id="heart" size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant={isMobile ? "h3" : "h2"} as="h2">
          Hot prices
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            aria-label="Previous models"
            disabled={!hasPrevious || isAnimating}
          >
            <Icon id="arrow-left" size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            aria-label="Next models"
            disabled={!hasNext || isAnimating}
          >
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="flex flex-nowrap gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (itemWidth + 16)}px)`,
          }}
        >
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="flex-shrink-0"
              style={{
                width: `${itemWidth}px`,
                maxWidth: "300px",
              }}
            >
              <HotPriceCard phone={phone} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

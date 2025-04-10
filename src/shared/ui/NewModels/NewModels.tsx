import React, { useState, useRef, useEffect } from "react";
import { ProductCard } from "@ui/ProductCard";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import iphonesData from "@shared/data/iphones.json";

export const NewModels: React.FC = () => {
  // Limit to 8 phones as requested
  const phones = iphonesData.slice(0, 8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const cardsToShow = 4; // Always show 4 cards at a time

  // Calculate card width when component mounts or window resizes
  useEffect(() => {
    const calculateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        // Each card takes 1/4 of the container width (minus gaps)
        setCardWidth((containerWidth - 16 * (cardsToShow - 1)) / cardsToShow);
      }
    };

    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);

    return () => {
      window.removeEventListener("resize", calculateCardWidth);
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= phones.length - cardsToShow) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h2" as="h2">
          Brand new models
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            aria-label="Previous models"
            disabled={currentIndex === 0 || isAnimating}
          >
            <Icon id="arrow-left" size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            aria-label="Next models"
            disabled={
              currentIndex >= phones.length - cardsToShow || isAnimating
            }
          >
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="flex flex-nowrap gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`, // Adding 16px for the gap
          }}
        >
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="flex-shrink-0"
              style={{
                width: `${cardWidth}px`,
                maxWidth: "300px",
              }}
            >
              <ProductCard
                title={phone.title}
                subtitle={phone.subtitle}
                price={phone.price}
                image={phone.image}
                specs={phone.specs}
                onAddToCart={() => console.log(`Add to cart: ${phone.title}`)}
                onAddToFavorites={() =>
                  console.log(`Add to favorites: ${phone.title}`)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { ProductCard } from "@ui/ProductCard";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import iphonesData from "@shared/data/iphones.json";

export const NewModels: React.FC = () => {
  const phones = iphonesData.slice(0, 8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const cardsToShow = 4;

  useEffect(() => {
    const calculateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        let divisor = cardsToShow;
        if (window.innerWidth >= 640 && window.innerWidth < 1280) {
          divisor = 2;
        } else if (window.innerWidth < 640) {
          divisor = 1;
        }

        setCardWidth((containerWidth - 16 * (divisor - 1)) / divisor);
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

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    let maxDisplayableCards = cardsToShow;
    if (window.innerWidth >= 640 && window.innerWidth < 1280) {
      maxDisplayableCards = 2;
    } else if (window.innerWidth < 640) {
      maxDisplayableCards = 1;
    }

    if (isAnimating || currentIndex >= phones.length - maxDisplayableCards)
      return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const getCardsPerView = () => {
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
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
              currentIndex >= phones.length - getCardsPerView() || isAnimating
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
            transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`,
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

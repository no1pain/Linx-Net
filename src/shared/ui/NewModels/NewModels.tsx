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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= phones.length - 3) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant={isMobile ? "h2Mobile" : "h2"} as="h2">
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
              disabled={currentIndex >= phones.length - 3 || isAnimating}
            >
              <Icon id="arrow-right" size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 296}px)`,
              marginRight: "-100px", // Allow partial visibility of next card
            }}
          >
            {phones.map((phone) => (
              <div
                key={phone.id}
                className="flex-shrink-0"
                style={{ width: "280px" }}
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
      </div>
    </section>
  );
};

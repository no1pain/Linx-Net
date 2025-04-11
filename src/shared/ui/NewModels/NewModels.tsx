import React from "react";
import { ProductCard } from "@ui/ProductCard";
import { Typography } from "@ui/Typography";
import { useNewModels, Phone } from "@/shared/hooks/useNewModels";
import { NewModelsHeader } from "./NewModelsHeader";

export const NewModels: React.FC = () => {
  const {
    phones,
    loading,
    currentIndex,
    isAnimating,
    containerRef,
    isMobile,
    handlePrevious,
    handleNext,
  } = useNewModels();

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <Typography
            variant={isMobile ? "h2Mobile" : "h2"}
            as="h2"
            className="mb-6"
          >
            Brand new models
          </Typography>
          <div className="text-center py-10">Loading new models...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <NewModelsHeader
          isMobile={isMobile}
          currentIndex={currentIndex}
          maxIndex={phones.length - (isMobile ? 1 : 4)}
          isAnimating={isAnimating}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <div className="-mx-4">
          <div className="px-4">
            <div className="overflow-hidden" ref={containerRef}>
              <div
                className="flex gap-4 transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentIndex * (272 + 16)}px)`,
                }}
              >
                {phones.map((phone) => (
                  <div key={phone.id} className="flex-shrink-0 w-[272px]">
                    <ProductCard
                      title={phone.title}
                      subtitle={
                        phone.model ? `(${phone.model})` : phone.subtitle
                      }
                      price={phone.price}
                      image={phone.image}
                      specs={phone.specs}
                      onAddToCart={() =>
                        console.log(`Add to cart: ${phone.title}`)
                      }
                      onAddToFavorites={() =>
                        console.log(`Add to favorites: ${phone.title}`)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

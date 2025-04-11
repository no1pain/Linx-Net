import React from "react";
import { ProductCard } from "@ui/ProductCard";
import { Typography } from "@ui/Typography";
import { useYouMayAlsoLike } from "@/shared/hooks/useYouMayAlsoLike";
import { YouMayAlsoLikeHeader } from "./YouMayAlsoLikeHeader";

export const YouMayAlsoLike: React.FC = () => {
  const {
    products,
    loading,
    currentIndex,
    isAnimating,
    containerRef,
    isMobile,
    handlePrevious,
    handleNext,
  } = useYouMayAlsoLike();

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <Typography
            variant={isMobile ? "h2Mobile" : "h2"}
            as="h2"
            className="font-mont text-[32px] font-bold leading-[41px] tracking-[-0.01em] text-[#313237] mb-6"
          >
            You may also like
          </Typography>
          <div className="text-center py-10">Loading related products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <YouMayAlsoLikeHeader
          isMobile={isMobile}
          currentIndex={currentIndex}
          maxIndex={products.length - (isMobile ? 1 : 4)}
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
                {products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-[272px]">
                    <ProductCard
                      id={product.id.toString()}
                      title={product.title}
                      subtitle={
                        product.model ? `(${product.model})` : product.subtitle
                      }
                      price={product.price}
                      oldPrice={product.fullPrice}
                      image={product.image}
                      specs={product.specs}
                      onAddToCart={() =>
                        console.log(`Add to cart: ${product.title}`)
                      }
                      onAddToFavorites={() =>
                        console.log(`Add to favorites: ${product.title}`)
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

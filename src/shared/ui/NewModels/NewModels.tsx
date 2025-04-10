import React, { useState } from "react";
import { ProductCard } from "@ui/ProductCard";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import iphonesData from "@shared/data/iphones.json";

export const NewModels: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const phonesPerPage = 4;
  const totalPages = Math.ceil(iphonesData.length / phonesPerPage);

  const currentPhones = iphonesData.slice(
    currentPage * phonesPerPage,
    (currentPage + 1) * phonesPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
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
          >
            <Icon id="arrow-left" size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            aria-label="Next models"
          >
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPhones.map((phone) => (
          <ProductCard
            key={phone.id}
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
        ))}
      </div>
    </section>
  );
};

import React from "react";
import { ProductCard } from "@ui/ProductCard";
import { Phone } from "../types";

interface PhoneGridProps {
  phones: Phone[];
}

export const PhoneGrid: React.FC<PhoneGridProps> = ({ phones }) => {
  return (
    <div className="flex flex-wrap justify-between -mx-2">
      {phones.map((phone, index) => (
        <div
          key={phone.id}
          className="px-2 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <ProductCard
            title={phone.title}
            subtitle={phone.subtitle}
            price={phone.price}
            oldPrice={
              index % 3 === 0 ? Math.round(phone.price * 1.2) : undefined
            }
            image={phone.image}
            specs={phone.specs}
            onAddToCart={() => console.log(`Add to cart: ${phone.title}`)}
            onAddToFavorites={() =>
              console.log(`Add to favorites: ${phone.title}`)
            }
            initialFavorite={index % 7 === 2}
          />
        </div>
      ))}
    </div>
  );
};

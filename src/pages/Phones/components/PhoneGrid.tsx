import React from "react";
import { ProductCard } from "@ui/ProductCard";
import { Phone } from "../types";

interface PhoneGridProps {
  phones: Phone[];
}

export const PhoneGrid: React.FC<PhoneGridProps> = ({ phones }) => {
  return (
    <div className="flex flex-wrap justify-between -mx-2">
      {phones.map((phone) => (
        <div
          key={phone.id}
          className="px-2 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <ProductCard
            id={phone.id.toString()}
            title={phone.title}
            subtitle={phone.subtitle}
            price={phone.price}
            oldPrice={phone.oldPrice}
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
  );
};

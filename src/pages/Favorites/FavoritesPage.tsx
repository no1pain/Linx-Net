import React from "react";
import { Typography } from "@ui/Typography";
import { useFavorites } from "@/shared/contexts/FavoritesContext";
import { ProductCard } from "@shared/ui/ProductCard";
import { NavLink } from "react-router-dom";

export const FavoritesPage: React.FC = () => {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <NavLink to="/" className="text-gray-500 hover:text-black">
          Home
        </NavLink>
        <span className="text-gray-500">&gt;</span>
        <span className="text-black">Favourites</span>
      </div>

      <Typography variant="h1" as="h1" className="text-3xl font-bold mb-2">
        Favourites
      </Typography>

      {favoritesCount > 0 && (
        <p className="text-gray-500 mb-8">
          {favoritesCount} {favoritesCount === 1 ? "item" : "items"}
        </p>
      )}

      {favoritesCount === 0 ? (
        <div className="text-center py-12">
          <Typography variant="h3" as="h3" className="mb-4">
            You haven't added any favourites yet
          </Typography>
          <p className="text-gray-500">
            Click the heart icon on any product to add it to your favourites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id}>
              <ProductCard
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                image={item.image}
                specs={item.specs}
                onAddToCart={() => console.log(`Add to cart: ${item.title}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

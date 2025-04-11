import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks";

export interface FavoriteItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  specs?: {
    [key: string]: string;
  };
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "linx-net-favorites";

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    STORAGE_KEY,
    []
  );

  const addToFavorites = (item: FavoriteItem) => {
    const itemId = String(item.id);
    if (!isFavorite(itemId)) {
      setFavorites((prev) => [...prev, { ...item, id: itemId }]);
    }
  };

  const removeFromFavorites = (id: string | number) => {
    const stringId = String(id);
    setFavorites((prev) => prev.filter((item) => item.id !== stringId));
  };

  const isFavorite = (id: string | number) => {
    const stringId = String(id);
    return favorites.some((item) => item.id === stringId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

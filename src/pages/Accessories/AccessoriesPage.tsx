import React, { useState, useEffect, useMemo } from "react";
import { Typography } from "@ui/Typography";
import { Link } from "react-router-dom";
import { ProductCard } from "@ui/ProductCard";
import { SortingDropdown } from "@ui/SortingDropdown";
import { ItemsPerPageDropdown } from "@ui/ItemsPerPageDropdown";
import { Pagination } from "@ui/Pagination";

interface Accessory {
  id: number | string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating?: number;
  stock?: number;
}

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Newest");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);

        // Use local accessories.json file
        const response = await fetch("/api/accessories.json");

        if (!response.ok) {
          throw new Error("Failed to fetch accessories data");
        }

        const data = await response.json();

        // Format the data to match our Accessory interface
        const formattedAccessories = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          description:
            item.description?.map((d: any) => d.text).join(" ") || "",
          price: item.priceDiscount,
          brand: item.namespaceId.split("-")[0] || "Generic",
          category: item.category || "Accessories",
          thumbnail: item.images[0],
          images: item.images,
          rating: 4.5, // Default rating
          stock: 10, // Default stock
        }));

        setAccessories(formattedAccessories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching accessories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  // Sort accessories based on selected option
  const sortedAccessories = useMemo(() => {
    if (!accessories.length) return [];

    const accessoriesToSort = [...accessories];

    switch (sortBy) {
      case "Alphabetically":
        return accessoriesToSort.sort((a, b) => a.title.localeCompare(b.title));
      case "Cheapest":
        return accessoriesToSort.sort((a, b) => a.price - b.price);
      case "Newest":
      default:
        return accessoriesToSort;
    }
  }, [accessories, sortBy]);

  const indexOfLastAccessory = currentPage * itemsPerPage;
  const indexOfFirstAccessory = indexOfLastAccessory - itemsPerPage;
  const currentAccessories = sortedAccessories.slice(
    indexOfFirstAccessory,
    indexOfLastAccessory
  );
  const totalPages = Math.ceil(sortedAccessories.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black">Accessories</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Accessories
        </Typography>
        <p className="text-sm text-gray-500">
          {loading
            ? "Loading..."
            : error
            ? "Error loading products"
            : `${sortedAccessories.length} items`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading accessories...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-12">
          <p className="text-error">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 items-end mb-8">
            <SortingDropdown value={sortBy} onChange={handleSortChange} />
            <ItemsPerPageDropdown
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentAccessories.map((accessory) => (
              <div key={accessory.id}>
                <ProductCard
                  id={accessory.id.toString()}
                  title={accessory.title}
                  subtitle={`${accessory.brand} | ${accessory.category}`}
                  price={accessory.price}
                  image={accessory.thumbnail}
                  specs={{
                    Brand: accessory.brand,
                    Category: accessory.category,
                    Stock: accessory.stock
                      ? `${accessory.stock} units`
                      : "Out of stock",
                  }}
                  onAddToCart={() =>
                    console.log(`Add to cart: ${accessory.title}`)
                  }
                  onAddToFavorites={() =>
                    console.log(`Add to favorites: ${accessory.title}`)
                  }
                />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

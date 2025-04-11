import React, { useState, useEffect, useMemo } from "react";
import { Typography } from "@ui/Typography";
import { Link } from "react-router-dom";
import { ProductCard } from "@ui/ProductCard";
import { SortingDropdown } from "@ui/SortingDropdown";
import { ItemsPerPageDropdown } from "@ui/ItemsPerPageDropdown";
import { Pagination } from "@ui/Pagination";

interface Product {
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

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Newest");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products directly from our local JSON file
        const response = await fetch("/api/tablets.json");

        if (!response.ok) {
          throw new Error("Failed to fetch tablets data");
        }

        const data = await response.json();

        const formattedProducts = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          description:
            item.description?.map((d: any) => d.text).join(" ") || "",
          price: item.priceDiscount,
          brand: item.namespaceId.split("-")[0] || "Generic",
          category: item.category || "Tablets",
          thumbnail: item.images[0],
          images: item.images,
          rating: 4.5, // Default rating
          stock: 10, // Default stock
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];

    const productsToSort = [...products];

    switch (sortBy) {
      case "Alphabetically":
        return productsToSort.sort((a, b) => a.title.localeCompare(b.title));
      case "Cheapest":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "Newest":
      default:
        return productsToSort;
    }
  }, [products, sortBy]);

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

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
        <span className="text-black">Tablets</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Tablets
        </Typography>
        <p className="text-sm text-gray-500">
          {loading
            ? "Loading..."
            : error
            ? "Error loading tablets"
            : `${sortedProducts.length} items`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading tablets...</p>
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
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  id={product.id.toString()}
                  title={product.title}
                  subtitle={`${product.brand} | ${product.category}`}
                  price={product.price}
                  oldPrice={product.price * 1.2}
                  image={product.thumbnail}
                  specs={{
                    Brand: product.brand,
                    Category: product.category,
                    Stock: product.stock
                      ? `${product.stock} units`
                      : "Out of stock",
                  }}
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

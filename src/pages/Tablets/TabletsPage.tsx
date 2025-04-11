import React, { useState, useEffect } from "react";
import { Typography } from "@ui/Typography";
import { Link } from "react-router-dom";
import { ProductCard } from "@ui/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  discountPercentage?: number;
  stock?: number;
}

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products directly from the API
        const response = await fetch("https://dummyjson.com/products?limit=0");

        if (!response.ok) {
          throw new Error("Failed to fetch from DummyJSON API");
        }

        const data = await response.json();
        setTotal(data.total);

        // Use the products directly as they come from the API
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black">Products</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Products
        </Typography>
        <p className="text-sm text-gray-500">
          {loading
            ? "Loading..."
            : error
            ? "Error loading products"
            : `${products.length} items`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-12">
          <p className="text-error">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                title={product.title}
                subtitle={`${product.brand} | ${product.category}`}
                price={product.price}
                image={product.thumbnail}
                specs={{
                  Brand: product.brand,
                  Category: product.category,
                  Stock: product.stock
                    ? `${product.stock} units`
                    : "Out of stock",
                  Rating: `${product.rating.toFixed(1)}/5`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

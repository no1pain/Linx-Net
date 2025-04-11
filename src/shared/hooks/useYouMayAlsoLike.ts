import { useState, useEffect, useRef } from "react";

export interface RelatedProduct {
  id: string;
  title: string;
  subtitle: string;
  model?: string;
  price: number;
  fullPrice: number;
  image: string;
  specs: {
    [key: string]: string;
  };
}

export const useYouMayAlsoLike = () => {
  const [products, setProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await response.json();

        // Get random products
        const randomProducts = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 8)
          .map((product: any) => ({
            id: product.itemId || product.id,
            title: product.name,
            subtitle: product.category || "",
            model: product.model,
            price: product.price || product.priceDiscount,
            fullPrice: product.fullPrice || product.price,
            image: product.image,
            specs: {
              Screen: product.screen || "N/A",
              Capacity: product.capacity || "N/A",
              RAM: product.ram || "N/A",
            },
          }));

        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    const maxVisibleItems = isMobile ? 1 : 4;
    if (isAnimating || currentIndex >= products.length - maxVisibleItems)
      return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return {
    products,
    loading,
    currentIndex,
    isAnimating,
    containerRef,
    isMobile,
    handlePrevious,
    handleNext,
  };
};

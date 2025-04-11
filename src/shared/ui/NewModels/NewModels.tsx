import React, { useState, useRef, useEffect } from "react";
import { ProductCard } from "@ui/ProductCard";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";

interface Phone {
  id: string;
  title: string;
  subtitle: string;
  model?: string;
  price: number;
  image: string;
  specs: {
    [key: string]: string;
  };
}

export const NewModels: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("/api/phones.json");
        if (!response.ok) {
          throw new Error("Failed to fetch phones data");
        }

        const data = await response.json();

        // Map the API data format to our component's format
        const formattedPhones = data.slice(0, 8).map((phone: any) => ({
          id: phone.id,
          title: phone.name,
          subtitle: `${phone.capacity} | ${phone.color}`,
          model: phone.id.includes("-")
            ? phone.id.split("-").pop()?.toUpperCase()
            : null,
          price: phone.priceRegular,
          image: phone.images[0],
          specs: {
            Screen: phone.screen,
            Capacity: phone.capacity,
            RAM: phone.ram,
          },
        }));

        setPhones(formattedPhones);
      } catch (error) {
        console.error("Error fetching phones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
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
    if (isAnimating || currentIndex >= phones.length - maxVisibleItems) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <Typography
            variant={isMobile ? "h2Mobile" : "h2"}
            as="h2"
            className="mb-6"
          >
            Brand new models
          </Typography>
          <div className="text-center py-10">Loading new models...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-12">
          <div className="col-span-4 sm:col-span-12 flex justify-between items-center mb-6">
            <Typography variant={isMobile ? "h2Mobile" : "h2"} as="h2">
              Brand new models
            </Typography>
            <div className="flex gap-2 items-center">
              <button
                onClick={handlePrevious}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
                aria-label="Previous models"
                disabled={currentIndex === 0 || isAnimating}
              >
                <Icon id="arrow-left" size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center bg-white"
                aria-label="Next models"
                disabled={
                  currentIndex >= phones.length - (isMobile ? 1 : 4) ||
                  isAnimating
                }
              >
                <Icon id="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4">
          <div className="px-4">
            <div className="overflow-hidden" ref={containerRef}>
              <div
                className="flex gap-4 transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentIndex * (272 + 16)}px)`,
                }}
              >
                {phones.map((phone) => (
                  <div key={phone.id} className="flex-shrink-0 w-[272px]">
                    <ProductCard
                      title={phone.title}
                      subtitle={
                        phone.model ? `(${phone.model})` : phone.subtitle
                      }
                      price={phone.price}
                      image={phone.image}
                      specs={phone.specs}
                      onAddToCart={() =>
                        console.log(`Add to cart: ${phone.title}`)
                      }
                      onAddToFavorites={() =>
                        console.log(`Add to favorites: ${phone.title}`)
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

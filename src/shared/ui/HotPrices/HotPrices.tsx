import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import { useCart } from "@/shared/contexts/CartContext";
import { useFavorites } from "@/shared/contexts/FavoritesContext";

interface Phone {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/phones.json");
        const data = await response.json();

        const discountedPhones = data
          .filter((phone: Phone) => phone.priceDiscount < phone.priceRegular)
          .slice(0, 8);

        setPhones(discountedPhones);
      } catch (error) {
        console.error("Error fetching hot prices phones:", error);
      } finally {
        setIsLoading(false);
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
    if (isAnimating || currentIndex >= phones.length - 3) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAddToCart = (phone: Phone) => {
    addToCart({
      id: phone.id,
      title: phone.name,
      subtitle: `${phone.capacity} ${phone.color}`,
      price: phone.priceDiscount,
      image: phone.images[0],
      specs: {
        Screen: phone.screen,
        Resolution: phone.resolution,
        Processor: phone.processor,
        RAM: phone.ram,
      },
    });
  };

  const handleToggleFavorite = (phone: Phone) => {
    if (isFavorite(phone.id)) {
      removeFromFavorites(phone.id);
    } else {
      addToFavorites({
        id: phone.id,
        title: phone.name,
        subtitle: `${phone.capacity} ${phone.color}`,
        price: phone.priceDiscount,
        image: phone.images[0],
        specs: {
          Screen: phone.screen,
          Resolution: phone.resolution,
          Processor: phone.processor,
          RAM: phone.ram,
        },
      });
    }
  };

  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `/${imagePath}`;
  };

  const HotPriceCard = ({ phone }: { phone: Phone }) => {
    const inCart = isInCart(phone.id);
    const isInFavorites = isFavorite(phone.id);

    return (
      <div className="border border-gray-200 p-6 flex flex-col h-full">
        <div className="flex justify-center mb-6">
          <img
            src={getImagePath(phone.images[0])}
            alt={phone.name}
            className="max-h-48 object-contain"
          />
        </div>

        <h3 className="text-base font-medium">{phone.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{`${phone.capacity} ${phone.color}`}</p>

        <div className="flex items-center gap-2 mt-auto mb-4">
          <p className="text-xl font-semibold">${phone.priceDiscount}</p>
          <p className="text-sm text-gray-500 line-through">
            ${phone.priceRegular}
          </p>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Screen</span>
            <span>{phone.screen}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Resolution</span>
            <span>{phone.resolution}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Processor</span>
            <span>{phone.processor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">RAM</span>
            <span>{phone.ram}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(phone)}
            className={`py-2 px-4 flex-1 transition ${
              inCart
                ? "bg-white text-green-600 border border-gray-300"
                : "bg-[#313237] text-white hover:bg-opacity-90"
            }`}
          >
            {inCart ? "Added to cart" : "Add to cart"}
          </button>
          <button
            onClick={() => handleToggleFavorite(phone)}
            className="border border-gray-300 p-2 flex items-center justify-center"
            aria-label={
              isInFavorites ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Icon id={isInFavorites ? "heart-active" : "heart"} size={16} />
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <div className="text-center py-16">
            <p>Loading hot prices...</p>
          </div>
        </div>
      </section>
    );
  }

  if (phones.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-12">
          <div className="col-span-4 sm:col-span-12 flex justify-between items-center mb-6">
            <Typography variant={isMobile ? "h3" : "h2"} as="h2">
              Hot prices
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
                disabled={currentIndex >= phones.length - 3 || isAnimating}
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
                  transform: `translateX(-${currentIndex * 288}px)`,
                }}
              >
                {phones.map((phone) => (
                  <div key={phone.id} className="flex-shrink-0 w-[272px]">
                    <HotPriceCard phone={phone} />
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

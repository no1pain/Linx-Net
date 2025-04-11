import { useState, useEffect, useRef } from "react";

export interface Phone {
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

export const useNewModels = () => {
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

  return {
    phones,
    loading,
    currentIndex,
    isAnimating,
    containerRef,
    isMobile,
    handlePrevious,
    handleNext,
  };
};

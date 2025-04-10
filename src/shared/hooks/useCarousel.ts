import { useState, useRef, useEffect, MutableRefObject } from "react";
import { useResponsive } from "./useResponsive";

interface CarouselOptions {
  itemCount: number;
  desktopItems?: number;
  tabletItems?: number;
  mobileItems?: number;
  gap?: number;
}

interface CarouselState {
  currentIndex: number;
  isAnimating: boolean;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  itemWidth: number;
  handlePrevious: () => void;
  handleNext: () => void;
  getItemsPerView: () => number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const useCarousel = ({
  itemCount,
  desktopItems = 4,
  tabletItems = 2,
  mobileItems = 1,
  gap = 16,
}: CarouselOptions): CarouselState => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const { isTablet, isDesktop } = useResponsive();

  const getItemsPerView = (): number => {
    if (isDesktop) return desktopItems;
    if (isTablet) return tabletItems;
    return mobileItems;
  };

  useEffect(() => {
    const calculateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        const itemsPerView = getItemsPerView();
        setItemWidth(
          (containerWidth - gap * (itemsPerView - 1)) / itemsPerView
        );
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);

    return () => {
      window.removeEventListener("resize", calculateItemWidth);
    };
  }, [gap]);

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    const itemsPerView = getItemsPerView();

    if (isAnimating || currentIndex >= itemCount - itemsPerView) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const hasNext = currentIndex < itemCount - getItemsPerView();
  const hasPrevious = currentIndex > 0;

  return {
    currentIndex,
    isAnimating,
    containerRef,
    itemWidth,
    handlePrevious,
    handleNext,
    getItemsPerView,
    hasNext,
    hasPrevious,
  };
};

import { useState, useRef, useEffect, MutableRefObject } from "react";
import { useResponsive } from "./useResponsive";

interface CarouselOptions {
  itemCount: number;
  desktopItems?: number;
  tabletItems?: number;
  mobileItems?: number;
  gap?: number;
  desktopBreakpoint?: number;
  tabletBreakpoint?: number;
}

interface CarouselState {
  currentIndex: number;
  isAnimating: boolean;
  containerRef: MutableRefObject<HTMLDivElement | null | undefined>;
  itemWidth: number;
  handlePrevious: () => void;
  handleNext: () => void;
  getItemsPerView: () => number;
  hasNext: boolean;
  hasPrevious: boolean;
  isMobile: boolean;
}

export const useCarousel = ({
  itemCount,
  desktopItems = 4,
  tabletItems = 2,
  mobileItems = 1,
  gap = 16,
  desktopBreakpoint = 1280,
  tabletBreakpoint = 640,
}: CarouselOptions): CarouselState => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const getItemsPerView = (): number => {
    if (window.innerWidth >= desktopBreakpoint) return desktopItems;
    if (window.innerWidth >= tabletBreakpoint) return tabletItems;
    return mobileItems;
  };

  useEffect(() => {
    const calculateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        setIsMobile(window.innerWidth < tabletBreakpoint);

        let divisor = desktopItems; // Desktop default
        if (
          window.innerWidth >= tabletBreakpoint &&
          window.innerWidth < desktopBreakpoint
        ) {
          divisor = tabletItems; // Tablet
        } else if (window.innerWidth < tabletBreakpoint) {
          divisor = mobileItems; // Mobile
        }

        setItemWidth((containerWidth - gap * (divisor - 1)) / divisor);
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);

    return () => {
      window.removeEventListener("resize", calculateItemWidth);
    };
  }, [
    gap,
    desktopItems,
    tabletItems,
    mobileItems,
    desktopBreakpoint,
    tabletBreakpoint,
  ]);

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    let maxDisplayableItems = desktopItems;
    if (
      window.innerWidth >= tabletBreakpoint &&
      window.innerWidth < desktopBreakpoint
    ) {
      maxDisplayableItems = tabletItems;
    } else if (window.innerWidth < tabletBreakpoint) {
      maxDisplayableItems = mobileItems;
    }

    if (isAnimating || currentIndex >= itemCount - maxDisplayableItems) return;

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
    isMobile,
  };
};

import React from "react";
import { Carousel, CarouselSlide } from "@ui/Carousel";

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Now available in our store! 👌",
    subtitle: "Be the first!",
    buttonText: "ORDER NOW",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max",
    subtitle: "Pro. Beyond.",
    buttonText: "LEARN MORE",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617559",
  },
];

export const HomeCarousel: React.FC = () => {
  return <Carousel slides={slides} />;
};

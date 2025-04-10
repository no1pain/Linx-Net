import React from "react";
import { Carousel } from "@ui/Carousel";

const carouselImages = [
  "/images/Carousel1.png",
  "/images/Carousel1.png",
  "/images/Carousel1.png",
];

export const HomeCarousel: React.FC = () => {
  return <Carousel images={carouselImages} />;
};

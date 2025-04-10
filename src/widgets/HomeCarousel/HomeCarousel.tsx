import React from "react";
import { Carousel } from "@ui/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const carouselImages = [
  "/images/Carousel1.png",
  "/images/Carousel1.png",
  "/images/Carousel1.png",
];

const mobileImages = [
  "/images/CarouselMobile1.png",
  "/images/CarouselMobile1.png",
  "/images/CarouselMobile1.png",
];

export const HomeCarousel: React.FC = () => {
  return (
    <>
      <div className="block sm:hidden w-screen -ml-[16px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {mobileImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop carousel (hidden on mobile) */}
      <div className="hidden sm:block">
        <Carousel images={carouselImages} />
      </div>
    </>
  );
};

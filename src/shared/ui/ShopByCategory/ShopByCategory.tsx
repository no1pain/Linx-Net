import React from "react";
import { Typography } from "@ui/Typography";
import { Link } from "react-router-dom";
import { categories } from "@shared/data/categories";
import { useResponsive } from "@shared/hooks/useResponsive";

export const ShopByCategory: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <section className="py-8">
      <Typography variant={isMobile ? "h3" : "h2"} as="h2" className="mb-6">
        Shop by category
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="block transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative overflow-hidden rounded-sm bg-[#313237]">
              <div className="h-[400px] sm:h-[200px] md:h-[250px] lg:h-[370px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <Typography variant="h3" as="h3" className="text-white mb-1">
                  {category.name}
                </Typography>
                <div className="text-sm text-[#B4BDC3] font-mont">
                  {category.models} models
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

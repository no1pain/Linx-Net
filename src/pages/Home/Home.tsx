import React, { useState, useEffect } from "react";
import { Typography } from "@ui/Typography";
import { Grid } from "@ui/layout/Grid";
import { Container } from "@ui/layout/Container";
import { HomeCarousel } from "@widgets/HomeCarousel";
import { NewModels } from "@ui/NewModels";
import { ShopByCategory } from "@ui/ShopByCategory";
import { HotPrices } from "@shared/ui/HotPrices/HotPrices";

export const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Container>
      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <Typography variant={isMobile ? "h1Mobile" : "h1"} className="mb-6">
            Welcome to Nice Gadgets store!
          </Typography>
          <HomeCarousel />
        </div>
      </Grid>

      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <NewModels />
        </div>
      </Grid>

      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <ShopByCategory />
        </div>
      </Grid>

      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <HotPrices />
        </div>
      </Grid>
    </Container>
  );
};

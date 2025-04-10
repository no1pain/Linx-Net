import React, { useState, useEffect } from "react";
import { Typography } from "@ui/Typography";
import { Grid } from "@ui/layout/Grid";
import { Container } from "@ui/layout/Container";
import { HomeCarousel } from "@widgets/HomeCarousel";
import { NewModels } from "@ui/NewModels";

export const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
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
    </Container>
  );
};

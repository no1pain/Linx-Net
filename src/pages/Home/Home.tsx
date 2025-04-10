import React from "react";
import { Typography } from "@ui/Typography";
import { Grid } from "@ui/layout/Grid";
import { Container } from "@ui/layout/Container";
import { HomeCarousel } from "@widgets/HomeCarousel";

export const HomePage: React.FC = () => {
  return (
    <Container>
      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <Typography variant="h1" className="mb-6">
            Welcome to Nice Gadgets store!
          </Typography>
          <HomeCarousel />
        </div>
      </Grid>
    </Container>
  );
};

import React from "react";
import { Typography } from "@ui/Typography";
import { Grid } from "@ui/layout/Grid";
import { Container } from "@ui/layout/Container";
import { HomeCarousel } from "@widgets/HomeCarousel";
import { NewModels } from "@ui/NewModels";

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

      <Grid className="py-6">
        <div className="col-span-4 sm:col-span-12 xl:col-span-24">
          <NewModels />
        </div>
      </Grid>
    </Container>
  );
};

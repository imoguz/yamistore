import React from "react";
import { Box } from "@mui/material";
const CarouselImage: React.FC<CarouselImageProps> = ({ text, image }) => {
  return (
    <Box
      component="img"
      src={image}
      alt={text}
      sx={{
        width: "100%",
        height: { xs: 280, sm: 350, md: 450, lg: 550 },
      }}
    />
  );
};

export default CarouselImage;

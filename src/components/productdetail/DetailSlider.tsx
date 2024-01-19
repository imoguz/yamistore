import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface IDetailSlider {
  title: string;
}
const DetailSlider: React.FC<IDetailSlider> = ({ title }) => {
  const [value, setValue] = React.useState(0);

  const handleClick = (newValue: number) => {
    setValue(newValue);
    console.log(newValue);
  };

  const images = [
    "/assets/mainpage/popCategory/woman-bag.jpg",
    "/assets/mainpage/popCategory/kids-pants.jpg",
    "/assets/mainpage/popCategory/baby-onesie.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/kids-toys.jpg",
    "/assets/mainpage/popCategory/women-jewelry.jpg",
    "/assets/mainpage/popCategory/kids-sneakers.jpg",
  ];

  return (
    <Box
      sx={{
        width: "95%",
        mx: "auto",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          sx: {
            display: "none",
          },
        }}
        sx={{
          "& .MuiTabScrollButton-root": {
            color: "#424242",
          },
          "& svg": {
            fontSize: { xs: 35, md: 40 },
            "&:hover": { fontSize: { xs: 40, md: 45 } },
            "&:active": { fontSize: { xs: 35, md: 40 } },
          },
        }}
      >
        {images.map((image, index) => (
          <Tab
            key={index}
            icon={
              <Box
                component="img"
                src={image}
                alt={`image-${index}`}
                sx={{
                  width: { xs: 100, sm: 120, md: 150 },
                  height: { xs: 100, sm: 120, md: 150 },
                  "&:hover": { boxShadow: 5 },
                }}
              />
            }
            onClick={(event) => handleClick(index)}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default DetailSlider;

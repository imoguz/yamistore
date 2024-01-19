import { Swiper, SwiperSlide } from "swiper/react";
import { popularCategories } from "../../helpers/mainPageData";
import { Box, Typography } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

const PopularCategories = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Popular categories
      </Typography>

      <Swiper
        style={{ paddingTop: 1, height: 200 }}
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper: any) => console.log(swiper)}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          650: {
            slidesPerView: 4,
          },
          850: {
            slidesPerView: 5,
          },
          1050: {
            slidesPerView: 6,
          },
          1250: {
            slidesPerView: 7,
          },
          1500: {
            slidesPerView: 8,
          },
        }}
      >
        <div>
          {popularCategories.map(({ image, category, subCategory }, index) => (
            <SwiperSlide key={index}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box
                  className="imgbox"
                  height={150}
                  width={150}
                  textAlign="center"
                  sx={{
                    opacity: 0.8,
                    p: 0.1,
                    transition: "opacity 0.3s",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: 1,
                    },
                    "&:hover + .text": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`${category}/${subCategory}`}
                    sx={{
                      width: "90%",
                      height: "90%",
                      objectFit: "cover",
                      borderRadius: 50,
                      boxShadow: 5,
                    }}
                  />
                </Box>
                <Box
                  className="text"
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    opacity: 0.8,
                    transition: "opacity 0.3s",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: 1,
                    },
                  }}
                >
                  <Typography>{category}</Typography>
                  <Typography>{subCategory}</Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </Box>
  );
};

export default PopularCategories;

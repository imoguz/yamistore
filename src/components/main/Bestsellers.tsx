import React from "react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Typography from "@mui/material/Typography";
import CarouselCard from "./CarouselCard";
import Box from "@mui/material/Box";
import { bestsellerData } from "../../helpers/mainPageData";

export default function Bestsellers() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Bestsellers
      </Typography>
      <Swiper
        style={{ height: 275 }}
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          997: {
            slidesPerView: 4,
          },
          1258: {
            slidesPerView: 5,
          },
          1496: {
            slidesPerView: 6,
          },
        }}
        // onSwiper={(swiper: any) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <div>
          {bestsellerData.map((item) => (
            <SwiperSlide key={item.title}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CarouselCard item={item} />
              </Box>
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </React.Fragment>
  );
}

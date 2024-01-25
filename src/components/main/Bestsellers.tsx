import React from "react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Typography from "@mui/material/Typography";
import CarouselCard from "./CarouselCardPR";
import Box from "@mui/material/Box";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { readProducts } from "../../features/productSlice";

export default function Bestsellers() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(readProducts());
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Bestsellers
      </Typography>
      <Swiper
        style={{ height: 340 }}
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
          {products.map((item) => (
            <SwiperSlide key={item._id}>
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

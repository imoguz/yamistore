import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";
import Style from "./main.module.scss";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { readBanners } from "../../features/bannerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Banner() {
  const { banners } = useAppSelector((state) => state.banner);
  const dispatch = useAppDispatch();
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  useEffect(() => {
    const readBannerFn = async () => {
      await dispatch(readBanners());
    };
    readBannerFn();
  }, [dispatch]);

  return (
    <Carousel fade className={Style.carouselContainer}>
      {banners &&
        banners.map(({ image_url, label, description, link }, index) => (
          <Carousel.Item key={index}>
            <CarouselImage text={label} image={imageURL + image_url} />
            <Carousel.Caption>
              <h3>{label}</h3>
              <p>{description}</p>
              <Button
                variant="contained"
                color="error"
                startIcon={<LocalGroceryStoreIcon />}
                sx={{ mb: 3 }}
              >
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default Banner;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [imageToggle, setImageToggle] = React.useState<Boolean>(false);

  const mainImages = product.images
    ?.map((image) => (image.isMainImage ? image.url : null))
    .filter((url) => url !== null);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  return (
    <Card
      sx={{
        minWidth: 300,
        height: 400,
        borderRadius: 0,
        "&:hover": { cursor: "pointer" },
      }}
      onClick={() =>
        navigate(`/productdetail/${product.slug}`, {
          state: { productId: product._id },
        })
      }
    >
      <Box
        sx={{
          height: 300,
          width: 300,
          backgroundImage:
            mainImages.length > 1
              ? `url(${imageURL}${imageToggle ? mainImages[1] : mainImages[0]})`
              : mainImages.length === 1
              ? `url(${imageURL + mainImages[0]})`
              : `url("/assets/noImageAvailable.jpg")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          objectFit: "cover",
          transition: "background-image 0.2s ease-in",
        }}
        title="productmainimage"
        onMouseOver={() => setImageToggle(true)}
        onMouseLeave={() => setImageToggle(false)}
      ></Box>
      <CardContent sx={{ pt: 0.5 }}>
        {["#aa5345", "#34aa45", "#3453aa", "#efefef", "#bebe12"].map(
          (item, index) => (
            <SquareIcon key={index} sx={{ color: item, mb: 1 }} />
          )
        )}
        <Typography variant="body2" component="span">
          +8
        </Typography>
        <Typography variant="body1" color="text.primary">
          Cardigan
        </Typography>
        <Typography component="span" variant="body1" color="text.primary">
          $750
        </Typography>
        <Typography
          variant="body1"
          display="inline"
          sx={{ color: "gray", ml: 3, textDecoration: "line-through" }}
        >
          $850
        </Typography>
      </CardContent>
      {/* <CardActions></CardActions> */}
    </Card>
  );
};

export default ProductCard;

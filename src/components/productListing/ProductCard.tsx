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
  const [hoveredColor, setHoveredColor] = React.useState<string | null>(null);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  const mainImages = product.images
    ?.map((image) => (image.isMainImage ? image.url : null))
    .filter((url) => url !== null);

  const uniqueColors = [
    ...new Set(
      product.variants.map((item) => {
        return item.color_id.hex_code;
      })
    ),
  ];

  const colorOptions = uniqueColors.map((color) => {
    const variant = product.variants.find(
      (item) => item.color_id.hex_code === color
    );
    return { hex_code: color, image_url: variant?.image_url };
  });

  const backgroundImage = () => {
    if (hoveredColor) {
      return `url(${imageURL}${hoveredColor})`;
    } else if (mainImages.length > 1) {
      return `url(${imageURL}${imageToggle ? mainImages[1] : mainImages[0]})`;
    } else if (mainImages.length === 1) {
      return `url(${imageURL + mainImages[0]})`;
    } else {
      return `url("/assets/noImageAvailable.jpg")`;
    }
  };

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
          backgroundImage: backgroundImage(),

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
        {colorOptions.map((item, index) => (
          <SquareIcon
            key={index}
            sx={{ color: item.hex_code, mb: 1 }}
            onMouseOver={() =>
              item.image_url && setHoveredColor(item.image_url)
            }
          />
        ))}
        <Typography variant="body1" color="text.primary">
          {product.name}
        </Typography>
        {product && (
          <Box display="flex" gap={2}>
            <Typography component="span" variant="body1" color="text.primary">
              $
              {(
                product?.price -
                (product && product.discount.type === "monetary"
                  ? product.discount.amount
                  : (product?.price * product?.discount.amount) / 100)
              ).toFixed(2)}
            </Typography>

            <Typography
              variant="body1"
              display="inline"
              sx={{ color: "gray", textDecoration: "line-through" }}
            >
              ${product?.price}
            </Typography>

            <Typography component="span" variant="body1" color="green">
              {product?.discount.type === "monetary" && "$"}
              {product?.discount.amount}
              {product?.discount.type === "percentage" && "%"} off
            </Typography>
          </Box>
        )}
      </CardContent>
      {/* <CardActions></CardActions> */}
    </Card>
  );
};

export default ProductCard;

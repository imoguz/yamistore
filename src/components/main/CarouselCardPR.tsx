import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// CarouselCart props
interface CarouselCartProps {
  item: IProduct;
}

const CarouselCard: React.FC<CarouselCartProps> = ({ item }) => {
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minWidth: 240,
        maxWidth: 240,
        height: 300,
        "&:hover": { cursor: "pointer" },
      }}
      onClick={() =>
        navigate(`/productdetail/${item.slug}`, {
          state: { productId: item._id },
        })
      }
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 220,
          objectFit: "fill",
          objectPosition: "center center",
          mx: "auto",
        }}
        image={`${imageURL + item.images[0].url}`}
        title={item.name}
      />
      <CardContent sx={{ pt: 0.5 }}>
        <Typography variant="body1" color="text.primary" fontSize={14} noWrap>
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          fontSize={14}
          color="text.secondary"
          gutterBottom
          noWrap
        >
          {item.description}
        </Typography>
        {item && (
          <Box display="flex" gap={2}>
            <Typography component="span" variant="body1" color="text.primary">
              $
              {(
                item?.price -
                (item && item.discount.type === "monetary"
                  ? item.discount.amount
                  : (item?.price * item?.discount.amount) / 100)
              ).toFixed(2)}
            </Typography>

            <Typography
              variant="body1"
              display="inline"
              sx={{ color: "gray", textDecoration: "line-through" }}
            >
              ${item?.price}
            </Typography>

            <Typography component="span" variant="body1" color="green">
              {item?.discount.type === "monetary" && "$"}
              {item?.discount.amount}
              {item?.discount.type === "percentage" && "%"} off
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CarouselCard;

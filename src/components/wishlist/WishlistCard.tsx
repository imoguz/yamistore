import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { readWishlist, deleteWishlist } from "../../features/wishlistSlice";
import ErrorPage from "../../pages/ErrorPage";

interface IWishlistCardProps {
  item: IWishlist;
}
const WishlistCard: React.FC<IWishlistCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.wishlist);

  const defaultVariant = item.product_id.variants.find(
    (variant) => variant.isDefault
  );
  const discount =
    item.product_id.discount.type === "monetary"
      ? item.product_id.discount.amount
      : (item.product_id.price * item.product_id.discount.amount) / 100;

  const handleDelete = async () => {
    await dispatch(deleteWishlist(item._id));
    await dispatch(readWishlist(item.user_id._id));
  };

  const mainImages = item.product_id.images?.find((image) => image.isMainImage);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Card sx={{ width: 300, p: 1, position: "relative" }}>
      {loading && (
        <Box
          sx={{
            // display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ position: "absolute", right: 5, top: 1 }}>
        <CancelPresentationIcon
          fontSize="small"
          onClick={handleDelete}
          sx={{
            color: "#554b4b",
            cursor: "pointer",
            "&:hover": { color: "#850303" },
          }}
        />
      </Box>

      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        image={
          mainImages
            ? imageURL + "/" + mainImages.url
            : "/assets/noImageAvailable.jpg"
        }
        title="wishImage"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.product_id.name}
        </Typography>
        <Typography variant="body2" mb={0.3}>
          Color:{" "}
          {defaultVariant &&
            defaultVariant?.color_id.name[0].toUpperCase() +
              defaultVariant?.color_id.name.slice(1)}
        </Typography>
        <Typography variant="body2">
          Size: {defaultVariant?.size_id.name}
        </Typography>
        <Box display="flex" gap={2}>
          <Typography component="span" variant="body1" color="text.primary">
            ${(item.product_id?.price - discount).toFixed(2)}
          </Typography>
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "gray", textDecoration: "line-through" }}
          >
            {item.product_id?.price}
          </Typography>
          <Typography component="span" variant="body1" color="error">
            {item.product_id?.discount.type === "monetary" && "$"}
            {item.product_id?.discount.amount}
            {item.product_id?.discount.type === "percentage" && "%"} off
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" gap={2} mx="auto">
          <Button color="success" variant="contained" size="small">
            Add to Cart
          </Button>
          <Button color="error" variant="contained" size="small">
            Product Detail
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
export default WishlistCard;

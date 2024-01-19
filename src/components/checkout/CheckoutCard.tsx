import React from "react";
import { Box, Grid, Select, Tooltip, SelectChangeEvent } from "@mui/material";
import { CardMedia, FormControl, MenuItem, Typography } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateCart, readCart, deleteCart } from "../../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createWishlist, readWishlist } from "../../features/wishlistSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorPage from "../../pages/ErrorPage";

interface ICheckoutCardProps {
  item: ICart;
}
const CheckoutCard: React.FC<ICheckoutCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const [quantity, setQuantity] = React.useState<number>(item.quantity);
  const [deletedItem, setDeletedItem] = React.useState<string | null>(null);
  const { loading, error } = useAppSelector((state) => state.cart);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;
  const discount =
    item.product_id.discount.type === "monetary"
      ? item.product_id.discount.amount
      : (item.product_id.price * item.product_id.discount.amount) / 100;

  const handleQuantity = async (event: SelectChangeEvent<number>) => {
    setQuantity(+event.target.value);
    await dispatch(
      updateCart({
        updateCartItem: {
          data: { quantity: +event.target.value },
          cartId: item._id,
        },
      })
    );

    await dispatch(readCart(item.user_id._id));
  };

  const handleAddWishlist = async () => {
    const newWishlist: INewWishlist = {
      user_id: item.user_id._id,
      product_id: item.product_id._id,
    };
    await dispatch(createWishlist({ newWishlist }));
    await dispatch(readWishlist(item.user_id._id));
  };

  const handleDeleteCartItem = async () => {
    setDeletedItem(item._id);
    await dispatch(deleteCart(item._id));
    await dispatch(readCart(item.user_id._id));
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      {loading && deletedItem === item._id && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Grid
        item
        xs={7}
        sm={3}
        md={5}
        lg={2}
        order={{ xs: 1, sm: 1, md: 1, lg: 1 }}
        // container
        // alignItems="flex-start"
      >
        <CardMedia
          component="img"
          sx={{
            height: 135,
            objectFit: "contain",
            width: { xs: 145, sm: 130, md: 145 },
          }}
          image={imageURL + "/" + item.variant_id.image_url}
          title="productimg"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        md={12}
        lg={7}
        order={{ xs: 3, sm: 2, md: 3, lg: 2 }}
      >
        <Box ml={1}>
          <Typography variant="body2" mb={0.3}>
            {item.product_id.name}
          </Typography>
          <Typography variant="body2" mb={0.3}>
            Size: {item.variant_id.size_id.name}
          </Typography>
          <Typography variant="body2" mb={0.3}>
            Color:{" "}
            {item?.variant_id?.color_id?.name[0]?.toUpperCase() +
              item?.variant_id?.color_id?.name?.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.primary">
            ${(item.product_id.price - discount).toFixed(2)}{" "}
            <Typography
              variant="body2"
              display="inline"
              sx={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              ${item.product_id.price}
            </Typography>
          </Typography>
        </Box>
        <Box
          display={{ xs: "flex", sm: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <FormControl sx={{ m: 1, width: 80 }}>
            <Select
              value={quantity}
              onChange={(event) => handleQuantity(event)}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                borderRadius: 0,
                height: 35,
              }}
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  style: {
                    maxHeight: 265,
                  },
                },
              }}
              IconComponent={(props) => (
                <InputAdornment position="end" {...props} sx={{ mt: 1 }}>
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                </InputAdornment>
              )}
            >
              {[...Array(99)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1} sx={{ py: 0.1 }}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mt={1}
            pl={{ xs: 1, md: 4 }}
          >
            {item.variant_id.stock > 0 ? (
              item.variant_id.stock >= quantity ? (
                <>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography variant="subtitle1"> In stock </Typography>
                </>
              ) : (
                <>
                  <ErrorOutlineIcon color="warning" />
                  <Typography variant="subtitle1">
                    Insufficient stock available. Only {item.variant_id.stock}{" "}
                    remaining.
                  </Typography>
                </>
              )
            ) : (
              <>
                <WarningAmberIcon color="warning" />
                <Typography variant="subtitle1"> Out of stock </Typography>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={5}
        sm={12}
        md={7}
        lg={3}
        order={{ xs: 2, sm: 3, md: 2, lg: 3 }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row", md: "column" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex">
          <Tooltip title="Delete Item">
            <IconButton aria-label="delete" onClick={handleDeleteCartItem}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Item">
            <IconButton
              aria-label="delete"
              onClick={() =>
                navigate(`/productdetail/${item.product_id.slug}`, {
                  state: {
                    productId: item.product_id._id,
                    variantId: {
                      ...item.variant_id,
                      quantity,
                      cartId: item._id,
                    },
                  },
                })
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Wishlist">
            <IconButton aria-label="favorite" onClick={handleAddWishlist}>
              {wishlist.find(
                (wish) =>
                  wish.user_id._id === item.user_id._id &&
                  wish.product_id._id === item.product_id._id
              ) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          mr={{ xs: 2, sm: 0 }}
          display={{ xs: "block", sm: "flex", md: "block" }}
          gap={{ xs: 1 }}
        >
          <Typography variant="body1">Item Total</Typography>
          <Typography variant="body1" component={"span"}>
            ${((item.product_id.price - discount) * quantity).toFixed(2)}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default CheckoutCard;

import React, { useEffect, useState } from "react";
import { CircularProgress, InputAdornment, Typography } from "@mui/material";
import { Paper, Grid, Divider, Button, Box, IconButton } from "@mui/material";
import { MenuItem, FormControl, Select } from "@mui/material";
import { createCart, readCart, updateCart } from "../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { createWishlist, readWishlist } from "../features/wishlistSlice";
import { readSingleProduct } from "../features/productSlice";
import { useAuthContext } from "../context/authContext";
import ImagePanel from "../components/productdetail/ImagePanel";
import Ratings from "../components/productdetail/Ratings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductDetailAccordion from "../components/productdetail/ProductDetails";
import Review from "../components/productdetail/Review";
import ProductDetailSlider from "../components/productdetail/DetailSlider";
import Variants from "../components/productdetail/Variants";
import ErrorPage from "./ErrorPage";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddCartDialog from "../components/productdetail/AddCartDialog";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useAuthContext();
  const { productId, variantId } = location?.state || {};
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const [quantity, setQuantity] = React.useState(
    variantId ? variantId.quantity : 1
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] =
    useState<ISelectedVariant | null>(null);

  useEffect(() => {
    const readFn = async () => {
      await dispatch(readSingleProduct(productId));
    };
    readFn();
  }, [dispatch, productId]);

  useEffect(() => {
    if (variantId) {
      setSelectedVariant({
        variantId: variantId._id,
        color: variantId.color_id.hex_code,
        size: variantId.size_id.name,
        colorName: variantId.color_id.name,
        stock: variantId.stock,
        image: variantId.image_url,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    // Set the images of the product for Image Panel
    const productimage = product?.images?.map((item) => {
      return item.url;
    });
    if (selectedVariant && selectedVariant.image) {
      productimage && setImages([...productimage, selectedVariant.image]);
    } else {
      productimage && setImages([...productimage]);
    }
  }, [product, selectedVariant]);

  if (loading) {
    return (
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
    );
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  const handleAddCart = async () => {
    if (userData && product && selectedVariant?.variantId) {
      const newCart: INewCart = {
        user_id: userData?.user?._id,
        product_id: product?._id,
        variant_id: selectedVariant?.variantId,
        quantity,
        status: "pending",
        orderDate: new Date(),
      };
      variantId
        ? await dispatch(
            updateCart({
              updateCartItem: {
                data: { ...newCart },
                cartId: variantId.cartId,
              },
            })
          )
        : await dispatch(createCart({ newCart }));

      await dispatch(readCart(userData?.user?._id));
    }
    variantId ? navigate(-1) : setOpenDialog(true);
  };

  const handleAddWishlist = async () => {
    if (product && userData) {
      const newWishlist: INewWishlist = {
        user_id: userData.user._id,
        product_id: product._id,
      };
      await dispatch(createWishlist({ newWishlist }));
      await dispatch(readWishlist(userData?.user?._id));
    } else {
      //sisteme giriş için sign in sayfasına yönlendir.
    }
  };
  return (
    <Grid container spacing={{ xs: 0, lg: 2 }} sx={{ minHeight: "60vh" }}>
      {/* Product detail scrolled left part */}
      <AddCartDialog
        {...{ openDialog, setOpenDialog, selectedVariant, quantity }}
      />
      <Grid
        item
        xs={12}
        md={7}
        mt={2}
        order={{ xs: 2, md: 1 }}
        sx={{
          overflowY: { xs: "hidden", md: "auto" },
          maxHeight: { md: "80vh" },
          "&::-webkit-scrollbar": {
            width: "0",
          },
        }}
      >
        <Box mb={2}>
          <ImagePanel images={images} />
        </Box>
        <Box my={2}>
          <ProductDetailAccordion />
        </Box>
        <Grid item xs={12} order={{ xs: 3, md: 3 }}>
          <Box>
            <Review />
          </Box>
          <Box my={2}>
            <ProductDetailSlider title="Recommended" />
          </Box>
          <Box my={2}>
            <ProductDetailSlider title="Recently Viewed" />
          </Box>
        </Grid>
      </Grid>
      {/* Product detail sticky right part */}
      <Grid
        item
        xs={12}
        md={5}
        order={{ xs: 1, md: 2 }}
        sx={{ position: { xs: "static", md: "sticky" }, top: 0 }}
      >
        <Grid mt={2}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" gutterBottom>
                {product?.name}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                sx={{
                  "& hr": {
                    mx: 1.5,
                    border: 1,
                    height: 25,
                  },
                }}
              >
                <Ratings rating={3.7} />
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" gutterBottom>
                  3.7
                </Typography>
              </Box>
              {product && (
                <Box display="flex" gap={2}>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
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
                    {product?.price}
                  </Typography>

                  <Typography component="span" variant="body1" color="green">
                    {product?.discount.type === "monetary" && "$"}
                    {product?.discount.amount}
                    {product?.discount.type === "percentage" && "%"} off
                  </Typography>
                </Box>
              )}
            </Box>
            <Box width={60} mr={2} onClick={handleAddWishlist}>
              <Paper
                elevation={1}
                sx={{
                  height: 80,
                  textAlign: "center",
                  opacity: 0.9,
                  "&:hover": { opacity: 1, cursor: "pointer", boxShadow: 2 },
                  "&:active": { boxShadow: 1 },
                }}
              >
                {wishlist &&
                wishlist.find(
                  (item) =>
                    item?.user_id?._id === userData?.user?._id &&
                    item?.product_id?._id === product?._id
                ) ? (
                  <FavoriteIcon fontSize="large" color="error" />
                ) : (
                  <FavoriteBorderIcon fontSize="large" />
                )}

                <Typography variant="caption" display="block" mt={0.5}>
                  Add to Favorites
                </Typography>
              </Paper>
            </Box>
          </Box>
          <Divider sx={{ border: "1px solid gray", my: 2 }} />
          <Variants {...{ selectedVariant, setSelectedVariant }} />

          <Divider sx={{ border: "1px solid gray", my: 2 }} />
          <Box display="flex" alignItems="center" px={3} gap={1}>
            <FormControl sx={{ m: 1, width: 100 }}>
              <Select
                value={quantity}
                onChange={(event) => {
                  setQuantity(+event.target.value);
                }}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  borderRadius: 0,
                  height: 45,
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
            <Button
              variant="contained"
              disabled={
                selectedVariant?.stock
                  ? selectedVariant?.stock >= quantity
                    ? false
                    : true
                  : true
              }
              fullWidth
              sx={{ py: 1.2, borderRadius: 0 }}
              color="error"
              startIcon={<ShoppingBagIcon />}
              onClick={handleAddCart}
            >
              {variantId ? "Update Item" : "Add to Bag"}
            </Button>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1} pl={4}>
            {selectedVariant &&
              selectedVariant?.stock !== null &&
              (selectedVariant.stock > 0 ? (
                selectedVariant.stock >= quantity ? (
                  <>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography variant="subtitle1"> In stock </Typography>
                  </>
                ) : (
                  <>
                    <ErrorOutlineIcon color="warning" />
                    <Typography variant="subtitle1">
                      Insufficient stock available. Only{" "}
                      {selectedVariant?.stock} remaining.
                    </Typography>
                  </>
                )
              ) : (
                <>
                  <WarningAmberIcon color="warning" />
                  <Typography variant="subtitle1"> Out of stock </Typography>
                </>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;

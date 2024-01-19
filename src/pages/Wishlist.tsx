import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readWishlist } from "../features/wishlistSlice";
import { useAuthContext } from "../context/authContext";
import { Box, Grid, Typography } from "@mui/material";
import WishlistCard from "../components/wishlist/WishlistCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const { userData } = useAuthContext();
  useEffect(() => {
    userData && dispatch(readWishlist(userData?.user._id));
  }, [dispatch, userData]);
  return (
    <Box my={1} mx={2}>
      <Typography variant="h5" textAlign={"center"}>
        My Wishlist ({wishlist?.length})
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <FavoriteBorderIcon color="error" />
      </Box>

      <Grid container spacing={2} mt={0.1} justifyContent={"center"}>
        {wishlist.map((item, index) => (
          <Grid item key={index}>
            <WishlistCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;

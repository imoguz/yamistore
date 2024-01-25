import React from "react";
import { Grid, Box, Button, InputBase } from "@mui/material";
import { Badge, Tooltip, IconButton } from "@mui/material";
import yamilogo from "../../assets/yamilogo.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import NavMenu from "./NavMenu";
import AccountMenu from "./AccountMenu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { readWishlist } from "../../features/wishlistSlice";
import { readCart } from "../../features/cartSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAuthContext();
  const { cart } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  React.useEffect(() => {
    if (userData) {
      dispatch(readCart(userData?.user?._id));
      dispatch(readWishlist(userData?.user?._id));
    }
  }, [userData, dispatch]);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        alignItems={"center"}
        position="fixed"
        bgcolor="#eeeeee"
        pt={1.5}
        height={135}
        zIndex={100}
      >
        <Grid item xs={4} md={3} order={{ xs: 3, md: 1 }}>
          <Box
            component="img"
            sx={{
              opacity: 0.9,
              ml: { lg: 5, md: 1 },
              height: { xs: 35, sm: 50 },
              "&:hover": { cursor: "pointer", opacity: 1 },
            }}
            src={yamilogo}
            alt="yami"
            onClick={() => navigate("/")}
          />
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Box
            sx={{
              display: "flex",
              mx: "auto",
              alignItems: "center",
              border: 1,
              pl: 1,
              maxWidth: { xs: "95%", sm: 480 },
            }}
          >
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Products"
              inputProps={{ "aria-label": "search google maps" }}
              type="search"
            />
            <IconButton type="submit" sx={{ p: "5px" }} aria-label="search" />
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ mx: 0.5, my: 0.3, borderRadius: "0" }}
            >
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} order={{ xs: 4, md: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 3,
              mr: 4,
            }}
          >
            <AccountMenu />
            <Box
              sx={{
                width: 85,
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box onClick={() => navigate("/wishlist")}>
                <Tooltip title="Favorites">
                  <Badge badgeContent={wishlist?.length} color="error">
                    <FavoriteBorderIcon
                      color="action"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          color: "black",
                          transition: "color 1s",
                        },
                      }}
                    />
                  </Badge>
                </Tooltip>
              </Box>
              <Box id="shoppingBag" onClick={() => navigate("/checkout")}>
                <Tooltip title="Shopping Bag">
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingBagIcon
                      color="action"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          color: "black",
                          transition: "color 1s",
                        },
                      }}
                    />
                  </Badge>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} md={12} order={{ xs: 2, md: 4 }}>
          <NavMenu />
        </Grid>
      </Grid>
      <Box sx={{ height: 127 }}></Box>
    </React.Fragment>
  );
}

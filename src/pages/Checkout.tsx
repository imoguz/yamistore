import { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Table, InputBase, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableRow } from "@mui/material";
import { readCart } from "../features/cartSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useAuthContext } from "../context/authContext";
import ErrorPage from "./ErrorPage";
import CheckoutCard from "../components/checkout/CheckoutCard";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const { cart, error } = useAppSelector((state) => state.cart);
  const { userData } = useAuthContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    userData && dispatch(readCart(userData?.user._id));
  }, [userData, dispatch]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const { totalPrice, totalDiscount } = cart.reduce(
        (acc, item) => {
          const discount =
            item.product_id.discount.type === "monetary"
              ? item.product_id.discount.amount
              : (item.product_id.price * item.product_id.discount.amount) / 100;

          acc.totalPrice += item.product_id.price * item.quantity;
          acc.totalDiscount += discount * item.quantity;
          return acc;
        },
        { totalPrice: 0, totalDiscount: 0 }
      );

      setTotalPrice(totalPrice);
      setTotalDiscount(totalDiscount);
    }
  }, [cart]);

  if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <>
      {cart.length > 0 ? (
        <Grid container spacing={{ xs: 0, lg: 2 }} sx={{ minHeight: "85vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            display="flex"
            flexDirection="column"
            sx={{
              overflowY: "auto",
              maxHeight: "85vh",
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            <Grid mx={1} display="flex" flexDirection="column" gap={2} mb={3}>
              <Box display="flex" justifyContent="space-between" mt={1} px={2}>
                <Typography variant="h6" fontWeight="bolder" gutterBottom>
                  Shopping Cart
                </Typography>
                <Typography variant="h6" fontWeight="bolder" gutterBottom>
                  ({cart.length}) item{cart.length > 1 && "s"}
                </Typography>
              </Box>

              <Grid
                display="flex"
                flexDirection="column"
                gap={3}
                pl={{ xs: 1 }}
              >
                {cart.length > 0 &&
                  cart.map((item, index) => (
                    <Grid
                      container
                      spacing={1}
                      position={"relative"}
                      key={index}
                      p={1}
                      pr={{ md: 2, lg: 1 }}
                      sx={{ bgcolor: "#f2f2f2", boxShadow: 2 }}
                    >
                      <CheckoutCard item={item} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              position: { xs: "static", md: "sticky", lg: "sticky" },
              top: 0,
            }}
          >
            <Box mt={1}>
              <Typography variant="h6" fontWeight="bolder" gutterBottom pl={3}>
                Order Summary
              </Typography>
              <Box
                m={{ xs: 1, md: 2, lg: 3 }}
                py={{ xs: 2, md: 3 }}
                px={{ xs: 2, md: 2, lg: 4 }}
                sx={{ bgcolor: "#f2f2f2", boxShadow: 2 }}
              >
                <Box width={{ xs: "95%", lg: "80%" }} mx="auto">
                  <Typography variant="body2" color="#484848">
                    Do you have a promo code?
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      border: 1,
                      borderColor: "#9f9f9f",
                    }}
                  >
                    <InputBase
                      sx={{ mx: 1, flex: 1 }}
                      placeholder="Promo Code"
                      inputProps={{ "aria-label": "search google maps" }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "0",
                        bgcolor: "black",
                        "&:hover": { bgcolor: "#333333" },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
                <Divider
                  variant="fullWidth"
                  sx={{ border: 1.5, my: 4, color: "black" }}
                />
                <TableContainer>
                  <Table
                    sx={{ width: "90%", mx: "auto" }}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2}>Order Value</TableCell>
                        <TableCell align="right">
                          ${totalPrice.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Discount</TableCell>
                        <TableCell align="right">
                          ${totalDiscount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Shipping</TableCell>
                        <TableCell align="right">
                          {totalPrice - totalDiscount < 500
                            ? "$125.0"
                            : "$0.00"}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: "#cdcdcd" }}>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                          $
                          {totalPrice - totalDiscount < 500
                            ? (totalPrice - totalDiscount + 250).toFixed(2)
                            : (totalPrice - totalDiscount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box textAlign="center" mt={3}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 5 }}
                    size="large"
                  >
                    Continue to Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ minHeight: "37.4vh", p: 2 }}>
          <Grid item>
            <Typography variant="h4" mb={3}>
              Your shopping bag is empty!
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Checkout;

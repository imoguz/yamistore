import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useAppSelector } from "../../app/hooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IAddCartDialog {
  quantity: number;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVariant: ISelectedVariant | null;
}
const AddCartDialog: React.FC<IAddCartDialog> = ({
  quantity,
  openDialog,
  setOpenDialog,
  selectedVariant,
}) => {
  const { product } = useAppSelector((state) => state.products);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (openDialog) {
      setAnchorEl(document.getElementById("shoppingBag"));

      const timerId = setTimeout(() => {
        setOpenDialog(false);
      }, 7000);
      return () => clearTimeout(timerId);
    } else {
      setAnchorEl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog]);

  return (
    <Box position="absolute">
      <IconButton
        id="account-menu-button"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      ></IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        TransitionComponent={Zoom}
        sx={{
          maxHeight: 400,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box p={2}>
          <Box display="flex" gap={1}>
            <CheckCircleIcon color="success" sx={{ fontSize: 16 }} />
            <Typography variant="subtitle2">Added to cart</Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Box>
              <CardMedia
                sx={{ height: 110, width: 110, objectFit: "cover", mt: 0.8 }}
                image={imageURL + selectedVariant?.image}
                title={product?.name}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                mb={0.3}
                maxWidth={{ xs: 150, sm: 250, md: 300 }}
                noWrap
              >
                {product?.name}
              </Typography>
              <Box>
                <Typography variant="body2" mb={0.3}>
                  Size: {selectedVariant?.size}
                </Typography>
                <Typography variant="body2" mb={0.3}>
                  Color:{" "}
                  {selectedVariant?.colorName &&
                    selectedVariant?.colorName[0].toUpperCase() +
                      selectedVariant.colorName.slice(1)}
                </Typography>
                <Typography variant="body2" mb={0.3}>
                  Quantity: {quantity}
                </Typography>
                <Typography variant="body2">
                  Price: $
                  {product &&
                    (
                      product?.price -
                      (product.discount.type === "monetary"
                        ? product.discount.amount
                        : (product?.price * product?.discount.amount) / 100)
                    ).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gap={3} mt={1.5}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => navigate("/checkout")}
            >
              Continue Shopping
            </Button>
            <Button variant="outlined" color="success" size="small">
              Checkout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default AddCartDialog;

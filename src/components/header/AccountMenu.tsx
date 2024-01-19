import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import AuthModal from "./AuthModal";
import { useAuthContext } from "../../context/authContext";
import { toastifySuccess } from "../../helpers/toastify";
import { useAppDispatch } from "../../app/hooks";
import { cleanCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const dispatch = useAppDispatch();
  const { userData, setUserData } = useAuthContext();
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = React.useState({
    auth: "",
    open: false,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountMenuItems = userData
    ? userData.user.isAdmin
      ? ["Profile", "My account", "Admin Panel", "Logout"]
      : ["Profile", "My account", "Logout"]
    : ["Sign in", "Register"];

  const handleSelectedMenu = (item: string) => {
    switch (item) {
      case "Admin Panel":
        navigate("/stock");
        break;
      case "Sign in":
        setOpenAuthModal({ auth: "Signin", open: true });
        break;
      case "Register":
        setOpenAuthModal({ auth: "Signup", open: true });
        break;
      case "Logout":
        sessionStorage.removeItem("userData");
        setUserData(null);
        toastifySuccess("You have successfully loged out.");
        dispatch(cleanCart());
        break;

      default:
        break;
    }
    handleClose();
  };
  return (
    <React.Fragment>
      <Tooltip title={userData ? "Account settings" : "Sign in"}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: userData ? "#f7b72d" : "action",
            }}
          >
            {userData ? userData?.user?.firstname[0]?.toUpperCase() : null}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {accountMenuItems.map((item) => (
          <MenuItem key={item} onClick={() => handleSelectedMenu(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
      <AuthModal {...{ openAuthModal, setOpenAuthModal }} />
    </React.Fragment>
  );
}

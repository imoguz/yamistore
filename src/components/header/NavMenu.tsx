import * as React from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavDropDown from "./NavDropDown";
import { navMenuItems } from "../../helpers/navMenuItems";
import NavDrawer from "./NavDrawer";
import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [drawerItems, setDrawerItems] = React.useState<
    IDrawerItems | undefined
  >(undefined);

  const { setBackdrop } = useContext(ThemeContext) || { setBackdrop: () => {} };

  const handleOpenNavDrawer = () => {
    const menuItems: string[] = navMenuItems.map((item) => item.menuName);
    const itemImage: string[] = navMenuItems.map((item) => item.image);
    const menuPath: string[] = ["mainMenu"];
    setDrawerItems({ menuPath, menuItems, itemImage });
    setOpenDrawer(true);
  };

  const handleMouseOver = (item: IMenuItems) => {
    setActiveMenu(item.menuName);
    setBackdrop(true);
  };
  const handleClickAway = () => {
    setActiveMenu(null);
    setBackdrop(false);
  };
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          boxShadow: "none",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavDrawer}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <NavDrawer
              {...{ openDrawer, setOpenDrawer, drawerItems, setDrawerItems }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {navMenuItems.map((item) => (
              <Box
                key={item.menuName}
                sx={{
                  width: 110,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: 5,
                    cursor: "pointer",
                  },
                }}
                onMouseEnter={() => handleMouseOver(item)}
                onMouseLeave={handleClickAway}
              >
                <Typography
                  id="menuItemText"
                  sx={{
                    textAlign: "center",
                    fontSize: 18,
                    opacity: 0.7,
                    transition: "opacity 0.5s ease-out",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  onClick={() => {
                    setActiveMenu(null);
                    setBackdrop(false);
                    navigate(`/shop/${item.menuName.toLowerCase()}`);
                  }}
                >
                  {item.menuName}
                </Typography>
                <NavDropDown
                  {...{
                    activeMenu,
                    setActiveMenu,
                    item,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavMenu;

import * as React from "react";
import { Avatar, Grid, IconButton, ListItemButton } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Box, Drawer, useMediaQuery, Typography } from "@mui/material";
import { navMenuItems } from "../../helpers/navMenuItems";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import yamilogo from "../../assets/yamilogo.jpg";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const NavDrawer: React.FC<NavDrawerProps> = ({
  openDrawer,
  setOpenDrawer,
  drawerItems,
  setDrawerItems,
}) => {
  const navigate = useNavigate();
  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(false);
    };
  const handleBack = () => {
    if (drawerItems?.menuPath[0] === "subMenu") {
      const menuItems: string[] = navMenuItems.map((item) => item.menuName);
      const itemImage: string[] = navMenuItems.map((item) => item.image);
      const menuPath: string[] = ["mainMenu"];
      setDrawerItems({ menuPath, menuItems, itemImage });
    }
    if (drawerItems?.menuPath[0] === "subMenuChild") {
      const subMenu: IMenuItems[] = navMenuItems.filter(
        (main) => main.menuName === drawerItems.menuPath[1]
      );
      const menuItems = subMenu[0]?.subMenu.subMenuItems.map(
        (subItems) => Object.keys(subItems)[0]
      );
      const itemImage: string[] = subMenu[0].subMenu.subMenuImages;
      const menuPath = ["subMenu", drawerItems.menuPath[1]];
      setDrawerItems({ menuPath, menuItems, itemImage });
    }
  };
  const handleClick = (item: string) => {
    if (drawerItems?.menuPath[0] === "mainMenu") {
      const selectedMenu: IMenuItems[] = navMenuItems.filter(
        (main) => main.menuName === item
      );
      const menuItems = selectedMenu[0]?.subMenu.subMenuItems.map(
        (subItems) => Object.keys(subItems)[0]
      );
      const itemImage: string[] = selectedMenu[0].subMenu.subMenuImages;
      const menuPath = ["subMenu", item];
      setDrawerItems({ menuPath, menuItems, itemImage });
    }
    if (drawerItems?.menuPath[0] === "subMenu") {
      const selectedMenu: IMenuItems[] = navMenuItems.filter(
        (main) => main.menuName === drawerItems?.menuPath[1]
      );
      const selectedSubMenu: ISubMenuItems[] =
        selectedMenu[0].subMenu.subMenuItems.filter(
          (main) => Object.keys(main)[0] === item
        );
      const menuItems: string[] = selectedSubMenu[0][item].items;
      const itemImage: string[] = selectedSubMenu[0][item].images;
      const menuPath = ["subMenuChild", drawerItems?.menuPath[1], item];
      setDrawerItems({ menuPath, menuItems, itemImage });
    }
    if (drawerItems?.menuPath[0] === "subMenuChild") {
      setOpenDrawer(false);
      navigate(
        `/shop?category=${drawerItems.menuPath[1].toLowerCase()}-${drawerItems.menuPath[2].toLowerCase()}-${item.toLowerCase()}`
      );
    }
  };
  const secrenMatches: boolean = useMediaQuery("(min-width:768px)");
  const handleMediaQuery = () => {
    if (secrenMatches) {
      setOpenDrawer(false);
    }
  };
  React.useEffect(() => {
    handleMediaQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secrenMatches]);
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer()}
        disableScrollLock={true}
      >
        <Box sx={{ width: "70vw" }}>
          <Box role="presentation">
            <Grid container>
              <Grid item xs={2} textAlign={"right"}>
                {drawerItems?.menuPath[0] !== "mainMenu" && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={handleBack}
                  >
                    <ArrowCircleLeftIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={8} textAlign={"center"}>
                <img style={{ height: 55 }} src={yamilogo} alt="yami" />
              </Grid>

              <Grid item xs={2}>
                <IconButton
                  aria-label="cancel"
                  size="large"
                  onClick={toggleDrawer()}
                >
                  <CancelIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
            <Box>
              <Typography variant="h5" pl={2} mt={2}>
                {drawerItems?.menuPath[1]}
                {drawerItems?.menuPath[2] && `/${drawerItems?.menuPath[2]}`}
              </Typography>
            </Box>
            <List>
              {drawerItems?.menuItems?.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ py: 0.5, px: 0 }}
                  onClick={() => handleClick(item)}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {drawerItems?.itemImage[index] ? (
                        <Avatar
                          alt="Category"
                          src={drawerItems?.itemImage[index]}
                        />
                      ) : (
                        <Avatar sx={{ bgcolor: "orange" }}>{item[0]}</Avatar>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item} />
                    <ArrowForwardIcon sx={{ color: "#6a6a6a" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default NavDrawer;

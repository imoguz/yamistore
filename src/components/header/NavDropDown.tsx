import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

const NavDropDown: React.FC<DropDownProps> = ({
  activeMenu,
  setActiveMenu,
  item,
}) => {
  const navigate = useNavigate();
  const { setBackdrop } = useContext(ThemeContext) || { setBackdrop: () => {} };

  return (
    <React.Fragment>
      {item.menuName === activeMenu && (
        <Container
          maxWidth="xl"
          id="mainbox"
          sx={{
            position: "absolute",
            bgcolor: "#f9f9f9",
            left: 0,
            height: "auto",
            top: 57,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            columnSpacing={{ md: 6, lg: 10 }}
            rowSpacing={1.5}
            justifyContent="center"
            p={1}
          >
            {item.subMenu.subMenuItems?.map((menuItems, index) => (
              <Grid item key={index}>
                <Typography
                  variant="h6"
                  component="h6"
                  onClick={() => {
                    setActiveMenu(null);
                    setBackdrop(false);
                    navigate(
                      `/shop?category=${activeMenu.toLowerCase()}-${Object.keys(
                        menuItems
                      )[0].toLowerCase()}`
                    );
                  }}
                >
                  {Object.keys(menuItems)[0]}
                </Typography>
                <Grid>
                  {menuItems[Object.keys(menuItems)[0]].items?.map(
                    (subitem, subindex) => (
                      <Typography
                        key={subindex}
                        variant="subtitle1"
                        component="p"
                        my={1}
                        sx={{
                          maxWidth: 150,
                          opacity: 0.8,
                          "&:hover": {
                            opacity: 1,
                            cursor: "pointer",
                            textDecoration: "underline",
                            textUnderlineOffset: 5,
                          },
                        }}
                        onClick={() => {
                          setActiveMenu(null);
                          setBackdrop(false);
                          navigate(
                            `/shop?category=${activeMenu.toLowerCase()}-${Object.keys(
                              menuItems
                            )[0].toLowerCase()}-${subitem.toLowerCase()}`
                          );
                        }}
                      >
                        {subitem}
                      </Typography>
                    )
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
};

export default NavDropDown;

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { navMenuItems } from "../helpers/navMenuItems";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";

const MainCategoryPage = () => {
  const { mainMenu } = useParams();
  const selectedMenu = navMenuItems.filter(
    (item) => item.menuName === mainMenu
  );
  const navigate = useNavigate();
  return (
    <Box mb={3}>
      <Box px={2}>
        <Typography variant="h5" component="h5" mt={2} mb={1}>
          {selectedMenu[0].menuName}
        </Typography>
        <Divider
          sx={{
            bgcolor: "gray",
            height: "2px",
          }}
        />
      </Box>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={2}>
          <Box ml={3}>
            {selectedMenu[0].subMenu.subMenuItems.map((item, index) => (
              <Box key={index}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    textDecoration: "underline",
                    textUnderlineOffset: 5,
                    my: 1,
                    "&:hover": {
                      color: "darkred",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/${mainMenu}/${Object.keys(item)}`)}
                >
                  {Object.keys(item)}
                </Typography>
                {item[Object.keys(item)[0]].items?.map((submenu, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      mb: 0.7,
                      "&:hover": {
                        color: "red",
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {submenu}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container spacing={5} px={2} justifyContent="center">
            {selectedMenu[0].subMenu.subMenuItems.map((item, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    width: { xs: 310, sm: 330, md: 350, lg: 450 },
                    minHeight: 475,
                  }}
                >
                  <CardMedia
                    sx={{ height: 300 }}
                    image={selectedMenu[0].subMenu.subMenuImages[index]}
                    title="submenuImage"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {Object.keys(item)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedMenu[0].subMenu.description[index]}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<ShoppingCartIcon />}
                    >
                      Shop Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainCategoryPage;

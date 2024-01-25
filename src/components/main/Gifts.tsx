import { Box, Grid, Typography } from "@mui/material";
import { giftData } from "../../helpers/mainPageData";
import Button from "@mui/material/Button";

const Gifts = () => {
  return (
    <Box>
      <Typography
        sx={{ textShadow: "2px 1px 4px rgba(0,0,0,0.6)" }}
        variant="h5"
        gutterBottom
      >
        Gifts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {giftData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} position="relative">
            <img
              src={item.image}
              alt={item.label}
              style={{
                height: 400,
                width: "100%",
                objectFit: "cover",
              }}
            />
            <Box sx={{ position: "absolute", bottom: 30, px: 2 }}>
              <Typography variant="h5" color={item.hex_code}>
                {item.label}
              </Typography>
              <Typography variant="h5" color={item.hex_code} gutterBottom>
                {item.description}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: 5 }}
              >
                Shop
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gifts;

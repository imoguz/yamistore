import { Box, Grid, Typography } from "@mui/material";
import { giftData } from "../../helpers/mainPageData";

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
      <Grid container spacing={2} justifyContent="center">
        {giftData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img
              src={item.image}
              alt={item.label}
              style={{
                height: 400,
                width: "100%",
                objectFit: "cover",
              }}
            />
            <Typography variant="h6">{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gifts;

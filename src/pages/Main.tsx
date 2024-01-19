import { Grid } from "@mui/material";
import PopularCategories from "../components/main/PopularCategories";
import Banner from "../components/main/Banner";
import Gifts from "../components/main/Gifts";
import Bestsellers from "../components/main/Bestsellers";

const Main = () => {
  return (
    <Grid container rowSpacing={10}>
      <Grid item xs={12}>
        <Banner />
      </Grid>
      <Grid item xs={12}>
        <Gifts />
      </Grid>
      <Grid item xs={12}>
        <PopularCategories />
      </Grid>
      <Grid item xs={12}>
        <Bestsellers />
      </Grid>
    </Grid>
  );
};

export default Main;

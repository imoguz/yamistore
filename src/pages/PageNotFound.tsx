import { Button, CardMedia, Grid } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import pagenotfound from "../assets/pagenotfound.png";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Grid>
      <Grid item height={"80vh"}>
        <CardMedia
          component={"img"}
          image={pagenotfound}
          title="Page Not Found"
        />
      </Grid>
      <Button
        sx={{ marginLeft: 15 }}
        variant="contained"
        onClick={() => navigate("/stock")}
        startIcon={<HomeIcon />}
      >
        Back to Homepage
      </Button>
    </Grid>
  );
};

export default PageNotFound;

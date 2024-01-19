import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Grid container spacing={5}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Grid key={index} item>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Grid>
      ))}
    </Grid>
  );
}

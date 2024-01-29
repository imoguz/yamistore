import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LoadingSkeleton() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const iteration = matches ? [1, 2, 3, 4] : [1];

  return (
    <Grid container spacing={2}>
      {iteration.map((item) => (
        <Grid item key={item} my={10}>
          <Skeleton variant="rounded" width={300} height={300} />
          <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 0.5 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rectangular" width={20} height={20} />
            ))}
          </Box>
          <Skeleton variant="text" width={250} />
          <Skeleton variant="text" width={300} />
        </Grid>
      ))}
    </Grid>
  );
}

import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LoadingSkeleton() {
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.only("md"));
  const isLg = useMediaQuery((theme: any) => theme.breakpoints.only("lg"));

  const skeletonAmount = isMd ? [1, 2, 3] : isLg ? [1, 2, 3, 4] : [1, 2];

  return (
    <Grid container spacing={2}>
      {skeletonAmount.map((item) => (
        <Grid item key={item} my={2}>
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 180, sm: 250, md: 280 } }}
            height={300}
          />
          <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 0.5 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" width={20} height={20} />
            ))}
          </Box>
          <Skeleton
            variant="text"
            sx={{ width: { xs: 150, sm: 200, md: 250 } }}
          />
          <Skeleton
            variant="text"
            sx={{ width: { xs: 180, sm: 250, md: 280 } }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { footerData } from "../../helpers/mainPageData";

export default function FooterNav() {
  return (
    <Grid container spacing={5}>
      {footerData.map((item, index) => (
        <Grid item key={index}>
          <Typography variant="body1" gutterBottom>
            {item.section}
          </Typography>
          {item.menuItems.map((menuItem, index) => (
            <Typography
              key={index}
              variant="body2"
              gutterBottom
              color="text.secondary"
              sx={{ "&:hover": { color: "text.primary", cursor: "pointer" } }}
            >
              {menuItem}
            </Typography>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

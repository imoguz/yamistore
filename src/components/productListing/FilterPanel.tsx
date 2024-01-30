import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider, Grid } from "@mui/material";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

interface IFilterState {
  size: string;
  color: string;
}
export default function FilterPanel() {
  const [size, setSize] = React.useState(["small", "medium", "large"]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize({
      ...size,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mx: "auto",
          width: "90%",
          mt: 3,
        }}
      >
        <Typography variant="h6">Filters</Typography>
        <Typography variant="body1" color="error" mr={2}>
          Clear All
        </Typography>
      </Box>
      <Divider sx={{ height: 0, backgroundColor: "black", ml: 1, mr: 3 }} />
      <Grid>
        {["Size", "Color", "Price", "Discount", "Brand"].map((item, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
              width: "90%",
            }}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> {item}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <FormGroup>
                {size.map((i) => (
                  <FormControlLabel control={<Checkbox />} label={i} />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
}

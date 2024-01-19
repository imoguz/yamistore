import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function ProductDetail() {
  return (
    <div>
      <Accordion
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          border: "none",
        }}
        TransitionProps={{
          unmountOnExit: true,
          mountOnEnter: true,
          timeout: { enter: 500, exit: 500 },
        }}
      >
        <Box sx={{ display: "flex", height: 72 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" mr={2}>
              Product Details
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            Grounded in style, comfort and versatility, meet our take on luxury
            loungewear. Our roomiest fit paired with exaggerated details (like
            the oversized pocket and taller ribbing) ensures this sweatshirt is
            anything but basic. All that's left to decide is whether to style it
            with the matching shorts or other pieces from your wardrobe.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bolder" gutterBottom>
            Benefits
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our midweight brushed fleece feels extra soft on the inside and
            smooth on the outside, helping you stay cozy while keeping its
            structured shape. Dropped shoulder seams and roomy sleeves provide a
            relaxed, spacious feel.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bolder" gutterBottom>
            Product Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Elongated ribbing Embroidered Swoosh logo 80% cotton/20% polyester
            Machine wash Imported Shown: Light Armory Blue/Sail Style:
            DQ5761-441
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

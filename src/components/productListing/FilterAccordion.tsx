import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterAccordion() {
  return (
    <div>
      {["Color", "Size", "Age", "Made"].map((item, index) => (
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
            {[1, 2, 3, 4, 5].map((i, index) => (
              <Typography
                key={index}
                gutterBottom
                color="text.secondary"
                sx={{ "&:hover": { color: "text.primary", cursor: "pointer" } }}
              >
                {`${i}- Filter item...`}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

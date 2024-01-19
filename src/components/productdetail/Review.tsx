import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Divider } from "@mui/material";
import Ratings from "./Ratings";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Review() {
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
              Reviews
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Box
            display="flex"
            flexDirection="row"
            sx={{
              "& hr": {
                mx: 1.5,
                border: 1,
                height: 25,
              },
            }}
          >
            <Ratings rating={4.3} />
            <Typography variant="subtitle1" ml={3}>
              4.3
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" gutterBottom>
              125 Reviews
            </Typography>
          </Box>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            startIcon={<EditNoteIcon />}
          >
            Write A Review
          </Button>
          {[...Array(8)].map((_, index) => (
            <Box key={index} width={{ xs: "100%", sm: "540px", md: "600px" }}>
              <Box
                display="flex"
                flexDirection="row"
                sx={{
                  "& hr": {
                    mx: 1.5,
                    border: 1,
                    height: 25,
                  },
                }}
              >
                <Ratings rating={4} />

                <Typography variant="subtitle1" ml={3}>
                  Ahmet C.
                </Typography>
                <Typography variant="subtitle1">- 18.12.2023</Typography>
              </Box>
              <Typography variant="subtitle1" fontWeight="bolder" gutterBottom>
                Title
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our midweight brushed fleece feels extra soft on the inside and
                smooth on the outside, helping you stay cozy while keeping its
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

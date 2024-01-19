import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { footerData } from "../../helpers/mainPageData";

export default function FooterAccordion() {
  return (
    <div>
      {footerData.map((item, index) => (
        <Accordion
          key={index}
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            border: "none",
            width: "90vw",
          }}
          TransitionProps={{
            unmountOnExit: true,
            mountOnEnter: true,
            timeout: { enter: 500, exit: 500 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> {item.section}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {item.menuItems.map((menuItem, index) => (
              <Typography
                key={index}
                gutterBottom
                color="text.secondary"
                sx={{ "&:hover": { color: "text.primary", cursor: "pointer" } }}
              >
                {menuItem}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

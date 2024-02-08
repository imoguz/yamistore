import FooterNav from "./FooterNav";
import { Box, Grid, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import Style from "./footer.module.scss";
import FooterAccordion from "./FooterAccordion";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      bgcolor="#eeeeee"
      pt={3}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        mx="auto"
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
        <FooterAccordion />
      </Box>
      <Box
        mx="auto"
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        <FooterNav />
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "center", gap: 3, py: 3 }}>
        <Box sx={{ height: 35, width: 35, textAlign: "center" }}>
          <LinkedInIcon
            sx={{ color: "#0a63bc" }}
            className={Style.socialIcon}
            onClick={() =>
              window.open("https://linkedin.com/in/imoguz", "_blank")
            }
          />
        </Box>
        <Box sx={{ height: 35, width: 35, textAlign: "center" }}>
          <FacebookIcon
            sx={{ color: "#1773ea" }}
            className={Style.socialIcon}
            onClick={() => window.open("https://facebook.com/", "_blank")}
          />
        </Box>
        <Box sx={{ height: 35, width: 35, textAlign: "center" }}>
          <InstagramIcon
            sx={{ color: "#d82d77" }}
            className={Style.socialIcon}
            onClick={() => window.open("https://instagram.com/", "_blank")}
          />
        </Box>
        <Box sx={{ height: 35, width: 35, textAlign: "center" }}>
          <YouTubeIcon
            sx={{ color: "#f70000" }}
            className={Style.socialIcon}
            onClick={() => window.open("https://youtube.com/", "_blank")}
          />
        </Box>
      </Grid>
      <Box sx={{ bgcolor: "#dddddd" }}>
        <Typography variant="subtitle1" py={1} pl={5} textAlign="center">
          Copyright © YAMI 2024.
        </Typography>
      </Box>
    </Box>
  );
}

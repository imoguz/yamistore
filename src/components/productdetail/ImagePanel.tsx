import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

interface IImagePanelProps {
  images: string[];
}
const ImagePanel: React.FC<IImagePanelProps> = ({ images }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        sx={{
          width: "100%",
          height: { xs: 400, sm: 450, md: 400, lg: 550 },
        }}
      >
        {value === index && (
          <Box
            sx={{
              px: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src={`${imageURL + images[index]}`}
              alt="as"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                objectPosition: "center center",
                mx: "auto",
              }}
            />
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: { xs: "column-reverse", lg: "row" },
        height: { xs: 490, sm: 540, md: 490, lg: 570 },
      }}
    >
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          sx: {
            display: "none",
          },
        }}
        aria-label="Vertical tabs example"
        sx={{
          borderColor: "divider",
          borderRight: 0,
          pl: { lg: 2 },
          "& .MuiTabScrollButton-root": {
            color: "#424242",
          },
          "& svg": {
            fontSize: 35,
            "&:hover": { fontSize: 40 },
            "&:active": { fontSize: 35 },
          },
        }}
      >
        {images.map((image, index) => (
          <Tab
            sx={{ mx: "auto" }}
            key={index}
            icon={
              <Box
                component="img"
                src={`${imageURL}/${image}`}
                alt="productImage"
                sx={{
                  width: 60,
                  height: 60,
                  boxShadow: value === index ? 1 : 0,
                }}
              />
            }
          />
        ))}
      </Tabs>
      {images.map((_, index) => (
        <TabPanel key={index} value={value} index={index} />
      ))}
    </Box>
  );
};

export default ImagePanel;

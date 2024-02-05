import * as React from "react";
import { Box, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { exit } from "process";

interface ISortMenuProps {
  sortMenu: ISortMenu;
  setSortMenu: React.Dispatch<React.SetStateAction<ISortMenu>>;
}
const SortMenu: React.FC<ISortMenuProps> = ({ sortMenu, setSortMenu }) => {
  const sortOptions = [
    "Recommended",
    "Newest",
    "A - Z",
    "Price: Hight to Low",
    "Price: Low to Hight",
  ];

  const boxStyle = {
    bgcolor: "white",
    boxShadow: 2,
    position: "absolute",
    pt: 0.7,
    zIndex: 10,
    width: "100%",
  };

  const handleSorting = (option: string) => {
    setSortMenu({ open: false, option: option });
  };
  return (
    <Box
      sx={
        sortMenu.open
          ? boxStyle
          : { position: "absolute", zIndex: 10, width: "100%" }
      }
    >
      {sortOptions.map((option) => (
        <Typography
          key={option}
          gutterBottom
          sx={{
            "&:hover": { cursor: "pointer", bgcolor: "#f4f4f4" },
            px: 2,
            py: 0.5,
          }}
          onClick={() => handleSorting(option)}
        >
          <Collapse in={sortMenu.open} timeout={{ enter: 200, exit: 0 }}>
            {option}
          </Collapse>
        </Typography>
      ))}
    </Box>
  );
};

export default SortMenu;

import * as React from "react";
import { Paper, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";

interface ISortMenuProps {
  sortMenu: ISortMenu;
  setSortMenu: React.Dispatch<React.SetStateAction<ISortMenu>>;
}
const SortMenu: React.FC<ISortMenuProps> = ({ sortMenu, setSortMenu }) => {
  const sortOptions = [
    "Featured",
    "Newest",
    "A - Z",
    "Price (high to low)",
    "Price (low to high)",
  ];

  const handleSorting = (option: string) => {
    setSortMenu({ open: false, option: option });
  };
  return (
    <Paper
      sx={{
        bgcolor: "white",
        boxShadow: 3,
        position: "absolute",
        pt: 0.7,
        right: 1,
        top: 32,
        zIndex: 10,
        width: "250",
        display: sortMenu.open ? "block" : "none",
      }}
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
          <Collapse in={sortMenu.open}>{option}</Collapse>
        </Typography>
      ))}
    </Paper>
  );
};

export default SortMenu;

import * as React from "react";
import { Paper, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";

interface ISortMenuProps {
  sortMenu: ISortMenu;
  setSortMenu: React.Dispatch<React.SetStateAction<ISortMenu>>;
}
const SortMenu: React.FC<ISortMenuProps> = ({ sortMenu, setSortMenu }) => {
  const sortOptions: ISortOptions[] = [
    { title: "Featured", field: "", order: 1 },
    { title: "Newest", field: "createdAt", order: 1 },
    { title: "A - Z", field: "name", order: 1 },
    { title: "Z - A", field: "name", order: -1 },
    { title: "Price (high to low)", field: "price", order: -1 },
    { title: "Price (low to high)", field: "price", order: 1 },
  ];

  const handleSorting = (option: ISortOptions) => {
    setSortMenu({
      open: false,
      option: option.title,
      field: option.field,
      order: option.order,
    });
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
      {sortOptions.map((option, index) => (
        <Typography
          key={index}
          gutterBottom
          sx={{
            "&:hover": { cursor: "pointer", bgcolor: "#f4f4f4" },
            px: 2,
            py: 0.5,
          }}
          onClick={() => handleSorting(option)}
        >
          <Collapse in={sortMenu.open}>{option.title}</Collapse>
        </Typography>
      ))}
    </Paper>
  );
};

export default SortMenu;

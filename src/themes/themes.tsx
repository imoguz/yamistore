import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextState;

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      // primary: {
      //   main: "#2196f3",
      // },
      // secondary: {
      //   main: "#f50057",
      // },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;

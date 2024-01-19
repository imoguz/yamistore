import React, { createContext, useState } from "react";

interface ThemeContextState {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  backdrop: boolean;
  setBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextState | undefined>(
  undefined
);

const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const values: ThemeContextState = {
    darkMode,
    setDarkMode,
    backdrop,
    setBackdrop,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export default DarkModeProvider;

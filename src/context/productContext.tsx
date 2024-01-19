import React, { createContext, useState, useContext } from "react";

interface bagItem {
  productId: string;
  variantId: string;
}
interface ContextState {
  cardToggle: boolean;
  setCardToggle: React.Dispatch<React.SetStateAction<boolean>>;
  newBagItem: bagItem | null;
  setNewBagItem: React.Dispatch<React.SetStateAction<bagItem | null>>;
  favorites: string[] | [];
  setFavorites: React.Dispatch<React.SetStateAction<string[] | []>>;
}

const ProductContext = createContext<ContextState | undefined>(undefined);

const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cardToggle, setCardToggle] = useState<boolean>(false);
  const [newBagItem, setNewBagItem] = useState<bagItem | null>(null);
  const [favorites, setFavorites] = useState<string[] | []>([]);

  const values: ContextState = {
    cardToggle,
    setCardToggle,
    newBagItem,
    setNewBagItem,
    favorites,
    setFavorites,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};
export { ProductContextProvider, useProductContext };

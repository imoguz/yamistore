import React from "react";
import { createContext, useState, useContext } from "react";

interface UserContextState {
  userData: IUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

const UserContext = createContext<UserContextState>({} as UserContextState);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserData | null>(
    JSON.parse(sessionStorage.getItem("userData") || "null")
  );
  const values: UserContextState = { userData, setUserData };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useAuthContext };

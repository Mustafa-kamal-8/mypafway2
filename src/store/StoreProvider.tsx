"use client";
import { useState, ReactNode, FC } from "react";
import { StoreContext } from "./StoreContext";

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<StoreContextType>({});

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

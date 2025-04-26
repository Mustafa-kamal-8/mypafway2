// import { createContext, Dispatch, SetStateAction } from "react";

// type StoreContextProps = {
// 	store: StoreContextType;
// 	setStore: Dispatch<SetStateAction<StoreContextType>>;
// };

// export const StoreContext = createContext<StoreContextProps>({
// 	store: {},
// 	setStore: () => {},
// });

import { createContext, type Dispatch, type SetStateAction } from "react"

type StoreContextType = {
  cartItems?: any[]
  [key: string]: any
}

type StoreContextProps = {
  store: StoreContextType
  setStore: Dispatch<SetStateAction<StoreContextType>>
}

export const StoreContext = createContext<StoreContextProps>({
  store: {},
  setStore: () => {},
})

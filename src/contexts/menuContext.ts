import { createContext, useContext } from "react";
import type { MenuContextType } from "~/components/menuProvider";

export const MenuContext = createContext<MenuContextType| undefined>(undefined);

export function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw "provider missing in parent to use active selection context";
  }

  return ctx;
}


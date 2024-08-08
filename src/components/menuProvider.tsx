import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { MenuContext } from "~/contexts/menuContext";
import useGlobalEscape from "~/hooks/useGlobalEscape";

export type MenuContextType = ReturnType<typeof useMenu>;

function useMenu() {

  const [lastSelection, setLastSelection] = useState<number>(0);
  const [menuPosition, setMenuPosition] = useState<[number, number]>();

  const handleEscape = useCallback(() => {
    setMenuPosition(undefined);
  }, [setMenuPosition]);

  useGlobalEscape(handleEscape);

  return {
    lastSelection,
    setLastSelection,
    menuPosition,
    setMenuPosition,
    handleEscape
  };
}

export function MenuProvider(props: {children: ReactNode[]}){
    const value = useMenu();

    return (
      <MenuContext.Provider value={value} >
            {...props.children}
      </MenuContext.Provider>
    )
}

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { MenuContext } from "~/contexts/menuContext";
import useGlobalEscape from "~/hooks/useGlobalEscape";

export type MenuContextType = ReturnType<typeof useMenu>;

function useMenu() {

  const [lastSelection, setLastSelection] = useState<number>(0);
  const [copiedValue, setCopiedValue] = useState<string>("");

  const [menuPosition, setMenuPosition] = useState<[number, number]>();
  const [spanRect, setSpanRect] = useState<DOMRect|undefined>(undefined);

  const handleEscape = useCallback(() => {
    setMenuPosition(undefined);
  }, [setMenuPosition]);

  useGlobalEscape(handleEscape);

  return {
    copiedValue,
    setCopiedValue,

    lastSelection,
    setLastSelection,

    menuPosition,
    setMenuPosition,

    spanRect,
    setSpanRect,
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

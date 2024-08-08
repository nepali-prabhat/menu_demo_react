import { useState, useCallback } from "react";

export function useMenu() {

    const [lastSelection, setLastSelection] = useState<number>(0);
    const [menuPosition, setMenuPosition] = useState<[number, number]>();

    const handleEscape = useCallback(() => {
        console.log('escaped');
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


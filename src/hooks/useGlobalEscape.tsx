import { useEffect } from "react";

export default function useGlobalEscape(onEscape: () => void) {
  // escape handler
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keyup", fn);

    return () => {
      document.removeEventListener("keyup", fn);
    };
  }, [onEscape]);

  // click handler
  useEffect(() => {
    const fn = (_e: MouseEvent) => {
      onEscape();
    };

    document.addEventListener("click", fn);

    return () => {
      document.removeEventListener("click", fn);
    };
  }, [onEscape]);
}

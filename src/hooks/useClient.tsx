import { useEffect, useState } from "react";

export function useClient(){

  const [inBrowser, setInBrowser] = useState(false);
  useEffect(() => {
    setInBrowser(true);
  }, []);

  return inBrowser
}

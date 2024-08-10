"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Menu from "~/components/menu";
import AppItem, { AppItemCopy } from "~/components/appItem";
import { MenuProvider } from "~/components/menuProvider";
import { useClient } from "~/hooks/useClient";

export default function App() {
  const [values, setValues] = useState<string[]>([
    "hello world",
    "demo friday, baby",
  ]);

  const client = useClient();

  return (
    <div>
      <MenuProvider>
        <div className="v-100 flex h-screen flex-col gap-2 bg-black text-white">
          {values.map((v, i) => (
            <AppItem
              key={`APP_ITEM_${i}`}
              value={v}
              setValue={(val) =>
                setValues((v) => [...v.slice(0, i), val, ...v.slice(i + 1)])
              }
            />
          ))}
        </div>
        {client && createPortal(<Menu />, document.body)}
        {client && createPortal(<AppItemCopy />, document.body)}
      </MenuProvider>
    </div>
  );
}

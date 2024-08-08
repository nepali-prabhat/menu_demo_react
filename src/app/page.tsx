"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Menu from "~/components/menu";
import AppItem, { AppItemCopy } from "~/components/appItem";
import { MenuProvider } from "~/components/menuProvider";

export default function App() {
  const [value, setValue] = useState<string>("hello world");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const caretSpanRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

    const [docEnv, setDocEnv] = useState(false);
    useEffect(()=>{
        setDocEnv(true)
    },[])

  return (
    <div>
      <MenuProvider>
        <div className="v-100 flex h-screen flex-col bg-black text-white">
          <AppItem
            value={value}
            setValue={setValue}
            textAreaRef={textAreaRef}
            copyRef={copyRef}
            caretSpanRef={caretSpanRef}
          />
        </div>

        {docEnv&&createPortal(<Menu menuRef={menuRef} />, document.body)}

        {docEnv&&createPortal(
            <AppItemCopy
              value={value}
              copyRef={copyRef}
              caretSpanRef={caretSpanRef}
            />,
            document.body,
          )}
      </MenuProvider>
    </div>
  );
}

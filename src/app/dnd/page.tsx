"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import { useClient } from "~/hooks/useClient";

type PortalLocation = [number, number];
export default function DND() {
  const [value, setValue] = useState<string>("hello Ashma");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const isClient = useClient();

  const [portalLocation, setPortalLocation] = useState<
    PortalLocation | undefined
  >(undefined);
  const [copyWidth, setCopyWidth] = useState<number | undefined>(undefined);

  const [lastEditedPosition, setLastEditedPosition] = useState<number>(0);

  useEffect(() => {
    const fn = () => setPortalLocation(undefined);

    const keyup_fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPortalLocation(undefined);
      }
    };

    document.addEventListener("click", fn);
    document.addEventListener("keyup", keyup_fn);
    return () => {
      document.removeEventListener("click", fn);
      document.removeEventListener("keyup", keyup_fn);
    };
  }, [setPortalLocation]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      e.preventDefault();
      setPortalLocation([e.clientX, e.clientY]);
    };
    document.addEventListener("contextmenu", fn);
    return () => {
      document.removeEventListener("contextmenu", fn);
    };
  }, [setPortalLocation]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target;
    setValue(e.target.value);
    const selectionStart = element.selectionStart;
    setLastEditedPosition(selectionStart);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key == "/") {
      const taRect = taRef.current?.getBoundingClientRect();
      if (taRect) {
        setPortalLocation([copyWidth ?? 0, taRect.y + taRect.height]);
      }
    } else {
      setPortalLocation(undefined);
    }
  };

  // derrived state

  return (
    <div className="v-100 h-screen">
      <textarea
        className="w-[100%] outline"
        ref={taRef}
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />

      {isClient &&
        createPortal(
          <CopiedValue
            setCopyWidth={setCopyWidth}
            value={value}
            lastEditedPosition={lastEditedPosition}
          />,
          document.body,
        )}
      {isClient &&
        createPortal(
          <MenuPortal portalLocation={portalLocation} />,
          document.body,
        )}
    </div>
  );
}

function CopiedValue(props: {
  value: string;
  lastEditedPosition: number;

  setCopyWidth: (v: number) => void;
}) {
  const { value, lastEditedPosition, setCopyWidth } = props;
  const cpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cpRect = cpRef.current?.getBoundingClientRect();
    if (cpRect) {
      const width = cpRect.width;
      setCopyWidth(width);
    }
  }, [lastEditedPosition, setCopyWidth]);

  return (
    <div ref={cpRef} className="absolute bottom-0 text-black">
      {value.slice(0, lastEditedPosition)}
    </div>
  );
}

function MenuPortal(props: { portalLocation?: PortalLocation }) {
  if (!props.portalLocation) {
    return null;
  }

  return (
    <div
      className="absolute left-0 top-[50px] grid gap-2 border"
      style={{ left: props.portalLocation[0], top: props.portalLocation[1] }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="border">heading 1</button>
      <button className="border">heading 2</button>
      <button className="border">heading 3</button>
      <button>x</button>
    </div>
  );
}

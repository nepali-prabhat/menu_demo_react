import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useRef,
  useEffect,
  Fragment,
} from "react";
import { useMenuContext } from "~/contexts/menuContext";

const MENU_TRIGGER = "/";

// This div needs to have identical styles with textarea of the AppItem component
export function AppItemCopy() {
  const caretSpanRef = useRef<HTMLSpanElement>(null);

  const { copiedValue:value , lastSelection, setSpanRect } = useMenuContext();

  useEffect(() => {
    const caretRect = caretSpanRef.current?.getBoundingClientRect();
    setSpanRect(caretRect);
  }, [lastSelection, setSpanRect]);

  return (
    <div className="absolute bottom-[0px] left-0 text-white">
      {value.substring(0, lastSelection).replace(/\s/g, "\u00a0")}
      <span ref={caretSpanRef}>.</span>
      {value.substring(lastSelection).replace(/\s/g, "\u00a0")}
    </div>
  );
}

export default function AppItem(props: {
  value: string;
  setValue: (v: string) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { spanRect, setCopiedValue, setLastSelection, setMenuPosition } = useMenuContext();

  const handleValueChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target;
    let value = element.value;
    props.setValue(value);

    const selectionStart = element.selectionStart;
    const selectionEnd = element.selectionEnd;

    if (selectionStart === selectionEnd) {
      setLastSelection(selectionStart);
      setCopiedValue(value);
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === MENU_TRIGGER) {
      const taRect = textAreaRef.current?.getBoundingClientRect();

      if (!spanRect || !taRect) return;

      setMenuPosition([spanRect.x, taRect.y + taRect.height]);

    } else {
      setMenuPosition(undefined);
    }
  };

  return (
    <Fragment>
      <textarea
        ref={textAreaRef}
        rows={1}
        className="text-md text-black"
        style={{ resize: "both" }}
        value={props.value}
        onChange={handleValueChange}
        onKeyUp={handleKeyUp}
      />
    </Fragment>
  );
}

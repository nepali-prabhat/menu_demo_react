import type {
  LegacyRef,
  ChangeEventHandler,
  KeyboardEventHandler,
  RefObject,
} from "react";
import { useMenuContext } from "~/contexts/menuContext";

const MENU_TRIGGER = "/";

export function AppItemCopy(props: {
  copyRef: LegacyRef<HTMLDivElement>;
  caretSpanRef: LegacyRef<HTMLSpanElement>;
  value: string;
}) {
  const { value, copyRef, caretSpanRef } = props;
  const {lastSelection} = useMenuContext();

  return (
    <div className="absolute bottom-[-100px] left-0 text-white" ref={copyRef}>
      {value.substring(0, lastSelection).replace(/\s/g, "\u00a0")}
      <span ref={caretSpanRef}>.</span>
      {value.substring(lastSelection).replace(/\s/g, "\u00a0")}
    </div>
  );
}

export default function AppItem(props: {
  value: string;
  setValue: (v: string) => void;

  textAreaRef: LegacyRef<HTMLTextAreaElement>;
  copyRef: RefObject<HTMLDivElement>;
  caretSpanRef: RefObject<HTMLSpanElement>;
}) {
  const { textAreaRef, copyRef, caretSpanRef } = props;

  const {setLastSelection, setMenuPosition} = useMenuContext();


  const handleValueChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target;
    let value = element.value;
    props.setValue(value);

    const selectionStart = element.selectionStart;
    const selectionEnd = element.selectionEnd;

    if (copyRef.current && selectionStart === selectionEnd) {
      setLastSelection(selectionStart);
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === MENU_TRIGGER) {
      const caretRect = caretSpanRef.current?.getBoundingClientRect();

      const taRect = (
        textAreaRef as RefObject<HTMLTextAreaElement>
      ).current?.getBoundingClientRect();

      if (!caretRect || !taRect) return;

      setMenuPosition([caretRect.x, taRect.y + taRect.height]);
    } else {
      setMenuPosition(undefined);
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      rows={1}
      className="text-black"
      style={{ resize: "both" }}
      value={props.value}
      onChange={handleValueChange}
      onKeyUp={handleKeyUp}
    />
  );
}

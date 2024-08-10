import FocusTrap from "focus-trap-react";
import { useMenuContext } from "~/contexts/menuContext";

const MENU_LABELS = ["Heading 1", "Heading 2", "Bold", "Italics"];

export default function Menu() {
  const menuCtx = useMenuContext();

  const { menuPosition, setMenuPosition } = menuCtx;

  const handleClose = () => setMenuPosition(undefined);

  return (
    <FocusTrap active={!!menuPosition} focusTrapOptions={{ onDeactivate: handleClose, clickOutsideDeactivates: true }}>
      <div
        key="PORTAL_MENU"
        id="portal-menu"
        role="menu"
        aria-orientation="vertical"
        className={`absolute top-[-6000px] z-50 mt-1 grid gap-1 border-2 border-white bg-white px-2 py-1 text-white`}
        style={ menuPosition? { left: menuPosition[0], top: menuPosition[1] }: {}}
        onClick={(e) => e.stopPropagation()}
      >
        {MENU_LABELS.map((l, i) => (
          <button
            key={`${l.split(" ").join("_")}_${1 + i}`}
            className="bg-white px-2 text-left text-black outline"
            onClick={handleClose}
          >
            {l}
          </button>
        ))}

        <button
          className="bg-white px-2 text-left text-black"
          onClick={handleClose}
        >
          x
        </button>
      </div>
    </FocusTrap>
  );
}

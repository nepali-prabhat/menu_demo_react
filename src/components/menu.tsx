import { useMenuContext } from "~/contexts/menuContext";

const MENU_LABELS = ["Heading 1", "Heading 2", "Bold", "Italics"];

export default function Menu() {
  const menuCtx = useMenuContext();

  const { menuPosition, setMenuPosition } = menuCtx;

  const handleClose = ()=> setMenuPosition(undefined);

  if (!menuPosition) {
    return null;
  }

  return (
    <div
      className={`z-50 bg-white absolute top-0 mt-1 grid gap-1 border-2 border-white px-2 py-1 text-white`}
      style={{ left: menuPosition[0], top: menuPosition[1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {MENU_LABELS.map((l, i) => (
        <button
          key={`${l.split(" ").join("_")}_${i}`}
          className="bg-white outline px-2 text-left text-black"
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
  );
}

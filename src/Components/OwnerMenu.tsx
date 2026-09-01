import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export function OwnerMenu({ show, edit, remove }: { show: boolean; edit: () => void; remove: () => void }) {
  const [open, setOpen] = useState(false);
  if (!show) return null;

  return (
    <div className="relative">
      <button className="rounded-full p-2 text-[#65758e] hover:bg-[#f2f6fb]" onClick={() => setOpen(!open)} type="button"><MoreHorizontal size={18} /></button>
      {open && (
        <div className="absolute right-0 z-20 w-40 rounded-[10px] border border-[#d9e3f0] bg-white p-2 shadow-xl">
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm hover:bg-[#f5f8fc]" onClick={edit} type="button"><Pencil size={15} /> Edit</button>
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm text-[#e11d48] hover:bg-[#fff1f2]" onClick={remove} type="button"><Trash2 size={15} /> Delete</button>
        </div>
      )}
    </div>
  );
}

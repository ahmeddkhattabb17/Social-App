import { Bell, Home, LogOut, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import RouteLogo from "../assets/route.png";
import type { AppUser } from "../services";
import type { View } from "../types";
import { cx } from "../utils";
import { Avatar } from "./Avatar";

type HeaderProps = {
  user: AppUser;
  view: View;
  unread: number;
  go: (view: View) => void;
  logout: () => void;
};

export function Header({ user, view, unread, go, logout }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["feed", "Feed", Home],
    ["profile", "Profile", User],
    ["notifications", "Notifications", Bell],
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-[#dfe6ef] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-[1260px] items-center justify-between px-4">
        <button className="flex items-center gap-3" onClick={() => go("feed")} type="button">
          <img alt="Route logo" className="h-9 w-9 rounded-full bg-[#0b349d] object-cover p-1" src={RouteLogo} />
          <span className="text-xl font-extrabold text-[#111a2f]">Route Posts</span>
        </button>
        <nav className="hidden rounded-[16px] border border-[#d8e2ef] bg-[#f8fafc] p-1 md:flex">
          {nav.map(([id, label, Icon]) => (
            <button
              className={cx(
                "relative flex h-10 items-center gap-2 rounded-[12px] px-4 text-sm font-extrabold",
                view === id ? "bg-white text-[#0875ff] shadow-sm" : "text-[#34435a] hover:bg-white",
              )}
              key={id}
              onClick={() => go(id)}
              type="button"
            >
              <Icon size={18} /> {label}
              {id === "notifications" && unread > 0 && (
                <span className="absolute -top-2 left-5 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef4444] px-1 text-xs text-white">{unread}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="relative">
          <button className="flex h-10 items-center gap-3 rounded-full border border-[#d8e2ef] bg-[#f8fafc] px-3 text-sm text-[#263650]" onClick={() => setOpen(!open)} type="button">
            <Avatar size="sm" user={user} />
            <span className="hidden max-w-[140px] truncate sm:block">{user.name}</span>
            <Menu size={17} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-52 rounded-[10px] border border-[#d9e3f0] bg-white p-2 shadow-xl">
              <button className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left text-sm text-[#314058] hover:bg-[#f5f8fc]" onClick={() => { go("profile"); setOpen(false); }} type="button"><User size={17} /> Profile</button>
              <button className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left text-sm text-[#314058] hover:bg-[#f5f8fc]" onClick={() => { go("settings"); setOpen(false); }} type="button"><Settings size={17} /> Settings</button>
              <button className="mt-2 flex w-full items-center gap-3 border-t border-[#e4ebf4] px-3 py-3 text-left text-sm font-semibold text-[#e11d48]" onClick={logout} type="button"><LogOut size={17} /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

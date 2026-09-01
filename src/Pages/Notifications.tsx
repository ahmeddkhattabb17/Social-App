import { Check } from "lucide-react";
import type { Notify } from "../services";
import { Avatar } from "../Components/Avatar";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { guest } from "../constants";
import { ago, cx } from "../utils";

export function Notifications({ items, mark, markAll }: { items: Notify[]; mark: (id: string) => void; markAll: () => void }) {
  const unread = items.filter((item) => !(item.isRead ?? item.read)).length;

  return (
    <main className="mx-auto max-w-[1260px] px-4 py-4">
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5">
          <div>
            <h1 className="text-2xl font-extrabold">Notifications</h1>
            <p className="mt-2 text-sm text-[#60708a]">Realtime updates for likes, comments, shares, and follows.</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-[#0875ff] px-4 py-2 text-sm font-extrabold text-white">All</span>
              <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-extrabold">Unread {unread}</span>
            </div>
          </div>
          <Button onClick={markAll} variant="ghost"><Check size={17} /> Mark all as read</Button>
        </div>
        <div className="space-y-3 border-t border-[#d8e2ef] bg-[#f8fafc] p-4">
          {items.length ? (
            items.map((item) => {
              const actor = item.actor ?? item.user ?? guest;
              const read = item.isRead ?? item.read;

              return (
                <div className={cx("flex items-center justify-between gap-4 rounded-[12px] border p-4", read ? "border-[#d9e3f0] bg-white" : "border-[#c5dcff] bg-[#eaf3ff]")} key={item._id}>
                  <div className="flex min-w-0 gap-3">
                    <Avatar user={actor} />
                    <div>
                      <p className="font-semibold"><span className="font-extrabold">{actor.name}</span> {item.message ?? item.text ?? `${item.type ?? "updated"} your activity`}</p>
                      <p className="mt-1 text-xs text-[#60708a]">{ago(item.createdAt)}</p>
                      {!read && <Button className="mt-2 min-h-8 px-3 text-xs" onClick={() => mark(item._id)} variant="soft"><Check size={14} /> Mark as read</Button>}
                    </div>
                  </div>
                  {!read && <span className="h-2 w-2 rounded-full bg-[#0875ff]" />}
                </div>
              );
            })
          ) : (
            <Card className="p-8 text-center"><strong>No notifications</strong><p className="mt-2 text-sm text-[#60708a]">You are all caught up.</p></Card>
          )}
        </div>
      </Card>
    </main>
  );
}

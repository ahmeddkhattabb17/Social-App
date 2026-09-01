import { Bookmark, Camera, Loader2, UsersRound } from "lucide-react";
import type { AppUser, Post } from "../services";
import { Avatar } from "../Components/Avatar";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { ProfilePost } from "../Components/ProfilePost";
import { count } from "../utils";

type ProfileProps = {
  user: AppUser;
  posts: Post[];
  loading: boolean;
  details: (post: Post) => void;
  edit: (post: Post) => void;
  remove: (post: Post) => void;
};

export function Profile({ user, posts, loading, details, edit, remove }: ProfileProps) {
  const mine = posts;

  return (
    <main className="mx-auto max-w-[1260px] px-4 pb-8">
      <section className="overflow-hidden rounded-b-[24px] bg-[linear-gradient(120deg,#17223b,#6aa4ce)] pt-16 shadow-sm">
        <div className="px-8 pb-12 text-right">
          <Button className="min-h-8 rounded-[8px] bg-[#24354d] px-3 text-xs hover:bg-[#1c2a3e]"><Camera size={14} /> Add cover</Button>
        </div>
        <div className="mx-8 -mb-16 rounded-[24px] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar size="xl" user={user} />
              <div>
                <h1 className="text-4xl font-extrabold leading-tight text-[#111a2f]">{user.name}</h1>
                <p className="mt-1 text-xl font-semibold text-[#60708a]">@{user.username ?? user.email ?? "route_member"}</p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e8f2ff] px-3 py-1 text-xs font-extrabold text-[#0875ff]"><UsersRound size={14} /> Route Posts member</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 lg:w-[520px]">
              {[["Followers", count(user.followers)], ["Following", count(user.following)], ["Bookmarks", 0]].map(([label, value]) => (
                <div className="rounded-[12px] border border-[#d7e1ef] bg-white px-4 py-5 text-center" key={label}>
                  <p className="text-xs font-extrabold uppercase text-[#60708a]">{label}</p>
                  <p className="mt-2 text-3xl font-extrabold">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_390px]">
            <div className="rounded-[12px] border border-[#d7e1ef] bg-[#f8fafc] p-4">
              <h2 className="font-extrabold">About</h2>
              <p className="mt-4 text-sm text-[#60708a]">{user.email ?? "No email available"}</p>
              <p className="mt-3 text-sm text-[#60708a]">Active on Route Posts</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-[12px] border border-[#cfe0f8] bg-[#f4f9ff] p-4"><p className="text-xs font-extrabold uppercase text-[#0b349d]">My Posts</p><p className="mt-2 text-3xl font-extrabold">{mine.length}</p></div>
              <div className="rounded-[12px] border border-[#cfe0f8] bg-[#f4f9ff] p-4"><p className="text-xs font-extrabold uppercase text-[#0b349d]">Saved Posts</p><p className="mt-2 text-3xl font-extrabold">0</p></div>
            </div>
          </div>
        </div>
      </section>
      <Card className="mt-24 flex items-center justify-between p-3">
        <div className="flex gap-2 rounded-[10px] bg-[#eef4fb] p-1">
          <button className="inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-sm font-extrabold text-[#0875ff] shadow-sm" type="button"><Bookmark size={16} /> My Posts</button>
          <button className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-extrabold text-[#52627c]" type="button"><Bookmark size={16} /> Saved</button>
        </div>
        <span className="rounded-full bg-[#e8f2ff] px-3 py-1 text-sm font-extrabold text-[#0875ff]">{mine.length}</span>
      </Card>
      <div className="mt-4 space-y-4">
        {loading ? <Card className="grid min-h-32 place-items-center p-8 text-[#60708a]"><Loader2 className="animate-spin" size={28} /></Card> : mine.length ? mine.map((post) => <ProfilePost details={details} edit={edit} key={post._id} post={post} remove={remove} user={user} />) : <Card className="p-8 text-center"><strong>No profile posts yet</strong><p className="mt-2 text-sm text-[#60708a]">Posts you create will appear here.</p></Card>}
      </div>
    </main>
  );
}

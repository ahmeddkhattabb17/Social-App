import { ChevronsLeft, ChevronsRight, Loader2, Search, UserPlus } from "lucide-react";
import type { AppUser, Post } from "../services";
import type { ReactionAction, View } from "../types";
import { Card } from "../Components/Card";
import { Composer } from "../Components/Composer";
import { PostCard } from "../Components/PostCard";
import { friends } from "../constants";

type FeedProps = {
  user: AppUser;
  posts: Post[];
  page: number;
  pages: number;
  loading: boolean;
  busy: boolean;
  editing: Post | null;
  save: (body: string, image?: File | null, id?: string) => Promise<void>;
  cancel: () => void;
  go: (view: View) => void;
  setPage: (page: number) => void;
  details: (post: Post) => void;
  edit: (post: Post) => void;
  remove: (post: Post) => void;
  react: (post: Post, action: ReactionAction) => void;
};

export function Feed({ user, posts, page, pages, loading, busy, editing, save, cancel, go, setPage, details, edit, remove, react }: FeedProps) {
  return (
    <main className="mx-auto grid max-w-[1260px] gap-4 px-4 py-4 lg:grid-cols-[280px_1fr_280px]">
      <aside className="hidden space-y-4 lg:block">
        <Card className="p-4">
          <button className="flex w-full items-center gap-3 rounded-[10px] p-2 text-left font-extrabold hover:bg-[#f5f8fc]" onClick={() => go("profile")} type="button">
            <UserPlus size={20} /> My profile
          </button>
          <button className="mt-2 flex w-full items-center gap-3 rounded-[10px] p-2 text-left font-extrabold hover:bg-[#f5f8fc]" type="button">
            <Search size={20} /> Explore Route
          </button>
        </Card>
      </aside>
      <section className="space-y-4">
        <Composer busy={busy} cancel={cancel} editing={editing} save={save} user={user} />
        {loading ? (
          <Card className="grid min-h-44 place-items-center p-8 text-[#60708a]"><Loader2 className="animate-spin" size={30} /></Card>
        ) : posts.length ? (
          posts.map((post) => <PostCard details={details} edit={edit} key={post._id} post={post} react={react} remove={remove} user={user} />)
        ) : (
          <Card className="p-8 text-center"><strong>No posts yet</strong><p className="mt-2 text-sm text-[#60708a]">Create the first one from the composer.</p></Card>
        )}
        <Card className="flex items-center justify-between p-3">
          <button className="rounded-[8px] p-2 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(Math.max(1, page - 1))} type="button"><ChevronsLeft size={20} /></button>
          <span className="text-sm font-extrabold text-[#52627c]">Page {page} of {pages}</span>
          <button className="rounded-[8px] p-2 disabled:opacity-40" disabled={page >= pages} onClick={() => setPage(Math.min(pages, page + 1))} type="button"><ChevronsRight size={20} /></button>
        </Card>
      </section>
      <aside className="hidden space-y-4 lg:block">
        <Card className="p-4">
          <h2 className="font-extrabold">People you may know</h2>
          <div className="mt-4 space-y-3">
            {friends.map(([name, username, mutual]) => (
              <div className="flex items-center justify-between gap-3" key={username}>
                <div>
                  <p className="font-bold leading-tight">{name}</p>
                  <p className="text-xs text-[#60708a]">@{username} · {mutual} mutual</p>
                </div>
                <button className="rounded-[8px] bg-[#e7f2ff] px-3 py-1 text-xs font-extrabold text-[#0875ff]" type="button">Add</button>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </main>
  );
}

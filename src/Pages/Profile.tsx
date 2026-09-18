import { Grid2X2, List, Loader2, MapPin, Settings2 } from "lucide-react";
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
  const username = user.username ?? user.email?.split("@")[0] ?? "route_member";
  const followers = count(user.followers);
  const following = count(user.following);
  const photo = user.photo;

  return (
    <main className="mx-auto max-w-[1080px] px-4 pb-10">
      <section className="overflow-hidden rounded-b-[20px] border border-[#dbe4f0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="relative h-[220px] overflow-hidden bg-[linear-gradient(135deg,#071d58_0%,#0a52bd_48%,#4c9eea_100%)]">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-36 left-1/4 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_30%)]" />
        </div>

        <div className="relative px-6 pb-7 sm:px-9">
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <div className="rounded-full border-[5px] border-white bg-white shadow-[0_8px_25px_rgba(15,23,42,0.18)]">
                {photo ? (
                  <img src={photo} alt={user.name} className="h-32 w-32 rounded-full object-cover" />
                ) : (
                  <Avatar size="xl" user={user} />
                )}
              </div>

              <div className="pb-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-[#101a2e] sm:text-3xl">{user.name}</h1>
                <p className="mt-1 text-sm font-semibold text-[#718099]">@{username}</p>
              </div>
            </div>

            <Button className="mb-2 min-h-10 rounded-[9px] border border-[#d5dfed] bg-white px-4 text-sm font-extrabold text-[#253653] shadow-sm hover:bg-[#f7f9fc]">
              <Settings2 size={16} />
              Edit Profile
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#e4eaf2] pb-6">
            <div className="text-center sm:text-left">
              <strong className="text-lg font-extrabold text-[#111a2f]">{posts.length}</strong>
              <span className="ml-2 text-sm font-medium text-[#718099]">posts</span>
            </div>
            <div className="text-center sm:text-left">
              <strong className="text-lg font-extrabold text-[#111a2f]">{followers}</strong>
              <span className="ml-2 text-sm font-medium text-[#718099]">followers</span>
            </div>
            <div className="text-center sm:text-left">
              <strong className="text-lg font-extrabold text-[#111a2f]">{following}</strong>
              <span className="ml-2 text-sm font-medium text-[#718099]">following</span>
            </div>
          </div>

          <div className="pt-5">
            <h2 className="text-sm font-extrabold text-[#17233b]">About me</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#697991]">
              {user.email ? "Connect with me on Route Posts · " + user.email : "Sharing posts and connecting with the Route Posts community."}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#7b879b]">
              <MapPin size={14} />
              Route Posts community
            </div>
          </div>
        </div>
      </section>

      <Card className="mt-5 overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-[#e1e8f1] px-4">
          <div className="flex">
            <button
              className="inline-flex items-center gap-2 border-b-2 border-[#0875ff] px-5 py-4 text-sm font-extrabold text-[#0875ff]"
              type="button"
            >
              <Grid2X2 size={17} />
              Posts
            </button>
            <button
              className="inline-flex items-center gap-2 border-b-2 border-transparent px-5 py-4 text-sm font-extrabold text-[#7a879c] hover:text-[#0875ff]"
              type="button"
            >
              <List size={17} />
              List
            </button>
          </div>
          <span className="mr-3 hidden rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-extrabold text-[#0875ff] sm:inline-flex">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </Card>

      <div className="mt-4 space-y-4">
        {loading ? (
          <Card className="grid min-h-40 place-items-center p-8 text-[#60708a]">
            <Loader2 className="animate-spin" size={28} />
          </Card>
        ) : posts.length ? (
          posts.map((post) => (
            <ProfilePost
              details={details}
              edit={edit}
              key={post._id}
              post={post}
              remove={remove}
              user={user}
            />
          ))
        ) : (
          <Card className="p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#edf5ff] text-[#0875ff]">
              <Grid2X2 size={24} />
            </div>
            <strong className="mt-4 block text-base text-[#17233b]">No posts yet</strong>
            <p className="mt-2 text-sm text-[#718099]">Posts you create will appear here.</p>
          </Card>
        )}
      </div>
    </main>
  );
}

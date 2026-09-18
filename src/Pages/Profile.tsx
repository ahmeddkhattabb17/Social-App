import { Camera, Grid2X2, Loader2 } from "lucide-react";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import type { AppUser, Post } from "../services";
import { Avatar } from "../Components/Avatar";
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
  uploadPhoto: (file: File) => void;
  busy: boolean;
};

export function Profile({ user, posts, loading, details, edit, remove, uploadPhoto, busy }: ProfileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const username = user.username ?? user.email?.split("@")[0] ?? "route_member";

  function choosePhoto() {
    inputRef.current?.click();
  }

  function onPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) uploadPhoto(file);
    event.target.value = "";
  }

  return (
    <main className="min-h-[calc(100vh-60px)] bg-[#f5f7fb] px-4 py-8">
      <div className="mx-auto max-w-[920px]">
        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-[#0b3aa8]" />

          <div className="px-5 pb-7 pt-8 sm:px-10">
            <div className="flex flex-col items-center text-center">
              <button
                className="group relative rounded-full focus:outline-none focus:ring-4 focus:ring-[#0b3aa8]/15"
                onClick={choosePhoto}
                type="button"
                title="Change profile photo"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-[0_5px_20px_rgba(0,0,0,.14)] sm:h-36 sm:w-36"
                  />
                ) : (
                  <Avatar size="xl" user={user} />
                )}
                <span className="absolute bottom-1 right-1 grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-[#0b3aa8] text-white shadow-md transition group-hover:scale-105">
                  {busy ? <Loader2 className="animate-spin" size={16} /> : <Camera size={17} />}
                </span>
              </button>

              <input ref={inputRef} accept="image/*" className="hidden" onChange={onPhotoChange} type="file" />

              <h1 className="mt-5 text-2xl font-extrabold text-[#111827] sm:text-3xl">{user.name}</h1>
              <p className="mt-1 text-sm font-medium text-[#7b8798]">@{username}</p>

              <div className="mt-7 grid w-full max-w-[560px] grid-cols-3 overflow-hidden rounded-[10px] border border-[#e1e6ee] bg-white">
                <div className="border-r border-[#e1e6ee] px-3 py-4">
                  <p className="text-xl font-extrabold text-[#111827]">{posts.length}</p>
                  <p className="mt-1 text-xs font-semibold text-[#7b8798]">Posts</p>
                </div>
                <div className="border-r border-[#e1e6ee] px-3 py-4">
                  <p className="text-xl font-extrabold text-[#111827]">{count(user.followers)}</p>
                  <p className="mt-1 text-xs font-semibold text-[#7b8798]">Followers</p>
                </div>
                <div className="px-3 py-4">
                  <p className="text-xl font-extrabold text-[#111827]">{count(user.following)}</p>
                  <p className="mt-1 text-xs font-semibold text-[#7b8798]">Following</p>
                </div>
              </div>

              <div className="mt-6 max-w-[620px]">
                <p className="text-sm leading-6 text-[#657287]">
                  {user.email ?? "Welcome to Route Posts. Share your thoughts and connect with the community."}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <div className="flex items-center justify-between border-b border-[#dfe5ed] px-1 pb-3">
            <div className="flex items-center gap-2 text-[#111827]">
              <Grid2X2 size={18} className="text-[#0b3aa8]" />
              <h2 className="text-lg font-extrabold">Posts</h2>
            </div>
            <span className="text-xs font-semibold text-[#7b8798]">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

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
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#edf3ff] text-[#0b3aa8]">
                  <Grid2X2 size={24} />
                </div>
                <strong className="mt-4 block text-base text-[#17233b]">No posts yet</strong>
                <p className="mt-2 text-sm text-[#718099]">Posts you create will appear here.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

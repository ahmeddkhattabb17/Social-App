import { Camera, Grid2X2, Loader2 } from "lucide-react";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import type { AppUser, Post } from "../services";
import { Avatar } from "../Components/Avatar";
import { Card } from "../Components/Card";
import { ProfilePost } from "../Components/ProfilePost";

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

export function Profile({
  user,
  posts,
  loading,
  details,
  edit,
  remove,
  uploadPhoto,
  busy,
}: ProfileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const username = user.username ?? user.email?.split("@")[0] ?? "route_member";
  const followers = Array.isArray(user.followers) ? user.followers.length : 0;
  const following = Array.isArray(user.following) ? user.following.length : 0;

  function choosePhoto() {
    inputRef.current?.click();
  }

  function onPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) uploadPhoto(file);
    event.target.value = "";
  }

  return (
    <main className="min-h-[calc(100vh-60px)] bg-[#f3f5f8] pb-12">
      <div className="mx-auto w-full max-w-[1040px] px-0 sm:px-4 lg:px-6">
        <Card className="overflow-hidden rounded-none border-x-0 border-t-0 p-0 shadow-sm sm:rounded-[12px] sm:border">
          <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-[#0a349b] via-[#0b5ed7] to-[#0788ff] sm:h-[220px]">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/10" />
            <div className="absolute right-24 top-16 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-28 left-8 h-60 w-60 rounded-full bg-white/[0.08]" />
          </div>

          <div className="relative px-5 pb-7 sm:px-8">
            <div className="-mt-16 flex flex-col items-center sm:-mt-[76px] sm:flex-row sm:items-end sm:justify-between">
              <button
                className="group relative rounded-full focus:outline-none focus:ring-4 focus:ring-[#0875ff]/20"
                onClick={choosePhoto}
                type="button"
                title="Change profile photo"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-[5px] border-white bg-white object-cover shadow-lg sm:h-[150px] sm:w-[150px]"
                  />
                ) : (
                  <div className="rounded-full border-[5px] border-white bg-white shadow-lg">
                    <Avatar size="xl" user={user} />
                  </div>
                )}

                <span className="absolute bottom-1 right-1 grid h-10 w-10 place-items-center rounded-full border-[3px] border-white bg-[#0875ff] text-white shadow-md transition-transform group-hover:scale-105">
                  {busy ? <Loader2 className="animate-spin" size={17} /> : <Camera size={17} />}
                </span>
              </button>

              <button
                className="mt-4 rounded-[9px] border border-[#d6deea] bg-white px-5 py-2.5 text-sm font-bold text-[#24344f] shadow-sm transition hover:border-[#0875ff] hover:text-[#0875ff] sm:mb-1 sm:mt-0"
                onClick={choosePhoto}
                type="button"
              >
                Edit profile
              </button>
            </div>

            <input
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
              type="file"
            />

            <div className="mt-4 text-center sm:text-left">
              <h1 className="text-[25px] font-extrabold tracking-[-0.02em] text-[#111827]">
                {user.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-[#7a879a]">@{username}</p>

              <p className="mx-auto mt-4 max-w-[650px] text-sm leading-6 text-[#5f6d82] sm:mx-0">
                {user.email ?? "Share your thoughts, discover new posts, and stay connected with the Route Posts community."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 border-t border-[#e6eaf0] pt-5 sm:justify-start">
              <div className="text-center sm:text-left">
                <strong className="block text-[17px] font-extrabold text-[#111827]">{posts.length}</strong>
                <span className="text-xs font-semibold text-[#7b8798]">Posts</span>
              </div>
              <div className="text-center sm:text-left">
                <strong className="block text-[17px] font-extrabold text-[#111827]">{followers}</strong>
                <span className="text-xs font-semibold text-[#7b8798]">Followers</span>
              </div>
              <div className="text-center sm:text-left">
                <strong className="block text-[17px] font-extrabold text-[#111827]">{following}</strong>
                <span className="text-xs font-semibold text-[#7b8798]">Following</span>
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-5">
          <div className="flex h-12 items-center border-b border-[#dfe5ec] bg-transparent px-1">
            <button
              className="relative flex h-full items-center gap-2 px-4 text-sm font-extrabold text-[#0875ff]"
              type="button"
            >
              <Grid2X2 size={17} />
              Posts
              <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#0875ff]" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {loading ? (
              <Card className="grid min-h-44 place-items-center p-8 text-[#60708a]">
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
              <Card className="p-12 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#eaf2ff] text-[#0875ff]">
                  <Grid2X2 size={23} />
                </div>
                <h2 className="mt-4 text-base font-extrabold text-[#17233b]">No posts yet</h2>
                <p className="mt-2 text-sm text-[#718099]">
                  Your posts will appear here when you share something.
                </p>
              </Card>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

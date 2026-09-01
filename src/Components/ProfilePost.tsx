import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { AppUser, Post } from "../services";
import { count, friendlyDate, imgOf, ownerOf, textOf } from "../utils";
import { Avatar } from "./Avatar";
import { Card } from "./Card";
import { OwnerMenu } from "./OwnerMenu";

type ProfilePostProps = {
  post: Post;
  user: AppUser;
  details: (post: Post) => void;
  edit: (post: Post) => void;
  remove: (post: Post) => void;
};

export function ProfilePost({ post, user, details, edit, remove }: ProfilePostProps) {
  const owner = ownerOf(post);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Avatar size="sm" user={owner} />
            <div>
              <p className="font-extrabold leading-tight text-[#050b18]">{owner.name}</p>
              <p className="text-xs text-[#60708a]">@{owner.username ?? owner.email ?? "route_member"}</p>
            </div>
          </div>
          {textOf(post) && <p className="mt-4 whitespace-pre-wrap text-[15px] leading-6 text-[#071836]">{textOf(post)}</p>}
          {imgOf(post) && <img alt="Post attachment" className="mt-4 max-h-[360px] w-full rounded-[10px] object-cover" src={imgOf(post)} />}
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <button className="px-2 py-1 text-xs font-extrabold text-[#0875ff]" onClick={() => details(post)} type="button">View details</button>
          <OwnerMenu edit={() => edit(post)} remove={() => remove(post)} show={owner._id === user._id} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d8e2ef] px-4 py-3 text-sm text-[#52627c]">
        <div className="flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2 text-[#0875ff]"><Heart size={16} /> <span className="text-[#52627c]">{post.likesCount ?? count(post.likes)} likes</span></span>
          <span className="inline-flex items-center gap-2 text-[#0875ff]"><Share2 size={16} /> <span className="text-[#52627c]">{post.sharesCount ?? count(post.shares)} shares</span></span>
          <span className="inline-flex items-center gap-2 text-[#0875ff]"><MessageCircle size={16} /> <span className="text-[#52627c]">{post.commentsCount ?? count(post.comments)} comments</span></span>
        </div>
        <span>{friendlyDate(post.createdAt)}</span>
      </div>
    </Card>
  );
}

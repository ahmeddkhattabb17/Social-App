import { Bookmark, Heart, MessageCircle, Send, Share2 } from "lucide-react";
import type { AppUser, Post } from "../services";
import type { ReactionAction } from "../types";
import { count, friendlyDate, imgOf, ownerOf, textOf } from "../utils";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Card } from "./Card";
import { OwnerMenu } from "./OwnerMenu";

type PostCardProps = {
  post: Post;
  user: AppUser;
  details: (post: Post) => void;
  edit: (post: Post) => void;
  remove: (post: Post) => void;
  react: (post: Post, action: ReactionAction) => void;
  compact?: boolean;
};

export function PostCard({ post, user, details, edit, remove, react, compact }: PostCardProps) {
  const owner = ownerOf(post);
  const comments = post.commentsCount ?? count(post.comments);
  const likes = post.likesCount ?? count(post.likes);
  const shares = post.sharesCount ?? count(post.shares);

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <Avatar user={owner} />
            <div>
              <p className="font-extrabold text-[#050b18]">{owner.name}</p>
              <p className="text-xs text-[#52627c]">@{owner.username ?? owner.email ?? "route_member"} · {friendlyDate(post.createdAt)}</p>
            </div>
          </div>
          <OwnerMenu edit={() => edit(post)} remove={() => remove(post)} show={owner._id === user._id} />
        </div>
        {textOf(post) && <p className="mt-4 whitespace-pre-wrap text-[15px] leading-6 text-[#071836]">{textOf(post)}</p>}
        {imgOf(post) && <img alt="Post attachment" className="mt-4 max-h-[520px] w-full rounded-[12px] object-cover" src={imgOf(post)} />}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[#d8e2ef] px-4 py-3 text-sm text-[#52627c]">
        <span>{likes} likes</span>
        <button className="hover:text-[#0875ff]" onClick={() => details(post)} type="button">{comments} comments</button>
        <span>{shares} shares</span>
      </div>
      {!compact && (
        <div className="grid grid-cols-4 gap-1 p-2 text-sm font-extrabold text-[#52627c]">
          <button className="inline-flex items-center justify-center gap-2 rounded-[8px] py-2 hover:bg-[#f4f7fb] hover:text-[#0875ff]" onClick={() => react(post, "like")} type="button"><Heart size={17} /> Like</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-[8px] py-2 hover:bg-[#f4f7fb] hover:text-[#0875ff]" onClick={() => details(post)} type="button"><MessageCircle size={17} /> Comment</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-[8px] py-2 hover:bg-[#f4f7fb] hover:text-[#0875ff]" onClick={() => react(post, "share")} type="button"><Share2 size={17} /> Share</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-[8px] py-2 hover:bg-[#f4f7fb] hover:text-[#0875ff]" onClick={() => react(post, "bookmark")} type="button"><Bookmark size={17} /> Save</button>
        </div>
      )}
      {!compact && (
        <div className="border-t border-[#d8e2ef] p-3">
          <Button className="w-full justify-start bg-[#f3f7fb] text-[#60708a] hover:bg-[#edf3fb]" onClick={() => details(post)} variant="plain">
            <Send size={16} /> Write a comment
          </Button>
        </div>
      )}
    </Card>
  );
}

import { Image, Loader2, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { AppUser, Comment, Post } from "../services";
import type { ReactionAction } from "../types";
import { Avatar } from "../Components/Avatar";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { CommentRow } from "../Components/CommentRow";
import { PostCard } from "../Components/PostCard";

type DetailsProps = {
  post: Post | null;
  user: AppUser;
  comments: Comment[];
  loading: boolean;
  back: () => void;
  editPost: (post: Post) => void;
  removePost: (post: Post) => void;
  react: (post: Post, action: ReactionAction) => void;
  createComment: (text: string, image?: File | null) => Promise<void>;
  updateComment: (comment: Comment, text: string, image?: File | null) => Promise<void>;
  removeComment: (comment: Comment) => void;
};

export function Details({ post, user, comments, loading, back, editPost, removePost, react, createComment, updateComment, removeComment }: DetailsProps) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim() && !image) return;
    await createComment(body.trim(), image);
    setBody("");
    setImage(null);
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-[760px] px-4 py-6">
        <Card className="p-8 text-center"><strong>Post not found</strong><Button className="mt-4" onClick={back}>Back to feed</Button></Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[760px] px-4 py-6">
      <button className="mb-4 text-sm font-extrabold text-[#0875ff]" onClick={back} type="button">Back to feed</button>
      <PostCard compact details={() => undefined} edit={editPost} post={post} react={react} remove={removePost} user={user} />
      <Card className="mt-4 p-4">
        <form className="flex gap-3" onSubmit={submit}>
          <Avatar user={user} />
          <div className="flex-1">
            <textarea className="min-h-20 w-full resize-y rounded-[12px] border border-[#d7e1ef] bg-[#f8fafc] p-3 text-sm outline-none" onChange={(event) => setBody(event.target.value)} placeholder="Write a comment..." value={body} />
            <div className="mt-2 flex items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-[8px] px-2 py-1 text-xs font-semibold text-[#52627c] hover:bg-[#f5f8fc]">
                <Image size={14} /> Image
                <input accept="image/*" className="hidden" onChange={(event) => setImage(event.target.files?.[0] ?? null)} type="file" />
              </label>
              {image && <span className="max-w-[180px] truncate text-xs text-[#60708a]">{image.name}</span>}
              <Button className="ml-auto min-h-9 px-3 text-xs" type="submit"><Send size={14} /> Comment</Button>
            </div>
          </div>
        </form>
      </Card>
      <div className="mt-4 space-y-3">
        {loading ? (
          <Card className="grid min-h-28 place-items-center p-8 text-[#60708a]"><Loader2 className="animate-spin" size={26} /></Card>
        ) : comments.length ? (
          comments.map((comment) => <CommentRow comment={comment} current={user} key={comment._id} postOwner={post.user?._id ?? post.createdBy?._id ?? ""} remove={removeComment} update={updateComment} />)
        ) : (
          <Card className="p-8 text-center"><strong>No comments yet</strong><p className="mt-2 text-sm text-[#60708a]">Start the conversation.</p></Card>
        )}
      </div>
    </main>
  );
}

import { Image, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { AppUser, Comment } from "../services";
import { count, friendlyDate, imgOf, ownerOf, textOf } from "../utils";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

type CommentRowProps = {
  comment: Comment;
  current: AppUser;
  postOwner: string;
  update: (comment: Comment, text: string, image?: File | null) => Promise<void>;
  remove: (comment: Comment) => void;
};

export function CommentRow({ comment, current, postOwner, update, remove }: CommentRowProps) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(textOf(comment));
  const [image, setImage] = useState<File | null>(null);
  const owner = ownerOf(comment);
  const canManage = owner._id === current._id || postOwner === current._id;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await update(comment, body, image);
    setEditing(false);
    setImage(null);
  }

  return (
    <div className="flex gap-3 rounded-[12px] bg-[#f8fafc] p-3">
      <Avatar size="sm" user={owner} />
      <div className="min-w-0 flex-1">
        {editing ? (
          <form onSubmit={submit}>
            <textarea className="min-h-20 w-full resize-y rounded-[10px] border border-[#d7e1ef] bg-white p-3 text-sm outline-none" onChange={(event) => setBody(event.target.value)} value={body} />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-[8px] px-2 py-1 text-xs font-semibold text-[#52627c] hover:bg-white">
                <Image size={14} /> Image
                <input accept="image/*" className="hidden" onChange={(event) => setImage(event.target.files?.[0] ?? null)} type="file" />
              </label>
              {image && <span className="max-w-[160px] truncate text-xs text-[#60708a]">{image.name}</span>}
              <Button className="ml-auto min-h-8 px-3 text-xs" type="submit"><Send size={14} /> Save</Button>
              <Button className="min-h-8 px-3 text-xs" onClick={() => setEditing(false)} variant="ghost">Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <div className="rounded-[12px] bg-white p-3">
              <p className="font-extrabold leading-tight">{owner.name}</p>
              {textOf(comment) && <p className="mt-2 whitespace-pre-wrap text-sm">{textOf(comment)}</p>}
              {imgOf(comment) && <img alt="Comment attachment" className="mt-3 max-h-64 rounded-[10px] object-cover" src={imgOf(comment)} />}
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-[#60708a]">
              <span>{friendlyDate(comment.createdAt)}</span>
              <span>Like ({count(comment.likes)})</span>
              <span>Reply</span>
              {canManage && <button className="text-[#0875ff]" onClick={() => setEditing(true)} type="button">Edit</button>}
              {canManage && <button className="text-[#e11d48]" onClick={() => remove(comment)} type="button">Delete</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

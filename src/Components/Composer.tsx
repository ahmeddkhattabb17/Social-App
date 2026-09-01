import { ChevronDown, Globe2, Image, Loader2, Send, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { AppUser, Post } from "../services";
import { textOf } from "../utils";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Card } from "./Card";

type ComposerProps = {
  user: AppUser;
  editing: Post | null;
  busy: boolean;
  save: (body: string, image?: File | null, id?: string) => Promise<void>;
  cancel: () => void;
};

export function Composer({ user, editing, busy, save, cancel }: ComposerProps) {
  const [body, setBody] = useState(editing ? textOf(editing) : "");
  const [image, setImage] = useState<File | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim() && !image) return;
    await save(body.trim(), image, editing?._id);
    setBody("");
    setImage(null);
  }

  return (
    <Card className="p-4">
      <form onSubmit={submit}>
        <div className="flex items-center gap-3">
          <Avatar user={user} />
          <div>
            <p className="font-extrabold">{user.name}</p>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#edf3fb] px-3 py-1 text-xs font-semibold text-[#314058]"><Globe2 size={13} /> Public <ChevronDown size={13} /></span>
          </div>
        </div>
        <textarea className="mt-4 min-h-28 w-full resize-y rounded-[14px] border border-[#d7e1ef] bg-[#f8fafc] p-4 text-base outline-none placeholder:text-[#8a9ab4]" onChange={(event) => setBody(event.target.value)} placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`} value={body} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#d8e2ef] pt-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] px-3 py-2 text-sm font-semibold text-[#52627c] hover:bg-[#f5f8fc]">
            <Image className="text-[#00a96e]" size={18} /> Photo/video
            <input accept="image/*" className="hidden" onChange={(event) => setImage(event.target.files?.[0] ?? null)} type="file" />
          </label>
          {image && <span className="max-w-[220px] truncate text-sm text-[#60708a]">{image.name}</span>}
          <div className="ml-auto flex gap-2">
            {editing && <Button onClick={cancel} variant="ghost"><X size={16} /> Cancel</Button>}
            <Button disabled={busy} type="submit">{busy ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}{editing ? "Update" : "Post"}</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

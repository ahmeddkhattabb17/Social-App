import type { Comment, Post } from "./services";
import { guest } from "./constants";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function textOf(item: Post | Comment) {
  return item.body ?? item.content ?? item.text ?? "";
}

export function imgOf(item: Post | Comment) {
  return item.image ?? item.photo ?? "";
}

export function ownerOf(item: Post | Comment) {
  return item.user ?? item.createdBy ?? guest;
}

export function count(value?: unknown[] | number) {
  return Array.isArray(value) ? value.length : typeof value === "number" ? value : 0;
}

export function friendlyDate(value?: string) {
  if (!value) return "Just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function ago(value?: string) {
  if (!value) return "now";
  const date = new Date(value).getTime();
  if (Number.isNaN(date)) return "now";
  const seconds = Math.max(1, Math.floor((Date.now() - date) / 1000));
  if (seconds >= 86400) return `${Math.floor(seconds / 86400)}d`;
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h`;
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m`;
  return "now";
}

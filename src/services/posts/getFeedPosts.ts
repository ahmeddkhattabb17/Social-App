import { request } from "../core/request";
import { LIMIT } from "../types";

export function getFeedPosts(token: string, page: number) {
  return request<unknown>(`/posts/feed?only=all&page=${page}&limit=${LIMIT}`, {}, token);
}

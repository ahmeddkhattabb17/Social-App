import { request } from "../core/request";

export function getMyPosts(token: string) {
  return request<unknown>("/posts/feed?only=me&page=1&limit=100", {}, token);
}

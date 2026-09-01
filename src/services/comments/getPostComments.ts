import { request } from "../core/request";

export function getPostComments(token: string, postId: string) {
  return request<unknown>(`/posts/${postId}/comments?page=1&limit=100`, {}, token);
}

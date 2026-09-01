import { request } from "../core/request";

export function deletePost(token: string, postId: string) {
  return request(`/posts/${postId}`, { method: "DELETE" }, token);
}

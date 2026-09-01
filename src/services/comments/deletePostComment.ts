import { request } from "../core/request";

export function deletePostComment(token: string, postId: string, commentId: string) {
  return request(`/posts/${postId}/comments/${commentId}`, { method: "DELETE" }, token);
}

import { postForm } from "../core/postForm";
import { request } from "../core/request";

export function updatePostComment(token: string, postId: string, commentId: string, body: string, image?: File | null) {
  return request(`/posts/${postId}/comments/${commentId}`, { method: "PUT", body: postForm(body, image) }, token);
}

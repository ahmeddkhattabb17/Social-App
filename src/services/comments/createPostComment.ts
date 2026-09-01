import { postForm } from "../core/postForm";
import { request } from "../core/request";

export function createPostComment(token: string, postId: string, body: string, image?: File | null) {
  return request(`/posts/${postId}/comments`, { method: "POST", body: postForm(body, image) }, token);
}

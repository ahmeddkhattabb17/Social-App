import { request } from "../core/request";

export function reactToPost(token: string, postId: string, action: "like" | "bookmark" | "share") {
  return request(`/posts/${postId}/${action}`, { method: action === "share" ? "POST" : "PUT" }, token);
}

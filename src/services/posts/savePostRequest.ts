import { postForm } from "../core/postForm";
import { request } from "../core/request";

export function savePostRequest(token: string, body: string, image?: File | null, id?: string) {
  return request(id ? `/posts/${id}` : "/posts", { method: id ? "PUT" : "POST", body: postForm(body, image) }, token);
}

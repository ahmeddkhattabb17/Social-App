import { request } from "../core/request";

export function uploadProfilePhoto(token: string, file: File) {
  const body = new FormData();
  body.append("photo", file);
  return request<unknown>("/users/upload-photo", { method: "PUT", body }, token);
}

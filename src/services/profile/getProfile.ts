import { request } from "../core/request";

export function getProfile(token: string) {
  return request<unknown>("/users/profile-data", {}, token);
}

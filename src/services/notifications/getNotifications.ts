import { request } from "../core/request";

export function getNotifications(token: string) {
  return request<unknown>("/notifications?page=1&limit=20", {}, token);
}

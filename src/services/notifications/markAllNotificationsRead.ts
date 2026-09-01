import { request } from "../core/request";

export function markAllNotificationsRead(token: string) {
  return request("/notifications/read-all", { method: "PATCH" }, token);
}

import { request } from "../core/request";

export function markNotificationRead(token: string, id: string) {
  return request(`/notifications/${id}/read`, { method: "PATCH" }, token);
}

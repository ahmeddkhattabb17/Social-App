import { request } from "../core/request";

export function changePasswordRequest(token: string, currentPassword: string, password: string, rePassword: string) {
  return request<Record<string, unknown>>(
    "/users/change-password",
    {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, password, rePassword }),
    },
    token,
  );
}

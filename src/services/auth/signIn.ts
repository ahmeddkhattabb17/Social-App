import { request } from "../core/request";

export function signIn(login: string, password: string) {
  return request<Record<string, unknown>>("/users/signin", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
}

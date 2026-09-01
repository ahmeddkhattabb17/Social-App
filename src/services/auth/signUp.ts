import { request } from "../core/request";

export function signUp(data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
  username?: string;
}) {
  return request<Record<string, unknown>>("/users/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

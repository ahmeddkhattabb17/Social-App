import type { ApiResponse } from "../types";

const API = "https://route-posts.routemisr.com";
const pendingGets = new Map<string, Promise<ApiResponse<unknown>>>();

export async function request<T>(path: string, init: RequestInit = {}, token?: string | null) {
  const method = init.method?.toUpperCase() ?? "GET";
  const pendingKey = method === "GET" ? `${token ?? "guest"}:${path}` : "";

  if (pendingKey) {
    const pending = pendingGets.get(pendingKey);
    if (pending) return pending as Promise<ApiResponse<T>>;
  }

  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");

  const responsePromise = fetch(`${API}${path}`, { ...init, headers })
    .then(async (response) => {
      const payload = (await response.json().catch(() => ({ message: "Request failed" }))) as ApiResponse<T>;

      if (!response.ok || payload.success === false) {
        const details = Array.isArray(payload.errors) ? payload.errors.join(", ") : payload.errors;
        throw new Error(details || payload.message || "Request failed");
      }

      return payload;
    })
    .finally(() => {
      if (pendingKey) pendingGets.delete(pendingKey);
    });

  if (pendingKey) pendingGets.set(pendingKey, responsePromise as Promise<ApiResponse<unknown>>);

  return responsePromise;
}

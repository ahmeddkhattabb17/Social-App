export function errText(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function list<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  const value = record.posts ?? record.comments ?? record.notifications ?? record.items ?? record.docs ?? record.data;
  return Array.isArray(value) ? (value as T[]) : [];
}

export function object<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const value = record.user ?? record.profile ?? record.data ?? payload;
  return value && typeof value === "object" ? (value as T) : null;
}

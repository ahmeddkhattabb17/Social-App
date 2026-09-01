import RouteLogo from "../assets/route.png";
import type { AppUser } from "../services";
import { guest } from "../constants";
import { cx } from "../utils";

export function Avatar({ user = guest, size = "md" }: { user?: AppUser; size?: "sm" | "md" | "lg" | "xl" }) {
  const dim = size === "xl" ? "h-28 w-28" : size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <img
      alt={user.name}
      className={cx(dim, "shrink-0 rounded-full border-2 border-white bg-[#e8f2ff] object-cover shadow-sm")}
      onError={(event) => {
        event.currentTarget.src = RouteLogo;
      }}
      src={user.photo || RouteLogo}
    />
  );
}

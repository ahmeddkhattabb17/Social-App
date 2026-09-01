import type { ReactNode } from "react";
import { cx } from "../utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("rounded-[14px] border border-[#d9e3f0] bg-white shadow-sm", className)}>{children}</section>;
}

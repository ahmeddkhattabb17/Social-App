import type { ReactNode } from "react";
import { cx } from "../utils";

type ButtonVariant = "primary" | "soft" | "ghost" | "danger" | "plain";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};

export function Button({ children, onClick, type = "button", variant = "primary", disabled, className }: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#0b349d] text-white hover:bg-[#092b82]",
        variant === "soft" && "bg-[#e7f2ff] text-[#0875ff] hover:bg-[#d9ebff]",
        variant === "ghost" && "border border-[#d7e1ef] bg-white text-[#314058] hover:bg-[#f6f9fd]",
        variant === "danger" && "bg-[#fff1f2] text-[#e11d48] hover:bg-[#ffe4e6]",
        variant === "plain" && "text-[#314058] hover:bg-[#f6f9fd]",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

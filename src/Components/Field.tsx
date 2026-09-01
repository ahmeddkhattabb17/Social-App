import type { ReactNode } from "react";

type FieldProps = {
  icon: ReactNode;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
};

export function Field({ icon, value, setValue, placeholder, type = "text", required }: FieldProps) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-[#8da0c1]">{icon}</span>
      <input
        className="h-[46px] w-full rounded-[10px] border border-[#d4dfed] bg-[#f8fafc] pl-12 pr-4 text-sm outline-none placeholder:text-[#8a9ab4] focus:border-[#7fb2ff] focus:ring-4 focus:ring-[#ddebff]"
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

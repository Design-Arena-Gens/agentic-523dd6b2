"use client";

import { useId } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder }: Props) {
  const id = useId();
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search"}
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2 outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/50"
      />
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">?K</div>
    </div>
  );
}

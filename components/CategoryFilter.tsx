"use client";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
};

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const isActive = c === selected;
        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={
              "px-3 py-1 rounded-md border text-sm transition " +
              (isActive
                ? "bg-accent/20 border-accent/50 text-white"
                : "bg-white/5 border-white/10 text-muted hover:text-fg")
            }
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

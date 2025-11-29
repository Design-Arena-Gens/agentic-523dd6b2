"use client";

import Link from "next/link";
import { Prompt } from "@/app/page";

type Props = {
  prompt: Prompt;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  href: string;
};

export function PromptCard({ prompt, bookmarked, onToggleBookmark, href }: Props) {
  return (
    <div className="group rounded-lg border border-white/10 bg-white/5 p-4 hover:border-accent/40 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted">{prompt.category}</div>
          <h3 className="mt-1 text-lg font-semibold leading-tight">
            <Link href={href} className="hover:underline">
              {prompt.title}
            </Link>
          </h3>
        </div>
        <button
          onClick={onToggleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          className={
            "rounded-md border px-2 py-1 text-xs transition " +
            (bookmarked ? "bg-accent/20 border-accent/40" : "bg-white/5 border-white/10 text-muted hover:text-fg")
          }
        >
          {bookmarked ? "Saved" : "Save"}
        </button>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{prompt.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {prompt.tags.slice(0, 4).map((t) => (
          <span key={t} className="badge">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link href={href} className="text-sm text-accent hover:underline">
          View
        </Link>
        <button
          onClick={() => navigator.clipboard.writeText(prompt.prompt)}
          className="text-sm text-muted hover:text-fg"
        >
          Copy prompt
        </button>
      </div>
    </div>
  );
}

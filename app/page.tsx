"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import promptsData from "@/data/prompts.json";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptCard } from "@/components/PromptCard";

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
};

const allPrompts: Prompt[] = promptsData as unknown as Prompt[];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [bookmarks, setBookmarks] = useState<Record<string, true>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("chatptatlas_bookmarks");
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {}
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    allPrompts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPrompts.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      if (!q) return inCategory;
      const hay = (p.title + " " + p.description + " " + p.tags.join(" ") + " " + p.prompt).toLowerCase();
      return inCategory && hay.includes(q);
    });
  }, [query, category]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      try {
        localStorage.setItem("chatptatlas_bookmarks", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const bookmarkedCount = Object.keys(bookmarks).length;

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Find the right prompt, faster
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          ChatPT Atlas is a curated directory of high-quality prompts for work, code, and creativity.
        </p>
      </section>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} placeholder="Search prompts, e.g. 'bug report', 'email follow-up'" />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="badge">{filtered.length} results</span>
          <span className="badge">{bookmarkedCount} saved</span>
        </div>
      </div>

      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PromptCard
            key={p.id}
            prompt={p}
            bookmarked={!!bookmarks[p.id]}
            onToggleBookmark={() => toggleBookmark(p.id)}
            href={`/prompts/${p.slug}`}
          />
        ))}
      </div>

      <section className="mt-8 text-center">
        <Link className="button-primary" href="#">Submit a prompt</Link>
      </section>
    </div>
  );
}

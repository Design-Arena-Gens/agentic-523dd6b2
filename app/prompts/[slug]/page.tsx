import { notFound } from "next/navigation";
import Link from "next/link";
import prompts from "@/data/prompts.json";

export async function generateStaticParams() {
  return (prompts as any[]).map((p) => ({ slug: p.slug }));
}

export default function PromptDetail({ params }: { params: { slug: string } }) {
  const all = prompts as any[];
  const prompt = all.find((p) => p.slug === params.slug);
  if (!prompt) return notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-xs text-muted">{prompt.category}</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{prompt.title}</h1>
      <p className="mt-2 text-muted">{prompt.description}</p>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted">Prompt</h2>
          <button
            className="text-sm text-muted hover:text-fg"
            onClick={() => navigator.clipboard.writeText(prompt.prompt)}
          >
            Copy
          </button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap text-sm leading-6">{prompt.prompt}</pre>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {prompt.tags.map((t: string) => (
          <span key={t} className="badge">#{t}</span>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-accent hover:underline">
          ? Back to Atlas
        </Link>
      </div>
    </div>
  );
}

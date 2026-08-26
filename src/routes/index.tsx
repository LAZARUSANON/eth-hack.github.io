import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Shield } from "lucide-react";
import { MODULES } from "@/data/modules";
import { loadSaved } from "@/lib/quiz-store";
import { QuizShell } from "@/components/quiz-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [progress, setProgress] = useState<Record<string, { a: number; c: number }>>({});

  useEffect(() => {
    const saved = loadSaved();
    const next: Record<string, { a: number; c: number }> = {};
    for (const m of MODULES) {
      const s = saved[m.id] ?? [];
      next[m.id] = {
        a: s.filter((x) => x.answered).length,
        c: s.filter((x) => x.correct).length,
      };
    }
    setProgress(next);
  }, []);

  const totalA = Object.values(progress).reduce((n, v) => n + v.a, 0);
  const totalC = Object.values(progress).reduce((n, v) => n + v.c, 0);

  return (
    <QuizShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          index4.html · 9 modules · 225 questions
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Ethical Hacker quizzes from 2.4.3 through 10.3.3
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Select an answer and it is marked instantly. Finish a module to continue to the next
          page. Progress is saved in this browser.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
          <span className="rounded-lg border border-border bg-surface px-3 py-2">
            Answered <strong className="text-fg">{totalA}</strong> / 225
          </span>
          <span className="rounded-lg border border-border bg-surface px-3 py-2">
            Correct <strong className="text-ok">{totalC}</strong>
          </span>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => {
            const p = progress[m.id] ?? { a: 0, c: 0 };
            return (
              <Link
                key={m.id}
                to="/quiz/$id"
                params={{ id: m.id }}
                className="group flex flex-col rounded-xl border border-border bg-surface p-4 no-underline transition hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{m.code}</span>
                  <span className="text-xs text-muted">
                    {p.a}/25 · {p.c} correct
                  </span>
                </div>
                <h2 className="mt-2 text-base font-semibold leading-snug text-fg">{m.title}</h2>
                <p className="mt-1 flex-1 text-sm text-muted">{m.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {i === 0 ? "Start" : "Open"} module
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 flex items-center gap-2 text-xs text-muted">
          <Shield className="size-3.5" /> Instant marking · 25 questions per module
        </p>
      </main>
    </QuizShell>
  );
}

import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { MODULES } from "@/data/modules";
import { cn } from "@/lib/utils";

export function QuizShell({
  children,
  activeId,
}: {
  children: React.ReactNode;
  activeId?: string;
}) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg-2/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-fg">
              <Shield className="size-5" strokeWidth={2.2} />
            </span>
            <span>
              <span className="block font-mono text-[11px] tracking-widest text-primary uppercase">
                index4.html
              </span>
              <span className="block text-sm font-semibold leading-tight">
                Ethical Hacker Quizzes
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 overflow-x-auto md:flex">
            {MODULES.map((m) => (
              <Link
                key={m.id}
                to="/quiz/$id"
                params={{ id: m.id }}
                className={cn(
                  "rounded-md px-2 py-1 font-mono text-[11px] no-underline",
                  activeId === m.id
                    ? "bg-primary text-primary-fg"
                    : "text-muted hover:bg-surface hover:text-fg",
                )}
              >
                {m.code}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

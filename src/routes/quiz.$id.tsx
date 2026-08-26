import { createFileRoute, Link } from "@tanstack/react-router";
import { getModule } from "@/data/modules";
import { QuizShell } from "@/components/quiz-shell";
import { QuizPanel } from "@/components/quiz-panel";

export const Route = createFileRoute("/quiz/$id")({
  component: QuizPage,
});

function QuizPage() {
  const { id } = Route.useParams();
  const mod = getModule(id);

  if (!mod) {
    return (
      <QuizShell>
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <h1 className="text-xl font-semibold">Module not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary">
            Back to modules
          </Link>
        </main>
      </QuizShell>
    );
  }

  return (
    <QuizShell activeId={mod.id}>
      <QuizPanel mod={mod} />
    </QuizShell>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  RotateCcw,
  X,
} from "lucide-react";
import type { MatchQuestion, ModuleDef, Question } from "@/data/types";
import { getNextModule, getPrevModule } from "@/data/modules";
import {
  arraysEqual,
  emptyState,
  letter,
  loadSaved,
  persist,
  type QState,
} from "@/lib/quiz-store";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizPanel({ mod }: { mod: ModuleDef }) {
  const navigate = useNavigate();
  const next = getNextModule(mod.id);
  const prev = getPrevModule(mod.id);

  const [states, setStates] = useState<QState[]>(() => emptyState(mod.questions));
  const [ready, setReady] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const [matchOptions, setMatchOptions] = useState<string[][]>(() =>
    mod.questions.map((q) => (q.type === "match" ? q.pairs.map((p) => p.right) : [])),
  );

  useEffect(() => {
    const saved = loadSaved();
    const existing = saved[mod.id];
    if (existing && existing.length === mod.questions.length) {
      setStates(existing);
    } else {
      setStates(emptyState(mod.questions));
    }
    setReady(true);
    setShowDone(false);
    setMatchOptions(
      mod.questions.map((q) =>
        q.type === "match" ? shuffle(q.pairs.map((p) => p.right)) : [],
      ),
    );
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [mod.id, mod.questions.length]);

  useEffect(() => {
    if (!ready) return;
    const all = loadSaved();
    all[mod.id] = states;
    persist(all);
  }, [states, mod.id, ready]);

  const answered = states.filter((s) => s.answered).length;
  const correct = states.filter((s) => s.correct).length;
  const complete = answered === mod.questions.length;

  useEffect(() => {
    if (complete && ready) setShowDone(true);
  }, [complete, ready]);

  function update(i: number, patch: Partial<QState>) {
    setStates((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function markSingle(i: number, opt: number) {
    const q = mod.questions[i];
    if (q.type !== "single" || states[i].answered) return;
    const ok = opt === q.correct;
    update(i, { answered: true, correct: ok, selected: opt });
  }

  function toggleMulti(i: number, opt: number) {
    const q = mod.questions[i];
    if (q.type !== "multi" || states[i].answered) return;
    const cur = Array.isArray(states[i].selected) ? [...states[i].selected] : [];
    const nextSel = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
    if (nextSel.length === q.correct.length) {
      update(i, {
        selected: nextSel,
        answered: true,
        correct: arraysEqual(nextSel, q.correct),
      });
    } else {
      update(i, { selected: nextSel });
    }
  }

  function setMatch(i: number, left: string, right: string) {
    const q = mod.questions[i];
    if (q.type !== "match" || states[i].answered) return;
    const map = { ...((states[i].selected as Record<string, string>) ?? {}), [left]: right };
    const allFilled = q.pairs.every((p) => map[p.left]);
    if (allFilled) {
      update(i, {
        selected: map,
        answered: true,
        correct: q.pairs.every((p) => map[p.left] === p.right),
      });
    } else {
      update(i, { selected: map });
    }
  }

  function resetModule() {
    setStates(emptyState(mod.questions));
    setShowDone(false);
  }

  const pct = Math.round((answered / mod.questions.length) * 100);
  const scorePct = answered ? Math.round((correct / answered) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            Module {mod.code}
          </p>
          <h1 className="mt-1 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
            {mod.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{mod.blurb} · 25 questions · mark instantly</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-sm text-muted">
          <span>
            Answered <strong className="text-fg">{answered}</strong>/25
          </span>
          <span>
            Correct <strong className="text-ok">{correct}</strong>
          </span>
          <span>
            Score <strong className="text-accent">{scorePct}%</strong>
          </span>
        </div>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {mod.questions.map((_, i) => {
          const s = states[i];
          return (
            <a
              key={i}
              href={`#q${i}`}
              className={cn(
                "flex size-8 items-center justify-center rounded-md font-mono text-xs no-underline",
                s.answered && s.correct && "bg-ok-bg text-ok",
                s.answered && !s.correct && "bg-bad-bg text-bad",
                !s.answered && "bg-surface text-muted hover:bg-surface-2",
              )}
            >
              {i + 1}
            </a>
          );
        })}
      </div>

      <div className="space-y-4">
        {mod.questions.map((q, i) => (
          <QuestionCard
            key={`${mod.id}-${i}`}
            index={i}
            q={q}
            state={states[i]}
            matchOpts={matchOptions[i]}
            onSingle={markSingle}
            onMulti={toggleMulti}
            onMatch={setMatch}
          />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-2/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          {prev ? (
            <Link
              to="/quiz/$id"
              params={{ id: prev.id }}
              className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-surface px-3 text-sm text-fg no-underline hover:bg-surface-2"
            >
              <ChevronLeft className="size-4" /> {prev.code}
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-surface px-3 text-sm text-fg no-underline hover:bg-surface-2"
            >
              <ChevronLeft className="size-4" /> Modules
            </Link>
          )}
          <button
            type="button"
            onClick={resetModule}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-surface px-3 text-sm text-muted hover:text-fg"
          >
            <RotateCcw className="size-4" /> Reset module
          </button>
          {next ? (
            <button
              type="button"
              onClick={() => navigate({ to: "/quiz/$id", params: { id: next.id } })}
              className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg"
            >
              Next: {next.code} <ChevronRight className="size-4" />
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg no-underline"
            >
              Finish & scores
            </Link>
          )}
        </div>
      </div>

      {showDone && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">Module {mod.code} complete</h2>
              <button
                type="button"
                onClick={() => setShowDone(false)}
                className="rounded-md p-1 text-muted hover:text-fg"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">
              {Math.round((correct / 25) * 100)}%
            </p>
            <p className="mt-1 text-sm text-muted">
              {correct} of 25 correct on {mod.title}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {next ? (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/quiz/$id", params: { id: next.id } })}
                  className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg bg-primary px-4 font-semibold text-primary-fg"
                >
                  Continue to {next.code} <ChevronRight className="size-4" />
                </button>
              ) : (
                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 font-semibold text-primary-fg no-underline"
                >
                  View all module scores
                </Link>
              )}
              <button
                type="button"
                onClick={() => setShowDone(false)}
                className="min-h-11 rounded-lg bg-surface-2 text-sm text-fg"
              >
                Review answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  index,
  q,
  state,
  matchOpts,
  onSingle,
  onMulti,
  onMatch,
}: {
  index: number;
  q: Question;
  state: QState;
  matchOpts: string[];
  onSingle: (i: number, opt: number) => void;
  onMulti: (i: number, opt: number) => void;
  onMatch: (i: number, left: string, right: string) => void;
}) {
  const selectedArr = Array.isArray(state.selected) ? state.selected : [];
  const selectedMap = (state.selected && !Array.isArray(state.selected) && typeof state.selected === "object"
    ? state.selected
    : {}) as Record<string, string>;

  return (
    <article
      id={`q${index}`}
      className={cn(
        "scroll-mt-24 rounded-xl border bg-surface p-4 md:p-5",
        state.answered && state.correct && "border-ok",
        state.answered && !state.correct && "border-bad",
        !state.answered && "border-border",
      )}
    >
      <p className="text-[15px] leading-relaxed">
        <span className="mr-2 font-mono font-semibold text-primary">{index + 1}.</span>
        {q.text}
      </p>
      {q.type === "multi" && (
        <p className="mt-1 text-xs text-muted">
          Select {q.correct.length} answers — marked automatically when that many are chosen.
        </p>
      )}
      {q.type === "match" && (
        <p className="mt-1 text-xs text-muted">Match every row. Marked when all are filled.</p>
      )}

      {q.type === "single" && (
        <div className="mt-3 space-y-2">
          {q.options.map((opt, j) => {
            const picked = state.selected === j;
            const showOk = state.answered && j === q.correct;
            const showBad = state.answered && picked && j !== q.correct;
            return (
              <button
                key={j}
                type="button"
                disabled={state.answered}
                onClick={() => onSingle(index, j)}
                className={cn(
                  "flex w-full min-h-11 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm",
                  showOk && "border-ok bg-ok-bg",
                  showBad && "border-bad bg-bad-bg",
                  picked && !state.answered && "border-primary bg-bg-2",
                  !picked && !state.answered && "border-border bg-bg hover:border-primary",
                )}
              >
                <span className="mt-0.5 font-mono text-xs text-accent">{letter(j)}.</span>
                <span className="flex-1">{opt}</span>
                {showOk && <Check className="mt-0.5 size-4 shrink-0 text-ok" />}
                {showBad && <X className="mt-0.5 size-4 shrink-0 text-bad" />}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "multi" && (
        <div className="mt-3 space-y-2">
          {q.options.map((opt, j) => {
            const picked = selectedArr.includes(j);
            const showOk = state.answered && q.correct.includes(j);
            const showBad = state.answered && picked && !q.correct.includes(j);
            return (
              <button
                key={j}
                type="button"
                disabled={state.answered}
                onClick={() => onMulti(index, j)}
                className={cn(
                  "flex w-full min-h-11 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm",
                  showOk && "border-ok bg-ok-bg",
                  showBad && "border-bad bg-bad-bg",
                  picked && !state.answered && "border-primary bg-bg-2",
                  !picked && !state.answered && "border-border bg-bg hover:border-primary",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border",
                    picked ? "border-primary bg-primary" : "border-muted",
                  )}
                >
                  {picked && <Check className="size-3 text-primary-fg" />}
                </span>
                <span className="font-mono text-xs text-accent">{letter(j)}.</span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {q.type === "match" && (
        <MatchBlock
          q={q}
          state={state}
          options={matchOpts}
          selectedMap={selectedMap}
          onChange={(left, right) => onMatch(index, left, right)}
        />
      )}

      {state.answered && (
        <p
          className={cn(
            "mt-3 flex items-start gap-2 text-sm font-medium",
            state.correct ? "text-ok" : "text-bad",
          )}
        >
          {state.correct ? (
            <>
              <Check className="mt-0.5 size-4" /> Correct
            </>
          ) : (
            <>
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>
                Incorrect.
                {q.type === "single" && ` Correct: ${letter(q.correct)}. ${q.options[q.correct]}`}
                {q.type === "multi" &&
                  ` Correct: ${q.correct.map((c) => letter(c)).join(", ")}`}
                {q.type === "match" && " Review the highlighted pairings."}
              </span>
            </>
          )}
        </p>
      )}
    </article>
  );
}

function MatchBlock({
  q,
  state,
  options,
  selectedMap,
  onChange,
}: {
  q: MatchQuestion;
  state: QState;
  options: string[];
  selectedMap: Record<string, string>;
  onChange: (left: string, right: string) => void;
}) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="text-left text-muted">
            <th className="pb-2 font-medium">Item</th>
            <th className="pb-2 font-medium">Match</th>
          </tr>
        </thead>
        <tbody>
          {q.pairs.map((p) => {
            const val = selectedMap[p.left] ?? "";
            const ok = state.answered && val === p.right;
            const bad = state.answered && val !== p.right;
            return (
              <tr key={p.left} className="border-t border-border">
                <td className="py-2 pr-3 align-middle font-medium">{p.left}</td>
                <td className="py-2">
                  <select
                    disabled={state.answered}
                    value={val}
                    onChange={(e) => onChange(p.left, e.target.value)}
                    className={cn(
                      "min-h-11 w-full rounded-lg border bg-bg px-2 text-sm text-fg",
                      ok && "border-ok",
                      bad && "border-bad",
                      !state.answered && "border-border",
                    )}
                  >
                    <option value="">— Select —</option>
                    {options.map((o, idx) => (
                      <option key={`${o}-${idx}`} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {bad && <p className="mt-1 text-xs text-ok">Correct: {p.right}</p>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

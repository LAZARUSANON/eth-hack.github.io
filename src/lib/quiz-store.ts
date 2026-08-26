import type { Question } from "@/data/types";

export type QState = {
  answered: boolean;
  correct: boolean;
  selected: number | number[] | Record<string, string> | null;
};

const KEY = "eh-index4-quiz-v1";

export type Saved = Record<string, QState[]>;

export function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Saved;
  } catch {
    return {};
  }
}

export function persist(all: Saved) {
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function emptyState(questions: Question[]): QState[] {
  return questions.map((q) => ({
    answered: false,
    correct: false,
    selected: q.type === "multi" ? [] : q.type === "match" ? {} : null,
  }));
}

export function arraysEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]);
}

export function letter(i: number) {
  return String.fromCharCode(65 + i);
}

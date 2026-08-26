export type SingleQuestion = {
  type: "single";
  text: string;
  options: string[];
  correct: number;
};

export type MultiQuestion = {
  type: "multi";
  text: string;
  options: string[];
  correct: number[];
};

export type MatchQuestion = {
  type: "match";
  text: string;
  pairs: { left: string; right: string }[];
};

export type Question = SingleQuestion | MultiQuestion | MatchQuestion;

export type ModuleDef = {
  id: string;
  code: string;
  title: string;
  blurb: string;
  questions: Question[];
};

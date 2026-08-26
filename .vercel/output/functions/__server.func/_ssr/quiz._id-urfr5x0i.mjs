import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CircleAlert, c as Check, i as RotateCcw, o as ChevronRight, s as ChevronLeft, t as X } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-CwSX3vBs.mjs";
import { a as emptyState, c as getPrevModule, d as persist, i as cn, l as letter, n as QuizShell, o as getModule, r as arraysEqual, s as getNextModule, u as loadSaved } from "./quiz-shell-B2P1dq6U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._id-urfr5x0i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function QuizPanel({ mod }) {
	const navigate = useNavigate();
	const next = getNextModule(mod.id);
	const prev = getPrevModule(mod.id);
	const [states, setStates] = (0, import_react.useState)(() => emptyState(mod.questions));
	const [ready, setReady] = (0, import_react.useState)(false);
	const [showDone, setShowDone] = (0, import_react.useState)(false);
	const matchOptions = (0, import_react.useMemo)(() => {
		return mod.questions.map((q) => q.type === "match" ? shuffle(q.pairs.map((p) => p.right)) : []);
	}, [mod.id]);
	(0, import_react.useEffect)(() => {
		const existing = loadSaved()[mod.id];
		if (existing && existing.length === mod.questions.length) setStates(existing);
		else setStates(emptyState(mod.questions));
		setReady(true);
		setShowDone(false);
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [mod.id, mod.questions.length]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const all = loadSaved();
		all[mod.id] = states;
		persist(all);
	}, [
		states,
		mod.id,
		ready
	]);
	const answered = states.filter((s) => s.answered).length;
	const correct = states.filter((s) => s.correct).length;
	const complete = answered === mod.questions.length;
	(0, import_react.useEffect)(() => {
		if (complete && ready) setShowDone(true);
	}, [complete, ready]);
	function update(i, patch) {
		setStates((prev) => prev.map((s, idx) => idx === i ? {
			...s,
			...patch
		} : s));
	}
	function markSingle(i, opt) {
		const q = mod.questions[i];
		if (q.type !== "single" || states[i].answered) return;
		update(i, {
			answered: true,
			correct: opt === q.correct,
			selected: opt
		});
	}
	function toggleMulti(i, opt) {
		const q = mod.questions[i];
		if (q.type !== "multi" || states[i].answered) return;
		const cur = Array.isArray(states[i].selected) ? [...states[i].selected] : [];
		const nextSel = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
		if (nextSel.length === q.correct.length) update(i, {
			selected: nextSel,
			answered: true,
			correct: arraysEqual(nextSel, q.correct)
		});
		else update(i, { selected: nextSel });
	}
	function setMatch(i, left, right) {
		const q = mod.questions[i];
		if (q.type !== "match" || states[i].answered) return;
		const map = {
			...states[i].selected ?? {},
			[left]: right
		};
		if (q.pairs.every((p) => map[p.left])) update(i, {
			selected: map,
			answered: true,
			correct: q.pairs.every((p) => map[p.left] === p.right)
		});
		else update(i, { selected: map });
	}
	function resetModule() {
		setStates(emptyState(mod.questions));
		setShowDone(false);
	}
	const pct = Math.round(answered / mod.questions.length * 100);
	const scorePct = answered ? Math.round(correct / answered * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-6 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-widest text-primary uppercase",
						children: ["Module ", mod.code]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl",
						children: mod.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [mod.blurb, " · 25 questions · mark instantly"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 font-mono text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Answered ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: answered
							}),
							"/25"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Correct ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-ok",
							children: correct
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Score ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "text-accent",
							children: [scorePct, "%"]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 h-2 overflow-hidden rounded-full bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary transition-all duration-300",
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex flex-wrap gap-1.5",
				children: mod.questions.map((_, i) => {
					const s = states[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#q${i}`,
						className: cn("flex size-8 items-center justify-center rounded-md font-mono text-xs no-underline", s.answered && s.correct && "bg-ok-bg text-ok", s.answered && !s.correct && "bg-bad-bg text-bad", !s.answered && "bg-surface text-muted hover:bg-surface-2"),
						children: i + 1
					}, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: mod.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionCard, {
					index: i,
					q,
					state: states[i],
					matchOpts: matchOptions[i],
					onSingle: markSingle,
					onMulti: toggleMulti,
					onMatch: setMatch
				}, `${mod.id}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-2/95 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3",
					children: [
						prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quiz/$id",
							params: { id: prev.id },
							className: "inline-flex min-h-11 items-center gap-1 rounded-lg bg-surface px-3 text-sm text-fg no-underline hover:bg-surface-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }),
								" ",
								prev.code
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex min-h-11 items-center gap-1 rounded-lg bg-surface px-3 text-sm text-fg no-underline hover:bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Modules"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: resetModule,
							className: "inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-surface px-3 text-sm text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset module"]
						}),
						next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/quiz/$id",
								params: { id: next.id }
							}),
							className: "inline-flex min-h-11 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg",
							children: [
								"Next: ",
								next.code,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg no-underline",
							children: "Finish & scores"
						})
					]
				})
			}),
			showDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xl font-semibold",
								children: [
									"Module ",
									mod.code,
									" complete"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowDone(false),
								className: "rounded-md p-1 text-muted hover:text-fg",
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-3xl font-bold text-primary",
							children: [Math.round(correct / 25 * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								correct,
								" of 25 correct on ",
								mod.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-2",
							children: [next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => navigate({
									to: "/quiz/$id",
									params: { id: next.id }
								}),
								className: "inline-flex min-h-11 items-center justify-center gap-1 rounded-lg bg-primary px-4 font-semibold text-primary-fg",
								children: [
									"Continue to ",
									next.code,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 font-semibold text-primary-fg no-underline",
								children: "View all module scores"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowDone(false),
								className: "min-h-11 rounded-lg bg-surface-2 text-sm text-fg",
								children: "Review answers"
							})]
						})
					]
				})
			})
		]
	});
}
function QuestionCard({ index, q, state, matchOpts, onSingle, onMulti, onMatch }) {
	const selectedArr = Array.isArray(state.selected) ? state.selected : [];
	const selectedMap = state.selected && !Array.isArray(state.selected) && typeof state.selected === "object" ? state.selected : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: `q${index}`,
		className: cn("scroll-mt-24 rounded-xl border bg-surface p-4 md:p-5", state.answered && state.correct && "border-ok", state.answered && !state.correct && "border-bad", !state.answered && "border-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[15px] leading-relaxed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mr-2 font-mono font-semibold text-primary",
					children: [index + 1, "."]
				}), q.text]
			}),
			q.type === "multi" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					"Select ",
					q.correct.length,
					" answers — marked automatically when that many are chosen."
				]
			}),
			q.type === "match" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Match every row. Marked when all are filled."
			}),
			q.type === "single" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: q.options.map((opt, j) => {
					const picked = state.selected === j;
					const showOk = state.answered && j === q.correct;
					const showBad = state.answered && picked && j !== q.correct;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: state.answered,
						onClick: () => onSingle(index, j),
						className: cn("flex w-full min-h-11 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm", showOk && "border-ok bg-ok-bg", showBad && "border-bad bg-bad-bg", picked && !state.answered && "border-primary bg-bg-2", !picked && !state.answered && "border-border bg-bg hover:border-primary"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 font-mono text-xs text-accent",
								children: [letter(j), "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: opt
							}),
							showOk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }),
							showBad && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 size-4 shrink-0 text-bad" })
						]
					}, j);
				})
			}),
			q.type === "multi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: q.options.map((opt, j) => {
					const picked = selectedArr.includes(j);
					const showOk = state.answered && q.correct.includes(j);
					const showBad = state.answered && picked && !q.correct.includes(j);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: state.answered,
						onClick: () => onMulti(index, j),
						className: cn("flex w-full min-h-11 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm", showOk && "border-ok bg-ok-bg", showBad && "border-bad bg-bad-bg", picked && !state.answered && "border-primary bg-bg-2", !picked && !state.answered && "border-border bg-bg hover:border-primary"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border", picked ? "border-primary bg-primary" : "border-muted"),
								children: picked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-primary-fg" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-accent",
								children: [letter(j), "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: opt
							})
						]
					}, j);
				})
			}),
			q.type === "match" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBlock, {
				q,
				state,
				options: matchOpts,
				selectedMap,
				onChange: (left, right) => onMatch(index, left, right)
			}),
			state.answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 flex items-start gap-2 text-sm font-medium", state.correct ? "text-ok" : "text-bad"),
				children: state.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4" }), " Correct"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Incorrect.",
					q.type === "single" && ` Correct: ${letter(q.correct)}. ${q.options[q.correct]}`,
					q.type === "multi" && ` Correct: ${q.correct.map((c) => letter(c)).join(", ")}`,
					q.type === "match" && " Review the highlighted pairings."
				] })] })
			})
		]
	});
}
function MatchBlock({ q, state, options, selectedMap, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[520px] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-left text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 font-medium",
					children: "Item"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "pb-2 font-medium",
					children: "Match"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.pairs.map((p) => {
				const val = selectedMap[p.left] ?? "";
				const ok = state.answered && val === p.right;
				const bad = state.answered && val !== p.right;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-3 align-middle font-medium",
						children: p.left
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							disabled: state.answered,
							value: val,
							onChange: (e) => onChange(p.left, e.target.value),
							className: cn("min-h-11 w-full rounded-lg border bg-bg px-2 text-sm text-fg", ok && "border-ok", bad && "border-bad", !state.answered && "border-border"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— Select —"
							}), options.map((o, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o,
								children: o
							}, `${o}-${idx}`))]
						}), bad && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-ok",
							children: ["Correct: ", p.right]
						})]
					})]
				}, p.left);
			}) })]
		})
	});
}
function QuizPage() {
	const { id } = Route.useParams();
	const mod = getModule(id);
	if (!mod) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "Module not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block text-primary",
			children: "Back to modules"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizShell, {
		activeId: mod.id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPanel, { mod })
	});
}
//#endregion
export { QuizPage as component };

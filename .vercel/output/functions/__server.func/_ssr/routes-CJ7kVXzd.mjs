import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowRight, r as Shield } from "../_libs/lucide-react.mjs";
import { n as QuizShell, t as MODULES, u as loadSaved } from "./quiz-shell-B2P1dq6U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJ7kVXzd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [progress, setProgress] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const saved = loadSaved();
		const next = {};
		for (const m of MODULES) {
			const s = saved[m.id] ?? [];
			next[m.id] = {
				a: s.filter((x) => x.answered).length,
				c: s.filter((x) => x.correct).length
			};
		}
		setProgress(next);
	}, []);
	const totalA = Object.values(progress).reduce((n, v) => n + v.a, 0);
	const totalC = Object.values(progress).reduce((n, v) => n + v.c, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.2em] text-primary uppercase",
				children: "index4.html · 9 modules · 225 questions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl",
				children: "Ethical Hacker quizzes from 2.4.3 through 10.3.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Select an answer and it is marked instantly. Finish a module to continue to the next page. Progress is saved in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-4 font-mono text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-lg border border-border bg-surface px-3 py-2",
					children: [
						"Answered ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-fg",
							children: totalA
						}),
						" / 225"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-lg border border-border bg-surface px-3 py-2",
					children: ["Correct ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-ok",
						children: totalC
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: MODULES.map((m, i) => {
					const p = progress[m.id] ?? {
						a: 0,
						c: 0
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz/$id",
						params: { id: m.id },
						className: "group flex flex-col rounded-xl border border-border bg-surface p-4 no-underline transition hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-primary",
									children: m.code
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [
										p.a,
										"/25 · ",
										p.c,
										" correct"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-base font-semibold leading-snug text-fg",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 flex-1 text-sm text-muted",
								children: m.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent",
								children: [
									i === 0 ? "Start" : "Open",
									" module",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition group-hover:translate-x-0.5" })
								]
							})
						]
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 flex items-center gap-2 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), " Instant marking · 25 questions per module"]
			})
		]
	}) });
}
//#endregion
export { Home as component };

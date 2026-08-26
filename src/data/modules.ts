import type { ModuleDef } from "./types";
import { questions as q243 } from "./m243";
import { questions as q353 } from "./m353";
import { questions as q463 } from "./m463";
import { questions as q533 } from "./m533";
import { questions as q6133 } from "./m6133";
import { questions as q733 } from "./m733";
import { questions as q833 } from "./m833";
import { questions as q953 } from "./m953";
import { questions as q1033 } from "./m1033";

export const MODULES: ModuleDef[] = [
  {
    id: "2-4-3",
    code: "2.4.3",
    title: "Planning and Scoping a Penetration Testing Assessment",
    blurb: "Regulations, contracts, ROE, and engagement documents.",
    questions: q243,
  },
  {
    id: "3-5-3",
    code: "3.5.3",
    title: "Information Gathering and Vulnerability Scanning",
    blurb: "Passive vs active recon, Nmap, OSINT, and scan planning.",
    questions: q353,
  },
  {
    id: "4-6-3",
    code: "4.6.3",
    title: "Social Engineering Attacks",
    blurb: "Phishing, influence, physical attacks, SET, and BeEF.",
    questions: q463,
  },
  {
    id: "5-3-3",
    code: "5.3.3",
    title: "Exploiting Wired and Wireless Networks",
    blurb: "NetBIOS, DNS, Kerberos, wireless, and network attacks.",
    questions: q533,
  },
  {
    id: "6-13-3",
    code: "6.13.3",
    title: "Exploiting Application-Based Vulnerabilities",
    blurb: "HTTP, sessions, SQL injection, XSS, and file inclusion.",
    questions: q6133,
  },
  {
    id: "7-3-3",
    code: "7.3.3",
    title: "Cloud, Mobile, and IoT Security",
    blurb: "Cloud attacks, containers, mobile apps, BLE, and IoT.",
    questions: q733,
  },
  {
    id: "8-3-3",
    code: "8.3.3",
    title: "Performing Post-Exploitation Techniques",
    blurb: "Shells, C2, living-off-the-land, persistence, and cleanup.",
    questions: q833,
  },
  {
    id: "9-5-3",
    code: "9.5.3",
    title: "Reporting and Communication",
    blurb: "CVSS, CVE, control categories, and report quality.",
    questions: q953,
  },
  {
    id: "10-3-3",
    code: "10.3.3",
    title: "Tools and Code Analysis",
    blurb: "Logic constructs, recon tools, distros, and scanners.",
    questions: q1033,
  },
];

export function getModule(id: string) {
  return MODULES.find((m) => m.id === id);
}

export function getNextModule(id: string) {
  const i = MODULES.findIndex((m) => m.id === id);
  if (i < 0 || i >= MODULES.length - 1) return null;
  return MODULES[i + 1];
}

export function getPrevModule(id: string) {
  const i = MODULES.findIndex((m) => m.id === id);
  if (i <= 0) return null;
  return MODULES[i - 1];
}

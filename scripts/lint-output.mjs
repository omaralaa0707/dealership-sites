import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const FORBIDDEN_PATTERNS = [
  { name: "em dash", pattern: /—/ },
  { name: "Arabic script", pattern: /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/ },
  { name: "Claude/Anthropic mention", pattern: /claude|anthropic/i },
  {
    name: "disclaimer language",
    pattern: /concept design|not affiliated|unofficial site/i,
  },
];

export function lintHtml(html, label) {
  const problems = [];
  for (const { name, pattern } of FORBIDDEN_PATTERNS) {
    if (pattern.test(html)) {
      problems.push(`${label}: contains ${name}`);
    }
  }
  return problems;
}

export async function lintSite(sitesDir) {
  const entries = await readdir(sitesDir, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const problems = [];

  for (const slug of slugs) {
    const htmlPath = path.join(sitesDir, slug, "index.html");
    const html = await readFile(htmlPath, "utf8");
    problems.push(...lintHtml(html, slug));

    const srcAttrs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    const urlRefs = [...html.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
    for (const src of [...srcAttrs, ...urlRefs]) {
      if (/^https?:\/\//.test(src)) continue;
      const imgPath = path.join(sitesDir, slug, src);
      try {
        await access(imgPath);
      } catch {
        problems.push(`${slug}: missing image file ${src}`);
      }
    }
  }

  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const sitesDir = path.resolve(process.argv[2] || "sites");
  lintSite(sitesDir)
    .then((problems) => {
      if (problems.length === 0) {
        console.log("No problems found.");
        return;
      }
      problems.forEach((p) => console.error(p));
      process.exitCode = 1;
    })
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;
    });
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { lintHtml, lintSite } from "../scripts/lint-output.mjs";

test("lintHtml flags an em dash", () => {
  const problems = lintHtml("<p>cars — trucks</p>", "test-slug");
  assert.ok(problems.some((p) => p.includes("em dash")));
});

test("lintHtml flags Arabic script", () => {
  const problems = lintHtml("<p>مرحبا</p>", "test-slug");
  assert.ok(problems.some((p) => p.includes("Arabic")));
});

test("lintHtml flags a Claude/Anthropic mention", () => {
  const problems = lintHtml("<p>Built with Claude</p>", "test-slug");
  assert.ok(problems.some((p) => p.includes("Claude")));
});

test("lintHtml flags disclaimer language", () => {
  const problems = lintHtml("<p>This is a concept design</p>", "test-slug");
  assert.ok(problems.some((p) => p.includes("disclaimer")));
});

test("lintHtml returns no problems for clean copy", () => {
  const problems = lintHtml("<p>One of One Automotive, Heliopolis, Cairo.</p>", "test-slug");
  assert.deepEqual(problems, []);
});

test("lintSite reports a missing referenced image file", async () => {
  const sitesDir = path.join(process.cwd(), "tests", "tmp-lint-sites");
  await rm(sitesDir, { recursive: true, force: true });
  await mkdir(path.join(sitesDir, "broken-dealer"), { recursive: true });
  await writeFile(
    path.join(sitesDir, "broken-dealer", "index.html"),
    '<img src="media/does-not-exist.jpg">',
    "utf8"
  );

  const problems = await lintSite(sitesDir);
  assert.ok(problems.some((p) => p.includes("missing image")));

  await rm(sitesDir, { recursive: true, force: true });
});

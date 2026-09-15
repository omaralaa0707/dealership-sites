import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  buildDealerView,
  checkPaletteContrast,
  buildSite,
} from "../scripts/build.mjs";
import { DealerValidationError } from "../lib/validate-dealer.mjs";

const FIXTURE_DEALER = {
  slug: "one-of-one",
  dealerName: "One of One Automotive",
  tagline: "Cairo's finest",
  logo: null,
  palette: { background: "#08080a", ink: "#edeae4", accent: "#c08a4e" },
  heroImage: "media/car-02.webp",
  aboutText: "Hand-picked cars.",
  gallery: [{ image: "media/car-11.webp", caption: "Mercedes-Benz" }],
  phone: "010 0055 8557",
  address: null,
  instagram: null,
  facebook: null,
  maps: null,
};

test("buildDealerView adds boolean gate flags derived from nullable fields", () => {
  const view = buildDealerView(FIXTURE_DEALER);
  assert.equal(view.hasLogo, false);
  assert.equal(view.hasPhone, true);
  assert.equal(view.hasAddress, false);
  assert.equal(view.hasInstagram, false);
  assert.equal(view.hasFacebook, false);
  assert.equal(view.hasMaps, false);
});

test("buildDealerView computes accentText from the palette accent", () => {
  const view = buildDealerView(FIXTURE_DEALER);
  assert.ok(view.accentText === "#000000" || view.accentText === "#ffffff");
});

test("checkPaletteContrast passes for a dealer with AA-passing ink/background", () => {
  assert.doesNotThrow(() => checkPaletteContrast(FIXTURE_DEALER));
});

test("checkPaletteContrast throws for a dealer with failing ink/background contrast", () => {
  const badDealer = {
    ...FIXTURE_DEALER,
    palette: { background: "#888888", ink: "#8a8a8a", accent: "#c08a4e" },
  };
  assert.throws(() => checkPaletteContrast(badDealer), DealerValidationError);
});

test("buildSite renders both fixture dealers to sites/<slug>/index.html and copies media", async () => {
  const outDir = path.join(process.cwd(), "tests", "tmp-sites");
  await rm(outDir, { recursive: true, force: true });

  const slugs = await buildSite({
    dataPath: path.join(process.cwd(), "data", "dealers.sample.json"),
    templatePath: path.join(process.cwd(), "template.html"),
    outDir,
    mediaSourceRoot: path.join(process.cwd(), "tests", "fixtures", "media"),
  });

  assert.deepEqual(slugs, ["one-of-one", "el-basma-motors"]);

  const html = await readFile(path.join(outDir, "one-of-one", "index.html"), "utf8");
  assert.match(html, /One of One Automotive/);
  assert.match(html, /Mercedes-Benz/);

  assert.ok(existsSync(path.join(outDir, "one-of-one", "media", "car-02.webp")));
  assert.ok(existsSync(path.join(outDir, "el-basma-motors", "media", "fortuner-1.jpg")));

  await rm(outDir, { recursive: true, force: true });
});

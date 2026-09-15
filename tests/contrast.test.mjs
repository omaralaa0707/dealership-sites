import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contrastRatio,
  meetsAA,
  pickReadableText,
} from "../lib/contrast.mjs";

test("black on white has a contrast ratio of 21", () => {
  const ratio = contrastRatio("#000000", "#ffffff");
  assert.ok(Math.abs(ratio - 21) < 0.01, `expected ~21, got ${ratio}`);
});

test("meetsAA passes for black on white normal text", () => {
  assert.equal(meetsAA("#000000", "#ffffff"), true);
});

test("meetsAA fails for a low-contrast pair", () => {
  assert.equal(meetsAA("#93A5B4", "#C97A32"), false);
});

test("meetsAA passes for near-white ink on near-black background", () => {
  assert.equal(meetsAA("#edeae4", "#08080a"), true);
});

test("pickReadableText chooses black for a light fill", () => {
  assert.equal(pickReadableText("#f5f5f5"), "#000000");
});

test("pickReadableText chooses white for a dark fill", () => {
  assert.equal(pickReadableText("#101014"), "#ffffff");
});

test("pickReadableText picks whichever of black or white contrasts more on a mid-tone amber fill", () => {
  const result = pickReadableText("#C97A32");
  assert.ok(result === "#000000" || result === "#ffffff");
  const blackRatio = contrastRatio("#000000", "#C97A32");
  const whiteRatio = contrastRatio("#ffffff", "#C97A32");
  const expected = blackRatio >= whiteRatio ? "#000000" : "#ffffff";
  assert.equal(result, expected);
});

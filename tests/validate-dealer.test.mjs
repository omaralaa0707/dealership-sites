import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateDealer,
  DealerValidationError,
} from "../lib/validate-dealer.mjs";

function baseDealer(overrides = {}) {
  return {
    slug: "one-of-one",
    dealerName: "One of One Automotive",
    tagline: "Cairo's finest selection of luxury & sports cars",
    logo: null,
    palette: { background: "#08080a", ink: "#edeae4", accent: "#c08a4e" },
    heroImage: "media/car-02.webp",
    heroText: "A Heliopolis showroom built around a small number of cars.",
    aboutParagraphs: [
      "We hand-pick every car that enters the showroom.",
      "Every car is chosen for condition and specification.",
      "Immediate delivery and flexible finance are available.",
    ],
    gallery: [{ image: "media/car-11.webp" }],
    phone: "010 0055 8557",
    address: "151 El Sayed El Merghany, Almazah, Heliopolis, Cairo",
    instagram: "https://www.instagram.com/oneofone.automotive/",
    facebook: "https://www.facebook.com/oneofonecars/",
    maps: "https://www.google.com/maps/search/?api=1&query=One+of+One",
    ...overrides,
  };
}

test("a fully valid dealer passes", () => {
  assert.equal(validateDealer(baseDealer()), true);
});

test("a missing required field throws DealerValidationError", () => {
  const dealer = baseDealer({ dealerName: "" });
  assert.throws(() => validateDealer(dealer), DealerValidationError);
});

test("a non-kebab-case slug throws", () => {
  const dealer = baseDealer({ slug: "One Of One" });
  assert.throws(() => validateDealer(dealer), /kebab-case/);
});

test("a missing palette field throws", () => {
  const dealer = baseDealer({
    palette: { background: "#08080a", ink: "#edeae4" },
  });
  assert.throws(() => validateDealer(dealer), /palette.accent/);
});

test("a malformed hex color throws", () => {
  const dealer = baseDealer({
    palette: { background: "void", ink: "#edeae4", accent: "#c08a4e" },
  });
  assert.throws(() => validateDealer(dealer), /palette.background/);
});

test("an empty gallery is allowed", () => {
  const dealer = baseDealer({ gallery: [] });
  assert.equal(validateDealer(dealer), true);
});

test("a non-array gallery throws", () => {
  const dealer = baseDealer({ gallery: "not-an-array" });
  assert.throws(() => validateDealer(dealer), /gallery/);
});

test("heroImage may be null", () => {
  const dealer = baseDealer({ heroImage: null });
  assert.equal(validateDealer(dealer), true);
});

test("a non-string, non-null heroImage throws", () => {
  const dealer = baseDealer({ heroImage: 12345 });
  assert.throws(() => validateDealer(dealer), /heroImage/);
});

test("a missing heroImage key throws", () => {
  const dealer = baseDealer();
  delete dealer.heroImage;
  assert.throws(() => validateDealer(dealer), /heroImage/);
});

test("a dealer with heroImage: null and gallery: [] validates successfully", () => {
  const dealer = baseDealer({ heroImage: null, gallery: [] });
  assert.equal(validateDealer(dealer), true);
});

test("a gallery item missing an image throws", () => {
  const dealer = baseDealer({ gallery: [{}] });
  assert.throws(() => validateDealer(dealer), /gallery\[0\].image/);
});

test("a gallery item needs no caption field", () => {
  const dealer = baseDealer({ gallery: [{ image: "media/car-11.webp" }] });
  assert.equal(validateDealer(dealer), true);
});

test("aboutParagraphs must have exactly 3 entries", () => {
  const dealer = baseDealer({ aboutParagraphs: ["Only one paragraph."] });
  assert.throws(() => validateDealer(dealer), /aboutParagraphs/);
});

test("an empty string in aboutParagraphs throws", () => {
  const dealer = baseDealer({
    aboutParagraphs: ["Real paragraph one.", "  ", "Real paragraph three."],
  });
  assert.throws(() => validateDealer(dealer), /aboutParagraphs\[1\]/);
});

test("a missing heroText throws", () => {
  const dealer = baseDealer({ heroText: "" });
  assert.throws(() => validateDealer(dealer), /heroText/);
});

test("phone may be null", () => {
  const dealer = baseDealer({ phone: null });
  assert.equal(validateDealer(dealer), true);
});

test("a non-string, non-null optional field throws", () => {
  const dealer = baseDealer({ phone: 12345 });
  assert.throws(() => validateDealer(dealer), /phone/);
});

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
    aboutText: "We hand-pick every car that enters the showroom.",
    gallery: [{ image: "media/car-11.webp", caption: "Mercedes-Benz" }],
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

test("an empty gallery throws", () => {
  const dealer = baseDealer({ gallery: [] });
  assert.throws(() => validateDealer(dealer), /gallery/);
});

test("a gallery item missing an image throws", () => {
  const dealer = baseDealer({ gallery: [{ caption: "Mercedes-Benz" }] });
  assert.throws(() => validateDealer(dealer), /gallery\[0\].image/);
});

test("phone may be null", () => {
  const dealer = baseDealer({ phone: null });
  assert.equal(validateDealer(dealer), true);
});

test("a non-string, non-null optional field throws", () => {
  const dealer = baseDealer({ phone: 12345 });
  assert.throws(() => validateDealer(dealer), /phone/);
});

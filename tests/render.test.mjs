import { test } from "node:test";
import assert from "node:assert/strict";
import { renderTemplate } from "../scripts/render.mjs";

test("substitutes a scalar field", () => {
  const out = renderTemplate("<h1>{{name}}</h1>", { name: "One of One" });
  assert.equal(out, "<h1>One of One</h1>");
});

test("HTML-escapes scalar values", () => {
  const out = renderTemplate("<p>{{name}}</p>", { name: "Tom & Jerry's <Cars>" });
  assert.equal(out, "<p>Tom &amp; Jerry&#39;s &lt;Cars&gt;</p>");
});

test("resolves dotted paths", () => {
  const out = renderTemplate("<div style=\"color:{{palette.accent}}\">", {
    palette: { accent: "#c08a4e" },
  });
  assert.equal(out, '<div style="color:#c08a4e">');
});

test("renders a missing field as an empty string", () => {
  const out = renderTemplate("[{{missing}}]", {});
  assert.equal(out, "[]");
});

test("renders an array section once per item", () => {
  const out = renderTemplate(
    "{{#gallery}}<img src=\"{{image}}\" alt=\"{{caption}}\">{{/gallery}}",
    {
      gallery: [
        { image: "a.jpg", caption: "Mercedes-Benz" },
        { image: "b.jpg", caption: "Porsche" },
      ],
    }
  );
  assert.equal(
    out,
    '<img src="a.jpg" alt="Mercedes-Benz"><img src="b.jpg" alt="Porsche">'
  );
});

test("renders a boolean-gated section with access to the outer context", () => {
  const out = renderTemplate(
    '{{#hasLogo}}<img src="{{logo}}" alt="{{dealerName}} logo">{{/hasLogo}}',
    { hasLogo: true, logo: "media/logo-mark.svg", dealerName: "GBR Auto" }
  );
  assert.equal(out, '<img src="media/logo-mark.svg" alt="GBR Auto logo">');
});

test("omits a boolean-gated section entirely when false", () => {
  const out = renderTemplate(
    '{{#hasLogo}}<img src="{{logo}}">{{/hasLogo}}',
    { hasLogo: false, logo: null }
  );
  assert.equal(out, "");
});

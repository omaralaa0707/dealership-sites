import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateDealer, DealerValidationError } from "../lib/validate-dealer.mjs";
import { meetsAA, pickReadableText } from "../lib/contrast.mjs";
import { renderTemplate } from "./render.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export function checkPaletteContrast(dealer) {
  const { background, ink } = dealer.palette;
  if (!meetsAA(ink, background)) {
    throw new DealerValidationError(
      dealer.slug,
      "palette.ink on palette.background fails WCAG AA"
    );
  }

  const accentText = pickReadableText(dealer.palette.accent);
  if (!meetsAA(accentText, dealer.palette.accent, true)) {
    throw new DealerValidationError(
      dealer.slug,
      "accent color has no readable text option (neither black nor white passes AA against it)"
    );
  }
}

export function buildDealerView(dealer) {
  const heroStyle = dealer.heroImage
    ? `background-image: linear-gradient(180deg, rgba(0,0,0,0.30), rgba(0,0,0,0.68)), url('${dealer.heroImage}');`
    : "";

  return {
    ...dealer,
    hasLogo: dealer.logo !== null && dealer.logo !== undefined,
    hasPhone: dealer.phone !== null && dealer.phone !== undefined,
    hasAddress: dealer.address !== null && dealer.address !== undefined,
    hasInstagram: dealer.instagram !== null && dealer.instagram !== undefined,
    hasFacebook: dealer.facebook !== null && dealer.facebook !== undefined,
    hasMaps: dealer.maps !== null && dealer.maps !== undefined,
    hasGallery: Array.isArray(dealer.gallery) && dealer.gallery.length > 0,
    heroStyle,
    accentText: pickReadableText(dealer.palette.accent),
    currentYear: new Date().getFullYear(),
  };
}

export async function buildSite({ dataPath, templatePath, outDir, mediaSourceRoot }) {
  const dealers = JSON.parse(await readFile(dataPath, "utf8"));
  const template = await readFile(templatePath, "utf8");

  for (const dealer of dealers) {
    validateDealer(dealer);
    checkPaletteContrast(dealer);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const dealer of dealers) {
    const view = buildDealerView(dealer);
    const html = renderTemplate(template, view);
    const dealerDir = path.join(outDir, dealer.slug);
    await mkdir(dealerDir, { recursive: true });
    await writeFile(path.join(dealerDir, "index.html"), html, "utf8");

    const srcMedia = path.join(mediaSourceRoot, dealer.slug);
    if (existsSync(srcMedia)) {
      await cp(srcMedia, path.join(dealerDir, "media"), { recursive: true });
    }
  }

  return dealers.map((dealer) => dealer.slug);
}

if (import.meta.url === (process.argv[1] && pathToFileURL(process.argv[1]).href)) {
  buildSite({
    dataPath: path.join(ROOT, "data", "dealers.json"),
    templatePath: path.join(ROOT, "template.html"),
    outDir: path.join(ROOT, "dist", "sites"),
    mediaSourceRoot: path.join(ROOT, "media"),
  })
    .then(async (slugs) => {
      for (const file of ["index.html", "styles.css", "script.js"]) {
        await cp(path.join(ROOT, file), path.join(ROOT, "dist", file));
      }
      console.log(`Built ${slugs.length} site(s).`);
    })
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;
    });
}

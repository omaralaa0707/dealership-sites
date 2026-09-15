const REQUIRED_STRING_FIELDS = [
  "slug",
  "dealerName",
  "tagline",
  "heroImage",
  "aboutText",
];

const OPTIONAL_NULLABLE_STRING_FIELDS = [
  "logo",
  "phone",
  "address",
  "instagram",
  "facebook",
  "maps",
];

const PALETTE_KEYS = ["background", "ink", "accent"];

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export class DealerValidationError extends Error {
  constructor(slug, message) {
    super(`${slug || "(unknown slug)"}: ${message}`);
    this.name = "DealerValidationError";
    this.slug = slug;
  }
}

export function validateDealer(dealer) {
  if (!dealer || typeof dealer !== "object") {
    throw new DealerValidationError(undefined, "dealer entry is not an object");
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof dealer[field] !== "string" || dealer[field].trim() === "") {
      throw new DealerValidationError(
        dealer.slug,
        `missing required field "${field}"`
      );
    }
  }

  if (!KEBAB_CASE.test(dealer.slug)) {
    throw new DealerValidationError(dealer.slug, "slug must be kebab-case");
  }

  if (!dealer.palette || typeof dealer.palette !== "object") {
    throw new DealerValidationError(dealer.slug, "missing palette");
  }
  for (const key of PALETTE_KEYS) {
    const value = dealer.palette[key];
    if (typeof value !== "string" || !HEX_COLOR.test(value)) {
      throw new DealerValidationError(
        dealer.slug,
        `palette.${key} must be a 6-digit hex color`
      );
    }
  }

  if (!Array.isArray(dealer.gallery) || dealer.gallery.length < 1) {
    throw new DealerValidationError(
      dealer.slug,
      "gallery must have at least one entry"
    );
  }
  dealer.gallery.forEach((item, i) => {
    if (!item || typeof item.image !== "string" || item.image.trim() === "") {
      throw new DealerValidationError(
        dealer.slug,
        `gallery[${i}].image is required`
      );
    }
    if (typeof item.caption !== "string") {
      throw new DealerValidationError(
        dealer.slug,
        `gallery[${i}].caption must be a string`
      );
    }
  });

  for (const field of OPTIONAL_NULLABLE_STRING_FIELDS) {
    if (field in dealer && dealer[field] !== null && typeof dealer[field] !== "string") {
      throw new DealerValidationError(
        dealer.slug,
        `${field} must be a string or null`
      );
    }
  }

  return true;
}

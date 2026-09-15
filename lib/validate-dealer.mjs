const REQUIRED_STRING_FIELDS = [
  "slug",
  "dealerName",
  "tagline",
  "heroText",
];

const ABOUT_PARAGRAPH_COUNT = 3;

// heroImage is required as a key, but its value may be a non-empty string
// or null (for a dealer with no photography at all).
const NULLABLE_REQUIRED_STRING_FIELDS = ["heroImage"];

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

  for (const field of NULLABLE_REQUIRED_STRING_FIELDS) {
    if (!(field in dealer)) {
      throw new DealerValidationError(
        dealer.slug,
        `missing required field "${field}"`
      );
    }
    const value = dealer[field];
    const isNonEmptyString = typeof value === "string" && value.trim() !== "";
    if (value !== null && !isNonEmptyString) {
      throw new DealerValidationError(
        dealer.slug,
        `field "${field}" must be a non-empty string or null`
      );
    }
  }

  if (!KEBAB_CASE.test(dealer.slug)) {
    throw new DealerValidationError(dealer.slug, "slug must be kebab-case");
  }

  if (
    !Array.isArray(dealer.aboutParagraphs) ||
    dealer.aboutParagraphs.length !== ABOUT_PARAGRAPH_COUNT
  ) {
    throw new DealerValidationError(
      dealer.slug,
      `aboutParagraphs must be an array of exactly ${ABOUT_PARAGRAPH_COUNT} strings`
    );
  }
  dealer.aboutParagraphs.forEach((paragraph, i) => {
    if (typeof paragraph !== "string" || paragraph.trim() === "") {
      throw new DealerValidationError(
        dealer.slug,
        `aboutParagraphs[${i}] must be a non-empty string`
      );
    }
  });

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

  if (!Array.isArray(dealer.gallery)) {
    throw new DealerValidationError(
      dealer.slug,
      "gallery must be an array"
    );
  }
  dealer.gallery.forEach((item, i) => {
    if (!item || typeof item.image !== "string" || item.image.trim() === "") {
      throw new DealerValidationError(
        dealer.slug,
        `gallery[${i}].image is required`
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

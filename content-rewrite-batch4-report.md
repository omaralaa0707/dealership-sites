# Content rewrite report — batch 4 (7 dealers)

Schema migration: `aboutText` (string) replaced with `aboutParagraphs` (exactly 3 strings), new required `heroText` added, and `caption` removed from every `gallery[]` item, for the following 7 dealers only: vroom-automotive, goda-motors, el-togary-auto, moataz-elhawi-auto, al-mounir-motors, gravity-auto, trust-motors.

Validation: `node -e "..."` against `lib/validate-dealer.mjs` reports **7 valid**. No other dealer in `data/dealers.json` was touched (`git diff` shows exactly 7 hunks, one per target dealer, no slug lines added or removed; total dealer count unchanged at 46).

---

## Vroom Automotive (vroom-automotive)

**heroText:** Every car on Vroom Automotive's floor, from a Lamborghini Urus to a Skoda Kodiaq, is presented against the same showroom wall, making the range easy to compare one car to the next.

1. Vroom Automotive is a car showroom in Fifth Settlement, New Cairo, carrying a wide range of marques from exotic sports cars to everyday family models. Recent stock has included a Lamborghini Urus, a Ferrari 12Cilindri, a Mercedes-Benz CLA 180, a Rox 01, a Cadillac Escalade and a Skoda Kodiaq.
2. The showroom is at Unit G06, Plot 128, on 70th Street inside Bank Center, Fifth Settlement, New Cairo. Its display floor is set against a terracotta timber wall and a faceted marble panel, a backdrop that stays constant behind every car shown there.
3. Buyers can reach Vroom Automotive by phone, or follow the dealership on Instagram and Facebook to see current stock before visiting. The showroom's location is also listed on Google Maps for those planning a visit in person.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions naming each car) plus `vroom-automotive/src/content/en.ts` (`about.body`, `screen.body` — terracotta timber wall and faceted marble panel description) and `media.ts` (`CARS[]` — Urus, Ferrari 12Cilindri, CLA 180, Rox 01, Escalade, Kodiaq; `PROFILE.address`). Omitted all model years (mostly "2026" on several listings) and the follower/post counts.

---

## Goda Motors (goda-motors)

**heroText:** Goda Motors publishes an unhurried opening line before the numbers on every listing, then follows it with a full spec: mileage, trim, condition and factory paint.

1. Goda Motors is a car showroom in Cairo carrying premium marques including Mercedes-AMG, Mercedes-Benz and BMW. Recent stock has included a Mercedes-AMG SL 55, a Mercedes-Benz E180 in both Avantgarde and Exclusive trim, and a BMW X5 M40i.
2. Every car in the showroom is photographed in the same studio bay, lit by a single suspended ring light hanging above the car, a consistent setting that carries through every listing published.
3. Each listing opens with the dealership's own line about the car before settling into details such as mileage, trim, supply and whether the paintwork is factory-original. Buyers can reach Goda Motors by phone, or follow the dealership on Instagram and Facebook to see what's currently on the floor.

**Sources drawn from:** existing JSON entry (aboutText, gallery captions) plus `goda-motors/src/content/en.ts` (`about.body`, `light.body` — the studio bay and ring light) and `media.ts` (`CARS[]` — SL 55, E180 Avantgarde/Exclusive, X5 M40i; field names `trim`/`mileageKm`/`supply`/`factoryPaint` used generically as "the details they publish" rather than any one car's figures). Omitted the specific mileage/deposit-style figures and the "Agency warranty" supply note on the SL 55 specifically, since that is a single-listing detail rather than a dealership-wide claim; omitted follower/post counts.

---

## El Togary Auto (el-togary-auto)

**heroText:** El Togary Auto pairs exotic marques like Ferrari and Porsche with instalment-plan Skoda models, all sold from the same showroom inside City Stars Mall.

1. El Togary Auto is a car showroom in Nasr City, Cairo, carrying a broad range of marques from exotic sports cars to family SUVs. Recent stock has included a Mercedes-Benz C180, a Jaguar F-Type, a Porsche 718 Cayman, a Ferrari Roma, a Range Rover Evoque, a Peugeot 408, a Porsche Cayenne, a Volvo XC90 and Skoda's Superb and Kodiaq models.
2. Unlike a forecourt or a standalone building, the showroom operates from a retail unit inside City Stars Mall, Nasr City, putting its cars alongside the mall's other stores. Buyers can reach the showroom directly by phone, or through its listing on Google Maps.
3. Alongside its showroom stock, El Togary Auto also offers its Skoda models on instalment terms, with free administrative fees, no mandatory insurance and a free first-year licence included as part of the plan. Buyers can follow the dealership on Instagram and Facebook to see current offerings.

**Sources drawn from:** existing JSON entry (aboutText, address, phone list, Instagram, Facebook, gallery captions) plus `el-togary-auto/src/content/en.ts` (`about.body`, `mall.body` — the mall-unit premises) and `media.ts` (`SHOWROOM[]` — C180, F-Type, 718 Cayman, Roma, Evoque, 408, Cayenne, XC90; `FINANCE_TERMS` — the four general instalment terms, kept as terms rather than figures). Deliberately scoped the instalment-terms sentence to "its Skoda models" only, matching the source, rather than generalizing financing to the whole dealership. Omitted the specific deposit amounts (400,000 / 500,000, both financing figures), the tax registration number (not a meaningfully useful fact for a first-time visitor), and follower/post counts.

---

## Moataz El Hawi Auto (moataz-elhawi-auto)

**heroText:** Every car at Moataz El Hawi Auto is photographed on the same forecourt, marked by a steel monogram on the canopy and a pair of red fluted columns by the doorway.

1. Moataz El Hawi Auto is a car dealership in Nasr City's Ninth District, on the Shinzo Abe Axis opposite Al-Masrawy Mosque, carrying marques including Mercedes-Benz, Jeep, Jaguar and BMW. Recent stock has included a Mercedes-Benz G500, a Jeep Grand Cherokee Limited, a Jaguar F-Type P300 and a BMW 320 M-Sport.
2. Every car on the forecourt is photographed in the same spot outside the showroom: a navy fascia bearing the dealership's name, a steel monogram mounted on the canopy above it, and a pair of fluted columns painted signal red on either side of the doorway.
3. Beyond the marques currently in view, the dealership has also dealt in MG, Fiat, Honda, Hyundai, Seat and Skoda, among others. Buyers can reach Moataz El Hawi Auto by phone, or follow the dealership on Instagram and Facebook to see what's currently on the forecourt.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions) plus `moataz-elhawi-auto/src/content/en.ts` (`forecourt.body` — gate description) and `media.ts` (`FLEET[]` — G500, Grand Cherokee Limited, F-Type P300, 320 M-Sport; `ROSTER` — eight highlight marques, from which BMW and Jeep were excluded since they duplicate the sourced fleet). Kept the roster sentence in past tense ("has also dealt in") per the source's own caveat that a highlight name is not a claim of current stock. Omitted the Grand Cherokee's specific maintenance/repaint disclosures (single-listing detail, not a dealership-wide claim) and follower/post counts.

---

## Al Mounir Motors (al-mounir-motors)

**heroText:** Al Mounir Motors' showroom canopy carries the same gold herringbone band as its own branding, with WhatsApp kept as the direct line to the floor.

1. Al Mounir Motors is a car showroom in Sheikh Zayed, Giza, carrying premium marques including BMW, Mercedes-Benz and Range Rover. Recent stock has included a BMW X5 M40i, a Mercedes-AMG G63, a BMW Z4 Roadster, a Range Rover Evoque, a Mercedes-Benz V300 VIP, a Mercedes-Benz C180 and a Mercedes-Benz GLS 580 4MATIC.
2. The showroom operates two branches, a Zayed branch and a Fisal branch, with its Sheikh Zayed canopy carrying a herringbone chevron band that matches the dealership's own gold wordmark. The same showroom wall also displays branding for other marques it has carried, including Land Rover, Jeep, Audi and Volvo.
3. Buyers can reach Al Mounir Motors directly through WhatsApp, or by phone, and can follow the dealership on Instagram to see current stock. The showroom's location is also listed on Google Maps for those visiting Sheikh Zayed in person.

**Sources drawn from:** existing JSON entry (aboutText, address, phone numbers, Instagram, gallery captions) plus `al-mounir-motors/src/content/en.ts` (`system.body` — herringbone band/wordmark; `branches.body` — Zayed/Fisal branch names) and `media.ts` (`FLEET[]` — X5, G63, Z4, Evoque, V300 VIP, C180, GLS 580; `WALL_MARQUES` — marques visible on their own showroom wall; `PROFILE.whatsappHref`). Omitted the Al Marioteya/Haram address noted on a single V300 post (kept the bio's Sheikh Zayed HQ and the two named branches instead, since the mismatch itself is not a straightforward fact for a first-time visitor) and follower/post counts.

---

## Gravity Auto (gravity-auto)

**heroText:** Every car at Gravity Auto is listed with a clear spec line, covering motor size, power output and mileage, before a buyer ever steps onto the forecourt.

1. Gravity Auto is a car showroom in Sheikh Zayed, Giza, carrying brand-new and newly imported cars from marques including BYD, Volvo, BMW and Mercedes-Benz. Recent stock has included a BYD Sealion 06, a Volvo XC60, a BMW 235 Gran Coupe and a Mercedes-Benz C180 AMG Line.
2. The showroom is at Chill Out, Waslet Dahshour, opposite the Zayed 3 entrance in Sheikh Zayed, marked by a backlit Gravity Auto sign on the forecourt.
3. Every car is listed with a clear spec line covering details such as motor size, power output and mileage. Buyers can reach Gravity Auto by phone, or follow the dealership on Instagram and Facebook to see current stock.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions) plus `gravity-auto/src/content/en.ts` (existing aboutText already matched source closely) and `media.ts` (`FLEET[]` — Sealion 06, XC60, 235 Gran Coupe, C180 AMG Line; the backlit "GRAVITY AUTO" sign on a graphite concrete forecourt, per the file's own header comment; `PROFILE.address`). Omitted the "local warranty" note stated only on the BMW 235 specifically (a single-listing detail, not generalized), the repeated "Mototr" typo detail, and follower/post counts (207/375, explicitly the smallest sourced in the series).

---

## Trust Motors (trust-motors)

**heroText:** Trust Motors runs its shop in Ibrahimiya, directly across from the Fathallah supermarket's Riviera branch, marked by its own shopfront sign and a circular seal reading Trust Motors, Alexandria.

1. Trust Motors is a used car dealership in Ibrahimiya, Alexandria, dealing in the sale, purchase and consignment trade-in of cars. Recent stock has included a Suzuki Ciaz and a Kia Sportage, both listed as fully factory-original and agency-serviced.
2. The shop sits on a residential street in Ibrahimiya, directly across from the Fathallah supermarket's Riviera branch. Its shopfront sign reads Trust Motors, alongside a circular seal marking the dealership as Trust Motors, Alexandria.
3. Buyers can reach the dealership through Eng. Essam or Eng. Mohamed by phone, or through the shop's own landline. The dealership sums up its approach in its own line: your trust, our priority.

**Sources drawn from:** existing JSON entry (aboutText, address, phone numbers, Instagram, gallery captions) plus `trust-motors/src/content/en.ts` (`city.body`, `city.signLines` — shopfront sign and seal text; `contact.partners` — Eng. Essam / Eng. Mohamed) and `media.ts` (`FLEET[]` — Ciaz and Sportage captions naming trim/paint/servicing; `PROFILE.landline`). Kept the "your trust, our priority" line in its already-English form (it appears in the existing JSON entry, not as newly translated Arabic script). Omitted the specific mileage figures (74,000 km / 84,000 km), the licence-duration figure, the fingerprint-trim naming detail (tied to one specific car's named trim, not a general dealership fact), and follower/post counts.

---

## Notes

- No em dash (U+2014), Arabic script, or Claude/Anthropic mention appears anywhere in the new copy (verified programmatically).
- No year-like four-digit numbers (19xx/20xx) appear in any heroText or aboutParagraphs (verified programmatically).
- No prices, deposit/monthly-payment amounts, interest rates or discount figures were included anywhere. El Togary Auto's real, dealership-stated general instalment terms (free administrative fees, no mandatory insurance, free first-year licence) were kept, but scoped to the Skoda models they actually apply to per source, and no numeric deposit or rate was used.
- Single-listing details that could easily be mistaken for dealership-wide policy were kept scoped to their specific car rather than generalized: Goda Motors' SL 55 "Agency warranty" supply note, Moataz El Hawi's Grand Cherokee maintenance/repaint disclosures, and Gravity Auto's BMW 235 "local warranty" note were all left out of the general copy for this reason.
- No follower or post counts were included (Vroom, Goda Motors, El Togary Auto, Moataz El Hawi Auto, Al Mounir Motors, Gravity Auto and Trust Motors all had these in source; all omitted).
- All `gallery[]` items for these 7 dealers now contain only `{ "image": "..." }`, with `caption` removed.
- Validation confirmed 7/7 valid against `lib/validate-dealer.mjs`; `git diff data/dealers.json` shows exactly 7 hunks with no slug additions/removals, and the total dealer count in the file is unchanged at 46, confirming no other dealer was touched.

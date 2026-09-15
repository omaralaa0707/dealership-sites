# Content rewrite report — batch 2 (7 dealers)

Schema migration: `aboutText` (string) replaced with `aboutParagraphs` (exactly 3 strings), new required `heroText` added, and `caption` removed from every `gallery[]` item, for the following 7 dealers only: st4matic, a-class-automotive, middle-east-motors, bedawy-automotive, al-rowad-auto, auto-gate, auto-dynamics.

Validation: `node -e "..."` against `lib/validate-dealer.mjs` reports **7 valid**. No other dealer in `data/dealers.json` was touched.

---

## ST4Matic (st4matic)

**heroText:** A reconditioned German and Japanese fleet, including BMW, Mercedes-Benz and Subaru, out of one showroom in El Nozha, with flexible financing on every car.

1. ST4Matic is a reconditioned-car showroom dealing in petrol and electric cars, both zero-mileage and used. The fleet draws on German and Japanese marques, with BMW, Mercedes-Benz and Subaru among the cars that pass through the showroom floor.
2. The showroom is located on Fareed Semeika Street in El Nozha, Cairo, with three phone lines open for calls and an active Facebook page keeping the current fleet visible to anyone browsing before a visit.
3. Several cars on the floor carry ambient interior lighting as standard, with cluster and trim illumination that shifts between drive modes, a detail the showroom highlights across its BMW and Mercedes-Benz stock. Flexible financing is available on every car sold, keeping the buying process straightforward from first look to handover.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Facebook) plus `st4matic/src/content/en.ts` (`hero.sub` — German/Japanese fleet, marques; `ambient` section — ambient light as a real feature on select cars; `financing` section — financing available, kept vague to avoid a specific rate/term figure) and `media.ts` (`AMBIENT_FRAMES`, confirming the ambient-light feature is drawn from their own photography, not invented).

---

## A Class Automotive (a-class-automotive)

**heroText:** A dedicated exotics showroom in Sheikh Zayed, presenting a rotating floor of marques from Lamborghini to Land Rover against the gallery's own signature backdrop.

1. A Class Automotive is an exotics gallery showing a rotating selection of high-end marques that has included Lamborghini, Mercedes-Benz, Porsche, Land Rover, Toyota, Genesis and Nissan. Each car that comes through the floor is presented as a single, carefully staged specimen rather than one of a crowded lineup.
2. The gallery is set at City Park in Sheikh Zayed City, and every car is photographed in the same room, against a pale stone wall carrying the dealership's name and crest, so the setting stays constant while the car on the floor changes. Visitors can reach the team on three phone lines or follow the gallery's Instagram for a look at what is currently on the floor.
3. Cars arriving on the floor are frequently low-mileage or brand new, with some still covered by the original dealer's warranty, giving buyers an added layer of confidence beyond the showroom presentation itself.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, gallery marques) plus `a-class-automotive/src/content/en.ts` (`about.body` — same-room, same-wall photography) and `media.ts` (`CARS` array — full marque list including Genesis and Nissan from the "also on the floor" set, and the Porsche Cayenne GTS note "still under the official dealer's warranty," generalized to "some" cars rather than presented as a universal claim). Omitted specific mileages, model years and the 1-of-1/Africa claim (a dated, unverifiable superlative).

---

## Middle East Motors (middle-east-motors)

**heroText:** Bank-financed used cars sold straight off the kerb in Heliopolis, with marques spanning Mercedes-Benz to Renault and Fiat on the floor.

1. Middle East Motors sells and finances used cars across a wide range of models, arranging bank finance so buyers can drive away without a large deposit up front. The floor draws from marques including Mercedes-Benz, Renault and Fiat, spanning family saloons, hatchbacks and crossovers.
2. The showroom is on Ahmed Mohamed Ali Street in Heliopolis, tucked off Abdel Hamid Badawi behind the KFC at Nadi El Shams, a landmark that makes the unit easy to find even without a formal storefront.
3. Each car on the lot is photographed from multiple angles inside and out before it is listed, giving buyers a clear look at condition ahead of a visit, and the team can be reached by phone or through the dealership's Instagram and Facebook pages for anything not covered in a listing.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery marques/angles) plus `middle-east-motors/src/content/en.ts` (`about.body`, `visit.body` — kerb-side location detail) and `media.ts` (`PHOTOGRAPHED` — confirms exterior/rear/cabin/detail angle coverage). Deliberately omitted the 2006–2026 model-year range (a literal year span, date-bound) and the Arabic used-car vocabulary (banned: no Arabic script), favoring the qualitative "wide range of models" instead.

---

## Bedawy Automotive (bedawy-automotive)

**heroText:** Twelve marques under one roof, from established European names to the newest Chinese arrivals, each car presented in the dealership's own showroom bay.

1. Bedawy Automotive is a long-established Cairo dealership carrying a broad roster of marques that spans established European names such as Škoda, Opel, SEAT, Fiat, Nissan and Hyundai alongside newer arrivals including MG, Chery, ROX and AVATR. The result is a floor that covers both familiar European stock and the newest Chinese entrants side by side.
2. The showroom is at Building 15 Ideal on Al-Nasr Road, Cairo, where every car is presented in the same indoor bay: a black room with a stone feature wall and the dealership's own gold crest mounted above the car.
3. Buyers can reach the showroom by phone or follow its Instagram page for a look at the current stock before visiting in person, with each car in the bay given the same careful presentation regardless of marque or origin.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, gallery) plus `bedawy-automotive/src/content/en.ts` (`roster` section) and `media.ts` (`MARQUES` array — full twelve-marque roster, legacy vs. new split). Deliberately avoided "more than 20 years" (the tagline's own figure) in the paragraphs in favor of "long-established," consistent with batch 1's treatment of date-bound duration claims, since a year-count like this goes stale.

---

## Al Rowad Auto (al-rowad-auto)

**heroText:** New cars sourced from five origins, Chinese, European, American, Korean and Spanish marques, sold across three branches in Cairo and Fayoum.

1. Al Rowad Auto Group sells new cars sourced from five origins, Chinese, European, American, Korean and Spanish marques, covering names from BYD, Geely and Chery to Škoda, Renault, Mercedes-Benz, Jeep, KGM, Nissan, Subaru, SEAT and Cupra. Every car on the floor is available for immediate delivery rather than an ordered wait.
2. The group runs three branches: one on Maadi Autostrad Road at the lower entrance of Al-Meraj City inside the A1 station, one on the Shahid Axis Road in Nasr City, and a third at Al-Hassan Tower opposite the Fayoum Culture Palace, giving buyers a branch to visit in both Cairo and Fayoum.
3. Each branch runs its own bank of phone lines for calls and WhatsApp, and the dealership keeps its Instagram and Facebook pages updated with current stock, with directions to any of the three branches available through Maps.

**Sources drawn from:** existing JSON entry (aboutText, address, phone block, Instagram, Facebook, maps) plus `al-rowad-auto/src/content/en.ts` (`origins`, `branches` sections) and `media.ts` (`MARQUES` array — full marque list per origin, `BRANCHES` — per-branch addresses). No pricing, cashback or deposit figures used, matching the source's own note that time-bound campaign details were deliberately excluded from the original site.

---

## Auto Gate (auto-gate)

**heroText:** A luxury automobile seller in Heliopolis carrying marques from Mercedes-Benz to Porsche, Land Rover and BMW, including electric and hybrid options.

1. Auto Gate is a luxury automobile seller based in Egypt, carrying marques that include Mercedes-Benz, Porsche, Land Rover and BMW, with both electric and hybrid cars represented on the floor alongside petrol models such as the Dodge Challenger.
2. The dealership works from a single forecourt at 64 El-Nozha Street in Heliopolis, next to the Mobil station, with cars displayed outdoors under the dealership's own illuminated sign rather than inside a showroom hall.
3. Buyers can reach the team by phone or WhatsApp, or follow the dealership's Instagram and Facebook pages to see what is currently on the forecourt, with directions available through Maps.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, maps, gallery) plus `auto-gate/src/content/en.ts` (`floor.marquesLabel`/`drivetrainLabel` section — sorted-by-marque-and-drivetrain framing) and `media.ts` (`MARQUES` — Mercedes, Porsche, Land Rover, BMW; `DRIVETRAINS` — electric, hybrid; `CARS` — Dodge Challenger as the one fully specified car). Kept the night/forecourt photography detail as a real fact about how cars are presented, not meta-commentary about sourcing.

---

## Auto Dynamics (auto-dynamics)

**heroText:** A long-established Cairo dealership curating world-class cars across marques including Jaguar, Porsche, Land Rover and Mercedes-Benz, with a full specification sheet published for every car.

1. Auto Dynamics is a long-established Cairo dealership that curates a selection of world-class cars, with marques on the floor spanning Jaguar, Alfa Romeo, Mercedes-Benz, Porsche, Land Rover and Mazda alongside both new and pre-owned stock.
2. Every car in the collection is presented in the dealership's own showroom doorway, photographed the same way each time so a visitor can compare one car against the next on equal footing before making the trip to Cairo to see it in person.
3. Listings are unusually thorough for the trade: each one runs to a full specification sheet covering drivetrain, interior, technology, exterior and safety, with an exact odometer reading given for every pre-owned car, and the dealership's Instagram page is kept current with what's on the floor.

**Sources drawn from:** existing JSON entry (aboutText, marques, address, Instagram, Facebook, maps) plus `auto-dynamics/src/content/en.ts` (`about.body`, `typology.intro` — identical-doorway photography) and `media.ts` (`CARS` array — confirms sectioned spec sheets and exact odometer readings on pre-owned cars). "Since 1994" was replaced with "long-established" (a literal founding year is a date-bound fact); no street address exists in source beyond "Cairo, Egypt," so none was invented; phone is genuinely absent from source (contact is Instagram-only), so none was added.

---

## Notes

- No em dash, Arabic script, or Claude/Anthropic mention appears anywhere in the new copy (verified programmatically).
- No year-like four-digit numbers (19xx/20xx) appear in any heroText or aboutParagraphs (verified programmatically) — all model years, founding years and published year-ranges were either dropped or rewritten qualitatively ("long-established," "brand new," "low-mileage").
- No prices, discounts, deposit percentages, or financing rates were included; "flexible financing" and "bank finance" are stated without figures.
- All `gallery[]` items for these 7 dealers now contain only `{ "image": "..." }`, with `caption` removed.

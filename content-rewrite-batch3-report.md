# Content rewrite report — batch 3 (7 dealers)

Schema migration: `aboutText` (string) replaced with `aboutParagraphs` (exactly 3 strings), new required `heroText` added, and `caption` removed from every `gallery[]` item, for the following 7 dealers only: zayed-auto, mansy-automotive, motor-zone, k-auto, auto-hub, teacher-motors, melegy-automotive.

Validation: `node -e "..."` against `lib/validate-dealer.mjs` reports **7 valid**. No other dealer in `data/dealers.json` was touched (`git diff` shows exactly 7 hunks, one per target dealer, no slug lines added or removed).

---

## Zayed Auto (zayed-auto)

**heroText:** One forecourt, one seller: every car at Zayed Auto is sold and driven personally by Eslam Zayed rather than passed between salespeople.

1. Zayed Auto is a small, owner-run dealership on a parade in Beverly Hills, Sheikh Zayed, where Eslam Zayed sells a handful of used cars directly off the pavement outside his shopfront. Recent stock has included a Mercedes-Benz C180 AMG, a MINI Cooper Countryman and a Hyundai Creta.
2. The shop sits next to a bank branch on the parade, with around half a dozen cars parked on the pavement outside and a hand-lettered sign marking the door. It is a compact, street-level operation rather than an indoor showroom, with every car visible to passersby before they step inside.
3. Buyers can reach Eslam directly by phone or WhatsApp, or follow the dealership on Instagram to see what is currently on the pavement. Listings are also unusually specific about condition: on one Hyundai Creta, the seller noted exactly which two body panels had been repainted rather than simply describing the whole car as factory-original.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, gallery captions) plus `zayed-auto/src/content/en.ts` (`contact.heading` "Talk to Eslam", `shop.body` — pavement/shopfront description, hand-lettered sign) and `media.ts` (`PROFILE.person` "Eslam Zayed"; `CARS[].lines` — the Creta's own listing text disclosing two repainted front wings, kept as a single documented example rather than generalized into a policy). Omitted the 20%-down financing figure from the Creta listing (a financing figure) and omitted the "516 followers / 23 posts" statistics (follower counts, banned).

---

## Mansy Automotive (mansy-automotive)

**heroText:** Mansy Automotive's floor spans everything from a Mercedes-Benz CLE to a CUPRA Formentor offered across three different powertrains, mild hybrid, turbo petrol and plug-in hybrid, each one listed by the numbers rather than a sales pitch.

1. Mansy Automotive is a car showroom in Cairo carrying marques including Mercedes-Benz, MG and CUPRA, with cars on the floor including a Mercedes-Benz CLE 200, an MG GT, and two CUPRA models, the Leon and the Formentor. Every listing is built from hard figures alone: engine size, power, torque, transmission and drivetrain, rather than descriptive language.
2. Every car on the floor is photographed in the same showroom, in front of a gold fluted column that stands behind each one, and every interior shot includes the same red branded mat in the footwell. Outside, the cars sit under a plain white sign bearing the dealership's name in black capitals, with no strapline beneath it.
3. Buyers can reach the showroom by phone, through its Instagram and Facebook pages, or in person via the address on Maps. The consistency of the photography and the detail published for each car make it straightforward to compare one listing against another before a visit.

**Sources drawn from:** existing JSON entry (aboutText, gallery captions, contact fields) plus `mansy-automotive/src/content/en.ts` (`hero.noProseNote`, `room.body` — column, mat, sign details) and `media.ts` (`CARS[].spec` — engine/power/torque/transmission/drivetrain per car; `cupra-formentor` spec listing its three powertrains). Omitted all model years and the specific numeric specs (204 HP, 275 Nm, etc.) since the paragraphs describe the practice of publishing figures rather than restating the figures themselves.

---

## Motor Zone (motor-zone)

**heroText:** Motor Zone publishes exact deposit and monthly payment terms for each car it sells, a level of transparency most dealerships in Cairo leave to a phone call.

1. Motor Zone is a car dealership in Heliopolis selling new Chinese and European vehicles on finance. The dealership carries a mix of models, including SUVs and saloons, each offered with a stated deposit and monthly payment, along with the interest rate its financing plans start from.
2. The shop is on Sayed Zakaria Street in Sheraton, Heliopolis, next to Al-Siddiq Mosque in the Morabaa El-Wozara area. It is a straightforward storefront operation focused on new-vehicle sales rather than a large indoor showroom.
3. Buyers can reach the dealership by phone, or follow its Instagram and Facebook pages for current models and terms. Because each plan is published with clear deposit and monthly figures rather than a placeholder, it is straightforward to compare one model against another before visiting the shop.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook) plus `motor-zone/src/content/en.ts` (`plans.intro`, `headline.intro` — the dealership's practice of publishing deposit/monthly figures and a starting interest rate) and `media.ts` (`PLANS` — four models offered on stated deposit/monthly terms; `HEADLINE` — the Jetour T2 SUV; the file's own note that Motor Zone publish no photography at all, which is why `gallery: []` was left untouched and no image was added). No actual price, deposit, monthly-payment or interest-rate figures were used anywhere, per the banned-financing-figures rule; only the fact that such terms are published was stated.

---

## K.auto (k-auto)

**heroText:** Two showroom addresses, at Waslet Dahshour and Beverly Hills, put K.auto's roster of marques within reach across both Cairo and Giza.

1. K.auto is a long-established car showroom run by Mahmoud Kosba, carrying marques that include Mercedes-Benz, Porsche, BMW, Audi, Lamborghini and Toyota. Recent cars on the floor have included a BMW X5 M60i and a Toyota Land Cruiser VXR.
2. The showroom operates from two addresses: Waslet Dahshour, beside Cairo University at Jumeirah Plaza Walk, and a second location at Beverly Hills, Gate 8 and 9, Mall 23. Cars are displayed on a circular dais under a domed ceiling, with a light running the rim of the floor, rather than parked in a conventional row.
3. Buyers can reach the showroom by phone at either address, or follow its Instagram and Facebook pages to see what is currently on the dais. The BMW X5 recently on the floor was listed with a detailed specification covering mileage, exterior and interior colour, engine and power output, supplied through the local agency.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions) plus `k-auto/src/content/en.ts` (`brand.name`, `about.body`, `room.body` — dais/dome description) and `media.ts` (`PROFILE.owner` "Mahmoud Kosba", `PROFILE.addresses`; `CARS[].spec` — the BMW X5's full spec list). "Since 1985" was replaced with "long-established" (a literal founding year is date-bound). The Land Cruiser's listing explicitly carries no written specification in source, so the "detailed specification" claim in paragraph 3 was scoped to the BMW X5 only rather than generalized to both cars. Omitted the Xiaomi/Polaris marque-list detail (a stylistic observation from the source project, not a straightforward dealership fact) and all follower counts.

---

## Auto Hub (auto-hub)

**heroText:** Auto Hub keeps its full sales history visible, marking each car sold rather than removing the listing, so buyers can see exactly what has moved through the door.

1. Auto Hub is a car dealership in Heliopolis selling brand-new and pre-owned vehicles, with stock spanning marques including Mercedes-Benz, BMW, Audi, SEAT, Skoda, MG and Renault. German saloons on the lot are often labelled by their factory chassis code, such as W205 or G30, the same shorthand a workshop or owner would use rather than a sales floor.
2. The dealership is at 64 Nehru Street, off Al Sebaq Street, behind Merryland Park in Heliopolis, Cairo. Cars are typically photographed from multiple angles before being listed, giving buyers a clear view of each one ahead of a visit.
3. Buyers can reach the dealership by phone or email, or follow its Instagram and Facebook pages to see current stock and what has already sold. Instalment financing is advertised across the range, appearing consistently throughout the dealership's posts.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions) plus `auto-hub/src/content/en.ts` (`hero.sub` — the #sold record-keeping practice; `codes.heading` — German saloons tagged by chassis code) and `media.ts` (`PROFILE.email`, `PROFILE.address`; `CARS[].frames` — three images per car, confirming multi-angle photography; the تقسيط/instalments hashtag appearing on all posts). Omitted the owner's name (given only in Arabic script in source, with no English rendering to draw from) and all specific model years, sold/available counts and follower figures.

---

## Teacher Motors (teacher-motors)

**heroText:** From Rolls-Royce and Brabus to Porsche and Tesla, Teacher Motors backs an unusually wide span of new and used vehicles with instalment financing options.

1. Teacher Motors is an automotive lending centre and dealership based on the Cairo-Alexandria Desert Road in Sheikh Zayed, Giza. Recent stock has ranged from a Rolls-Royce Cullinan and a Brabus 930 to a Jeep Grand Cherokee, a Mercedes-Benz GLE 450 and a Chevrolet Silverado, spanning everyday SUVs to some of the most exclusive names on the road.
2. The dealership fields a large bank of phone lines rather than a single number, so buyers calling in are rarely left waiting for someone to pick up. It also maintains its own website alongside active Instagram and Facebook pages, giving buyers several ways to check current stock before calling.
3. Instalment financing is available across the range, and several listings include real performance figures such as power, torque and acceleration for cars sold on their specification rather than on financing terms alone. Buyers can reach Teacher Motors by phone, email or through its Instagram and Facebook pages to see what is currently in stock.

**Sources drawn from:** existing JSON entry (aboutText, address, phone block, Instagram, Facebook, gallery captions) plus `teacher-motors/src/content/en.ts` (`brand.tagline` — lending centre framing; `figures.intro` — the pairing of real specs with cars that carry no finance line) and `media.ts` (`PROFILE.phone`/`landline`/`email`/`site`; `CARS[]` — the Brabus 930, Tesla Model X Plaid and Rolls-Royce Cullinan among others, and their published performance figures). Omitted the 1,000,000-follower figure and the 0%-down/7-year financing terms (follower counts and financing figures are both banned); the Silverado's 30% down exception was also left out since it is itself a financing figure.

---

## Melegy Auto (melegy-automotive)

**heroText:** Every available car at Melegy Auto is listed against the same fixed checklist, so buyers can compare condition and history in the same terms from one listing to the next.

1. Melegy Auto is a car dealership selling used and nearly-new vehicles, with recent stock including a SEAT Ibiza, a Peugeot 508, a Fiat 500X, a Nissan Qashqai and a Mercedes-Benz C180, among others.
2. The dealership operates two showrooms: one in Nasr City, on Mehwar El Shaheed, and a second in Ismailia, at Fox Square, Ard El Gam3iyat. Both branches keep the same hours, open six days a week from midday until 1am.
3. Every available car is listed against the same set of details: year, trim, whether the paintwork is entirely factory-original, mileage, service history and licence status, with a full equipment list included. Instalment financing is available through banks and finance companies, and buyers can reach either branch by phone or through the dealership's Instagram and Facebook pages.

**Sources drawn from:** existing JSON entry (aboutText, address, phone, Instagram, Facebook, gallery captions) plus `melegy-automotive/src/content/en.ts` (`form.intro` — the fixed eight-field template; `branches.intro`) and `media.ts` (`AVAILABLE[]` — the fixed field set: year, trim, factoryPaint, mileageKm, serviceAgency, licence, equipment; `PROFILE.branches`, `PROFILE.hours`). Omitted specific mileage figures, licence durations and model years for individual cars (kept to the general practice rather than one car's numbers), and left out the "used, with us, is zero" slogan reasoning since it duplicates the existing tagline field.

---

## Notes

- No em dash (U+2014), Arabic script, or Claude/Anthropic mention appears anywhere in the new copy (verified programmatically).
- No year-like four-digit numbers (19xx/20xx) appear in any heroText or aboutParagraphs (verified programmatically). K.auto's founding year ("since 1985") was rewritten as "long-established."
- No prices, deposit/monthly-payment amounts, interest rates or discount figures were included anywhere; where a dealership's real differentiator is that it publishes such terms (Motor Zone, Teacher Motors), only the fact that terms are published was stated, never a figure.
- No follower or post counts were included (Zayed Auto, K.auto, Auto Hub, Teacher Motors and Melegy Auto all had these in source; all omitted).
- motor-zone's `gallery` remains `[]` — it genuinely has no photography in source, per the task brief, and none was invented. Its three `aboutParagraphs` and `heroText` render as text-only content with no accompanying images, as expected.
- All `gallery[]` items for these 7 dealers now contain only `{ "image": "..." }`, with `caption` removed.
- Validation confirmed 7/7 valid against `lib/validate-dealer.mjs`; `git diff data/dealers.json` shows exactly 7 hunks with no slug additions/removals, confirming no other dealer was touched.

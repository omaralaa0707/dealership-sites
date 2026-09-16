# Content rewrite report — batch 1 (9 dealers)

Schema migration: `aboutText` (string) replaced with `aboutParagraphs` (exactly 3 strings), new required `heroText` added, and `caption` removed from every `gallery[]` item, for the following 9 dealers only: one-of-one, el-basma-motors, golf-star-motors, al-ahmady-motors, el-emam-motors, wheels-automotive, vision-auto, khaled-aboud, phantom-auto.

Validation: `node -e "..."` against `lib/validate-dealer.mjs` reports **9 valid**. The other 37 dealers in `data/dealers.json` were left untouched (they still use `aboutText` and gallery `caption`, and will fail the new validator until later batches update them — expected).

---

## One of One Automotive (one-of-one)

**heroText:** A tightly curated Heliopolis showroom of hand-picked luxury and sports cars, with immediate delivery and flexible finance on every one of them.

1. One of One Automotive is a Heliopolis showroom built around a small, hand-picked selection of luxury and sports cars, carrying marques such as Mercedes-Benz, Porsche, Range Rover, BMW and Audi alongside a rotating cast of others. Every car earns its spot on the floor through condition, specification and character rather than simply being in stock, so the collection stays tight rather than sprawling.
2. The showroom sits at 151 El Sayed El Merghany in Almazah, Heliopolis, and is open daily, giving visitors room to walk the floor and look closely at a car before deciding anything. Reaching the team is straightforward too, with three phone lines and an active Instagram and Facebook presence for anyone who wants a look at the collection before making the trip.
3. Once a car is chosen, delivery is immediate rather than something to wait weeks for, and the finance side is handled with flexible instalment options worked out around the buyer. The dealership also welcomes trade-ins, valuing a visitor's current car honestly and setting it against whatever comes next, so the whole process from walk-around to handover stays in one place.

**Sources drawn from:** existing `data/dealers.json` entry (aboutText, address, phone, gallery marques) plus `one-of-one/src/content/en.ts` (`about.body`, `services.items` — immediate delivery, flexible finance, selected inventory, trade-in welcome — and `contact` — "open seven days", daily hours).

---

## El Basma Motors (el-basma-motors)

**heroText:** Two branches, in New Damietta and Nasr City, carrying a straightforward lineup of used SUVs from Volkswagen, Toyota, Kia, Skoda and Hyundai.

1. El Basma Motors is a showroom for used SUVs, bringing in established marques including Volkswagen, Toyota, Kia, Skoda and Hyundai. Models on the floor include the Volkswagen Tiguan, Toyota Fortuner, Kia Sportage, Skoda Kodiaq and Hyundai Tucson, giving visitors a straightforward line of mid-size and family SUVs to compare in one place.
2. The dealership runs two branches: one in New Damietta on the Delta coast, on Sohbagiya Street next to Cedar Cafe, and another in Nasr City, Cairo, on the Tenth District's Shinzo Abe Axis. Having a foothold in both the Delta and the capital means a buyer in either region has a branch within reach.
3. Each SUV that comes through the showroom is photographed from multiple angles, exterior, rear and dashboard, so a visitor gets a clear look at a car's condition and interior before ever stepping onto the floor. The team can be reached through either branch's phone lines or through Instagram and Facebook, where the current lineup is kept up to date.

**Sources drawn from:** existing JSON entry (aboutText, two-branch addresses, marques, gallery captions/models) plus `el-basma-motors/src/content/en.ts` (`services.items` per-marque model list) and its `ALT` map (per-car photo angles: exterior, rear, dashboard/headlight close-ups), confirming the "photographed from multiple angles" detail. Did not use the odometer's branch-distance figure since the actual km value is a runtime token in `media.ts`, not a fact captured in either JSON or `en.ts` text.

---

## Golf Star Motors (golf-star-motors)

**heroText:** One of the longest-standing car houses in Nasr City, offering straightforward instalment plans across a wide range of major makes without a credit inquiry or hidden fees.

1. Golf Star Motors is an authorised distributor in Nasr City, working across buying, selling and financing for a wide range of major makes, so a visitor can handle the whole exchange, trade-in included, without shuttling between separate showrooms.
2. The showroom is at 7 Shahid Mohamed Abdel Moneim Street, off Nabil El Wakkad in Ard El Golf, Nasr City, and stands as one of the longest-standing car houses in the neighbourhood, buying, selling and financing across every major make under one roof.
3. The finance side is kept deliberately simple: instalment plans are sized around a buyer's income, arranged without a bank credit inquiry, hidden insurance requirement or additional fees buried in the paperwork, and government employees, doctors, university professors, business owners and homemakers are offered their own terms.

**Sources drawn from:** existing JSON aboutText and `golf-star-motors/src/content/en.ts` (`about.body`, `services.items` — no credit inquiry, no insurance/bank fees, instalments sized to income, special terms for specific professions). Deliberately omitted the specific founding year (1975) and the "up to 8 years" / "51 years" style figures, since they read as date-bound facts that go stale; "longest-standing car house" (already in source) captures the same trust signal without a number that needs updating.

---

## Al Ahmady Motors (al-ahmady-motors)

**heroText:** Four Cairo branches back one authorised distributor, with maintenance and parts support that carries on well after the sale.

1. Al Ahmady Motors is an authorised distributor for a range of major makes in Egypt, including Chery, MG, Citroën, Opel and Forthing, working across sales, instalments and after-sales service under one roof.
2. The dealership operates across Fifth Settlement, Sheraton, Nasr City and Heliopolis, with its head office at 13 Ramu Buildings on Omar Ibn El Khattab Street in Nasr City, so a buyer in several parts of Cairo has a branch within reach.
3. The relationship continues after the sale: genuine maintenance and spare parts keep a car the way it was delivered, and the dealership can be reached through its hotline or by WhatsApp for anyone who wants a question answered before visiting.

**Sources drawn from:** existing JSON aboutText, address, gallery marques (Chery, MG, Citroën, Opel, Forthing), and `al-ahmady-motors/src/content/en.ts` (`gallery.intro` naming the four branches: Fifth Settlement, Sheraton, Nasr City, Heliopolis; `services.items` for maintenance/parts and instalments; `contact` for the hotline/WhatsApp).

---

## El Emam Motors (el-emam-motors)

**heroText:** An authorised dealer for more than fifteen makes across three Cairo branches, with the deposit and instalment laid out plainly before anything is signed.

1. El Emam Motors is an authorised dealer for more than fifteen makes, including MG, Chery, Nissan, Opel and Kaiyi, giving visitors a wide spread of models to choose from without having to check multiple showrooms.
2. With branches in Maadi, Manial and Nasr City, the dealership puts a showroom within reach across several parts of Cairo, so seeing a car in person rarely means a long trip.
3. The deposit and the instalment are set out from the start, and a buyer chooses the pairing that suits their income before anything is signed, so nothing changes once the paperwork is done.

**Sources drawn from:** existing JSON aboutText/address and `el-emam-motors/src/content/en.ts` (`about.body`, gallery marques visible in the JSON gallery list: MG, Chery, Nissan, Opel, Kaiyi). Deliberately dropped the "fifty-one years" figure since it increments yearly and would go stale (a date-bound fact); "more than fifteen makes" and the three branches were kept since they're stable counts already used in the current JSON/source.

---

## Wheels Automotive (wheels-automotive)

**heroText:** A short, hand-inspected list of cars in the Heliopolis hall, each one carrying a full spec card so nothing about it is left to guesswork.

1. Wheels Automotive keeps a deliberately short list in Heliopolis, cars the team knows well rather than a long row with histories they don't. Marques on the floor have included Audi, Mercedes-Benz, Range Rover and BYD, chosen a handful at a time rather than stocked deep.
2. Every car is inspected by the team before it enters the hall, and each one carries a full spec card covering engine, output, rims, audio and everything fitted inside, so what's on the card is what actually stands in front of a visitor.
3. Handover happens in the Heliopolis hall itself, at 46 El-Thawra Street, rather than from a separate lock-up across town, so the car a buyer inspects is the one they drive away in.

**Sources drawn from:** existing JSON aboutText/address/gallery marques and `wheels-automotive/src/content/en.ts` (`about.body`, `services.items` — inspected before entering the hall, "handed over in the hall... not from a lock-up across town"). Deliberately excluded the Instagram-follower and posted-cars-count stats from `about.stats` (13.3K following, 700+ posted) as those are follower counts / running totals, both banned or stale-prone.

---

## Vision Auto (vision-auto)

**heroText:** A single Maadi showroom carrying six new-car marques side by side, with immediate delivery and registration handled in house.

1. Vision Auto is a new-car showroom in Maadi, keeping a single lit hall that carries Hyundai, Chery, Changan, Haval, Nissan and Fiat side by side, so visitors can compare several marques of brand-new cars under one roof rather than crossing the city.
2. The hall has a distinct identity: a rough stone wall lit from below, with cars standing against it by day and the forecourt taking over after dark when the sign lights up over the front row.
3. Cars are available for immediate delivery rather than on order, with flexible instalment plans and registration handled by the showroom, so a buyer can walk out with the paperwork largely settled.

**Sources drawn from:** existing JSON aboutText/address and `vision-auto/src/content/en.ts` (`about.body` — single lit hall, marques, cars "have not been driven"; `services.items` — instalments, immediate handover, paperwork cleared; `showroom.body` — stone wall lit from below, forecourt lit after dark). Deliberately excluded 2026/2027 model-year references and the specific "7 yrs" financing figure, since both are date-bound / numeric financing claims the writing rules ban; kept the qualitative "flexible instalment plans" instead.

---

## Khaled Aboud Automotive (khaled-aboud)

**heroText:** A New Cairo collection of luxury and exotic marques, each car catalogued down to its factory paint name, interior leather and specification.

1. Khaled Aboud Automotive is a showroom for luxury and exotic cars, with marques on the floor including BMW, Mercedes-Benz, Range Rover, Hummer, Jeep and Exeed.
2. The collection is kept inside the Auto Hub & Museum in New Cairo, a glass and concrete hall with even light down both sides, dark columns and a floor that throws just enough reflection to set a car against, at unit A204 in Maxim Mall.
3. Each car is catalogued in detail rather than simply listed, with the factory name of its exterior colour recorded alongside the interior leather, veneer, engine and wheels, so a visitor knows exactly what they are looking at before they arrive.

**Sources drawn from:** existing JSON aboutText/address/gallery marques and `khaled-aboud/src/content/en.ts` (`about.body`, `hub.body` — glass and concrete hall, even light, dark columns, reflective floor). Deliberately excluded per-car rarity/provenance claims ("1 of 10 worldwide", specific mileage/agent-guarantee status) since those describe current inventory rather than an evergreen fact about the dealership itself, and could go stale as cars sell.

---

## Phantom Auto (phantom-auto)

**heroText:** An authorized new-energy dealer on the Suez road carrying eight franchised marques alongside additional brands like BYD, Changan and DEEPAL.

1. Phantom Auto is a new-energy vehicle dealership on the Suez road, east of Cairo, authorized to sell Rox, Zeekr, IM Motors, DFSK, Geely, Baic, Fiat and Arcfox. Beyond the authorized franchises, marques including BYD, Changan and DEEPAL are also available on the floor.
2. The showroom sits at A1, Chillout Gardenia, on the Suez road, giving it a straightforward footprint for anyone travelling out from New Cairo or further along the route.
3. Cars across the lineup are consistently photographed on the same stretch of road, against the same green verge and palms, giving the whole floor a unified look whether the car on show is a compact sedan or a full-size SUV.

**Sources drawn from:** existing JSON aboutText/address (unchanged, carried straight through) and `phantom-auto/src/content/en.ts` (`hero.canvasAlt`, `about.body` — "same asphalt, same green verge, same palms, same half-hour of light"). Deliberately excluded the sponsorship event dates, the per-car spec figures (range/HP/seats), and the marketing quote in `claim`, since those are date-bound, inventory-specific, or promotional rather than evergreen dealership facts.

---

## Gallery captions

For all 9 dealers, every `gallery[]` item was reduced from `{ "image": ..., "caption": ... }` to `{ "image": ... }`. No images were added, removed or reordered.

## Validation

```
node -e "import('./lib/validate-dealer.mjs').then(async ({validateDealer}) => { const dealers = JSON.parse(await (await import('node:fs/promises')).readFile('data/dealers.json', 'utf8')); const batch = dealers.filter(d => ['one-of-one','el-basma-motors','golf-star-motors','al-ahmady-motors','el-emam-motors','wheels-automotive','vision-auto','khaled-aboud','phantom-auto'].includes(d.slug)); batch.forEach(validateDealer); console.log(batch.length + ' valid'); })"
```
Output: `9 valid`

The other 37 dealers in `data/dealers.json` were not modified.

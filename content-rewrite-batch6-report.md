# Content rewrite, batch 6 (final 9 dealers)

Scope: `data/dealers.json` only. For each dealer: `aboutText` replaced by `aboutParagraphs`
(exactly 3), new `heroText` added immediately after, and the `caption` key removed from every
`gallery[]` item. No other dealer entry was touched (verified against `HEAD` by diffing every
non-batch entry: 0 changes).

Sources read: `../<slug>/src/content/en.ts`, `media.ts`, `schema-ext.ts`
(east-gate read from `../east-gate-auto-site/`).

Validation: `9 valid`.

---

## rawas-motors — El Rawas Motors

**aboutParagraphs**

1. El Rawas Motors is an authorized distributor in Egypt for Peugeot, MG and Opel, and its published lineup also names Soueast. Cars such as the Peugeot 408 Facelift, the MG RX9, the Opel Frontera and the Soueast S08 DM give a sense of the range: family saloons, compact crossovers and larger SUVs from mainstream European and Asian marques rather than a narrow specialist selection.
2. The dealership operates four branches across Cairo, so buyers rarely have to cross the city to reach one. There is a showroom in Madinaty, another in the Fifth Settlement, one on Ramsis Street in Qasr El Nil, and one on Hoda Shaarawy Street in Downtown Cairo, with the flagship pinned on Maps for anyone making the trip.
3. Buying does not have to mean paying in full on the day. Instalment structures have been published for individual cars, the Kia Sportage among them, pairing a deposit up front with the balance spread over a fixed term. A national hotline and a Cairo landline both reach the sales side directly.

**heroText**: Beyond the marques it distributes, the floor has also carried Kia, Nissan, Smart and Kaiyi cars.

**Source facts used**: authorized-distributor marques and the Soueast addition (`ROSTER` tiers,
`en.ts` roster notes); model names per marque from `ROSTER.model`; the four branch addresses
(`contact.branchAddresses`, `PROFILE.branchIds`) and `flagshipMapsUrl`; hotline `19618` plus the
Cairo landline (`PROFILE.hotline`, `PROFILE.facebook.landline`); `SPORTAGE_PLANS` financing,
kept attached to the Kia Sportage by name and stripped of every figure.
**Deliberately excluded**: the Auto Center Point exhibition and booth (dated one-off event), the
Port Said teaser (a plan, not a place), all follower/post counts, and the deposit percentages
and term lengths.

---

## elite-auto — Elite Auto

**aboutParagraphs**

1. Elite Auto is a Class A showroom in New Cairo dealing in premium European cars. German marques dominate what it offers, with Mercedes-Benz, BMW and Audi across saloons, convertibles and SUVs, and Alfa Romeo bringing an Italian counterpoint. Both pre-owned imports and brand-new cars sit on the same floor.
2. The showroom is on El-Tesin El-Ganouby Street, beside the Dusit Thani hotel in New Cairo, and it is pinned on Maps. Cars are kept and photographed indoors, on a polished floor against a dark wall lit in gold, which is how visitors see them rather than on an open forecourt.
3. By its own description, Elite Auto is more than a showroom: it is geared toward flexible ways of buying, including trade-ins, instalments and taking a customer's existing car in exchange, with the aim of less time lost to paperwork. Individual pre-owned listings carry their own condition notes as well, such as the Alfa Romeo Stelvio Q4, described as full original body paint with all maintenance done.

**heroText**: Every car is listed with its engine capacity, power output, colour combination and country of origin, so the basics are on the table before you call.

**Source facts used**: "Class A auto showroom" and the trading/installment/exchange line from the
dealership's own published intro (`PROFILE.facebook.intro`); marque mix and German/Italian split
(`ROSTER`, `roster.originLabels`); address and Maps pin (`PROFILE.address`, `PROFILE.mapsUrl`);
showroom setting (`floor.intro`); per-car spec convention, cc/hp/colour (`ROSTER`, `roster.colors`);
Stelvio condition note (`roster.notes.stelvio`), kept named to that one car.
**Deliberately excluded**: the financing pitch figures (down-payment percentage, term in years,
24-hour approval, free insurance), Facebook's price-range indicator, follower counts, and the
one brand-new car's model year and 18-item feature checklist.

---

## east-gate-auto-site — East Gate Auto

**aboutParagraphs**

1. East Gate Auto is a luxury and multi-brand dealership in New Cairo. Mercedes-Benz makes up the bulk of what it offers, from compact saloons and coupes through to the GLB, GLC and E-Class families and AMG variants, and it also handles Range Rover and the newer ROX marque alongside them.
2. It trades from two branches, both at Chillout stations on the eastern side of Cairo: one in Al-Rehab 2 opposite Gate 20 at Building No. 4, and one in Madinaty, in the Chillout Madinaty Extension beside Gate 1. The Al-Rehab storefront is easy to recognise, with gunmetal cladding, the gold EG mark above the glass, and a candy-striped floodlight mast standing on the forecourt.
3. Every car is filed under one of three states, and the dealership keeps them strictly apart. A car is either available for reservation, meaning it is configured and ordered in rather than standing on the floor, available now as ready stock, or pre-owned. A buyer therefore knows where a given car actually stands before making the trip.

**heroText**: The team works in both Arabic and English, and a single number reaches the dealership for either branch.

**Source facts used**: self-description as a premium/multi-brand source (`PROFILE.facebook.bio`,
`igBio`); marques actually handled (`POSTED_MARQUES`, `ROSTER` models); both branch addresses
(`PROFILE.addresses.gate20`, `gate1`); storefront description, gunmetal cladding, gold EG mark and
the striped floodlight mast (`roster.notes.glc200imsa`, `mast.intro`, including its explicit
correction that the mast is a floodlight tower, not a gate arm); three readiness tiers and their
meanings (`tiers.labels`, `tiers.taglines`); languages listed as Arabic and English
(`contact.languagesNote`); single published phone number.
**Deliberately excluded**: the GLC 43 price and delivery window, model years, the highlights-vs-posts
marque gap, follower counts, and anything about which images are renders rather than photographs.

---

## bespoke-automotive — Bespoke Automotive

**aboutParagraphs**

1. Bespoke Automotive is a luxury car dealership, in its own words shaping unparalleled experience in the world of high-end automobiles. What it offers is tightly focused: German performance machinery from three marques, BMW, Porsche and Mercedes-AMG, running from M saloons and cabriolets through GT3 sports cars to AMG roadsters and SUVs.
2. It works from a single room in C-Park Mall, on South 90 Street in the Fifth Settlement, New Cairo. The room is a set piece in itself: black vertically fluted wall panels, a pale polished tile floor, an illuminated Bespoke Automotive sign, and long linear LED bars suspended at crossing angles overhead, which lay warm gold streaks down the flank of every car beneath them.
3. Cars are presented with their full specification rather than a headline figure: engine capacity and cylinder layout, power, torque, acceleration, aspiration, transmission, top speed and fuel tank capacity, and then an itemised run of interior and infotainment equipment. A bank of sales lines takes enquiries, so a caller is not queued behind one number.

**heroText**: Its cars are photographed by an outside studio, AMA Creative Studio, whose credit sits on each image beside the dealership's own mark.

**Source facts used**: the dealership's own one-line self-description (`about.body[0]`); address
(`contact.address`); the three marques and the model types behind them (`Marque`, `CARS`); the
showroom's fixed setting (`rig.body`); the standard spec block and equipment bullets
(`services.items`, `CARS[].specs`, `featureCount`); the ten-plus sales lines (`PHONES`,
`FACEBOOK_ONLY_PHONE`); photography credit (`PHOTO_STUDIO`, `studio.body`).
**Deliberately excluded**: post/frame counts, follower counts, the caption-ordering finding, the
GT3 fuel-tank discrepancy, model years, and every horsepower/torque/second figure.
Thin source noted in the brief; nothing was padded.

---

## gbr-auto — GBR Auto

**aboutParagraphs**

1. GBR Auto is a car showroom in New Cairo dealing in Mercedes-Benz and other premium marques, electric models included. It keeps its remit plain: premium cars, sold from one floor, without a long list of side businesses attached.
2. The showroom sits at District 90 Mall, on 90th Street in the North Teseen district of New Cairo, and it is pinned on Maps for anyone making the trip. It is a straightforward drive-up location rather than a unit tucked away on an industrial road.
3. The approach to buying is equally direct. There is a single sales line to call ahead on, and visitors are welcome to come and look over the cars in person before any conversation about a deal begins.

**heroText**: Its frontage stays lit after dark, with cars drawn up along the forecourt in front of the showroom entrance.

**Source facts used**: everything the thin source carries, namely the trade description
(`services.items[0]`, `hero.sub`), the mall/street address (`about.body[0]`, `contact.address`),
the single sales line (`SALES_PHONE`), the invitation to call or visit (`contact.intro`), and the
lit night frontage with cars on the forecourt (`hero.imageAlt`, `gallery.items[0].alt`).
Known-thin source: no invented detail, and the gallery stays at its two real images.

---

## el-saadany-motors — El Saadany Motors

**aboutParagraphs**

1. El Saadany Motors is a car dealer based in Alexandria, working in saloons and SUVs from established marques. Mercedes-Benz saloons, the Hyundai Tucson and the Audi Q3 are among the cars it has offered, which places it in the mainstream premium bracket rather than the exotic end of the market.
2. It trades from two shopfronts rather than one. The first sits under a dark arched fascia lettered ElSaadany Motors in a light serif, lit from above after dark. The second is a pale travertine arch carrying a black and orange board reading Trendy Motors, with an orange car silhouette cut into it. Both put a car directly under the arch, at street level, where passers-by meet it first.
3. The cars themselves are shown plainly and at close range: front and rear, from more than one angle, and the cabin through an open driver's door. A buyer sees the actual car standing on the street, in daylight, rather than a manufacturer photograph standing in for it.

**heroText**: Compact premium SUVs feature strongly in what it carries, the Audi Q3 most of all.

**Source facts used**: city (`CITY_EN`); the cars identifiable in their own frames
(`FRAMES[].car`); the two shopfront signs and their construction, dark lettered arch versus pale
travertine arch with the black-and-orange board (`SIGNS`, `frontages.body`, `arch.body`); the
Q3's prominence (`Q3_FRAMES`); how cars are shown, street level, front, rear and cabin through
the open door (the `ALT` frame descriptions).
**Deliberately excluded**: the age-restricted profile and its wording, follower counts, the
Facebook category field, and any statement about the relationship between the two names, which no
source establishes. The copy simply reports both shopfronts as the dealer's own.

---

## golden-auto — Golden Auto

**aboutParagraphs**

1. Golden Auto deals in luxury and exotic cars in Cairo. Ferrari, Lamborghini, Bentley, Mercedes-Benz, BMW and Audi have all stood on its floor, and the wider list of marques it advertises adds Rolls-Royce, Range Rover, Jaguar, Jeep and Ford.
2. Everything is sold from one room in Heliopolis, at 30 Al Andalos Street in Misr El-Gedida. The space is built for display: a circular patterned floor, columns lit from below, and the same walls behind every car, so each one is seen under identical light rather than in a yard.
3. The dealership is precise about where a car has come from and what has been done to it. It distinguishes cars imported through the marque's authorised agent in Egypt from other routes, publishes the odometer reading on pre-owned cars, and notes where the paintwork carries full body protection. Individual listings add their own terms, such as the Audi Q8 S-Line Plus, which is stated to carry a local warranty valid in Egypt.

**heroText**: Each car comes with its own specification set out in full: engine, power, torque, transmission, acceleration and wheels.

**Source facts used**: floor marques (`FLOOR_MARQUES`, `CARS`) and the dealership's own wider
advertised marque list (`ADVERTISED_MARQUES`); address (`ADDRESS_EN`); the single-room showroom,
circular patterned floor and underlit columns (`place.body`, `about.body[0]`); trade vocabulary
glossed in the source, wakeel/authorised importer, pre-owned with published odometer, full body
protection, fully loaded (`services.items`, `roster.provenanceGloss`); the local warranty, which
appears on one car only and is therefore named to the Audi Q8 S-Line Plus (`CARS.audi-q8`,
`services.items[3]`); the shared spec-row set (`CARS[].specs` labels).
**Deliberately excluded**: follower and post counts, the black-and-grey exterior finding (a
snapshot of current stock), odometer figures, model years, and the highlights-versus-floor gap.

---

## am-automotive — AM Automotive

**aboutParagraphs**

1. AM Automotive deals in used and brand-new premium cars in Cairo. Mercedes-Benz and BMW make up most of what it carries, from saloons and coupes to the X5 and X6, and Nissan and Skoda appear alongside them. The badges on its own shopfront banner add Audi, Porsche and Land Rover to the list.
2. The showroom is housed unusually: rather than taking its own street frontage, it sits inside Chillout Auto Service, a working car service centre in Heliopolis opposite the Military Academy at Gate 7. It is registered as its own place on Maps, and cars are photographed where they stand, in a building set up for mechanical work rather than for display.
3. Its listings are built around disclosure rather than atmosphere. Every car is published with its odometer reading, whatever that figure happens to be, and the notes beside it say what the car has had done: original factory paintwork with no panel resprayed, servicing carried out at the marque's authorised agent in Egypt, scheduled service up to date, or a fresh set of tyres. Three sales lines take enquiries.

**heroText**: The floor deliberately spans both ends of the market, from older, well-travelled saloons to barely run-in SUVs, with no attempt to sort them into separate lanes.

**Source facts used**: the stated remit, used and brand-new premium cars (`TAGLINE`); floor
marques and models (`CARS`) plus the shopfront banner badges (`BANNER_MARQUES`); the showroom
housed inside Chillout Auto Service opposite the Military Academy at Gate 7, and its registered
Maps place entry (`ADDRESS_EN`, `HOST_BUSINESS`, `MAPS_LINKS`, `inside.body`); cars photographed
where they stand in a service setting (`inside.body[2]`); the odometer published on every listing
(`spread.body`, `CARS[].km` present on all nine); trade claims glossed in the source, factory
paint, maintenance at the agent, service done, new tyres (`services.items`, `roster.claimGloss`);
three sales lines (`PHONES`); the wide spread of stock (`spread.body`).
**Deliberately excluded**: the one asking price, the sold banner, the "License 2 years" note
(one car only) and the "Only one in Egypt" claim (one car only, unverifiable), all odometer and
model-year figures, follower counts, and the Grand Opening highlight (a dated one-off).

---

## auto-garage — Auto Garage

**aboutParagraphs**

1. Auto Garage calls itself the home of luxury SUVs, and it deals in luxury and premium cars in New Cairo. Rolls-Royce, Range Rover, Lamborghini, Maserati, BMW, Mercedes-Benz, MINI and Chery have all passed across its forecourt, a range that runs from a V12 coupe to a full-option family SUV without changing register in between.
2. It trades from an open forecourt in New Cairo rather than a lit showroom: a sandy block wall behind the cars, hard daylight, and each car shot where it stands. The location is published as a map pin, so visitors navigate straight to the point on the ground.
3. Stock is handled by conversation rather than catalogue. The dealership does not publish a running inventory; it sends the current list of available models to anyone who messages it, which suits a forecourt where cars move quickly. Each car it does show is written up with its own specification: engine, transmission, lighting, instrument cluster, cabin trim and the options fitted.

**heroText**: Cabin trim gets as much attention here as bodywork, with interiors named down to the leather: turquoise, caraway cream and Giallo Auge yellow among them.

**Source facts used**: the dealership's own claim, "Home of Luxury SUVs" (`BIO_CLAIM`); marques and
models (`CARS`, `MARQUES`) and the breadth from a V12 Rolls-Royce coupe to a full-options Chery SUV
(`range.body`, `CARS.tiggo8.claims`); the forecourt setting, sandy block wall and daylight
(`about.body[0]`, `gallery.heading`); the published location as a coordinate/pin (`pin.body`,
`COORDS`, `MAPS_URL`); the stated stock-on-request policy (`BIO_POLICY`, `policy.body`); the
per-car spec fields (`services.items[2]`, `CARS[].lines`); interior colours named in the source
(`CARS[].interior`).
**Deliberately excluded**: post and follower counts, model years, the odometer figure on the one
car that carries it, the "only one in Egypt" Wraith claim, and the SUV-count analysis.

---

## Self-check performed before commit

Scanned all 27 new paragraphs and 9 heroText strings, programmatically, for: `follow`, `render`,
`logged`, `account`, `instagram`, `facebook`, `caption`, `post`, `bio`, `highlight`, em dash
(U+2014), Arabic script, Claude/Anthropic, four-digit years, `%`, `EGP`, `review`, `disclaim`.
One hit, "followed by" in bespoke-automotive paragraph 3, was rewritten to "and then" even though
it was ordinary prose rather than a metric, to keep the text clean against that check.

Manually re-checked the two riskier generalisation classes:

- **Single-car details never generalised**: Kia Sportage instalments (rawas), Alfa Romeo Stelvio Q4
  condition note (elite-auto), Audi Q8 S-Line Plus local warranty (golden-auto) are each named to
  the specific car. The "License 2 years" and "Only one in Egypt" claims in am-automotive were
  dropped rather than generalised. AM Automotive's "every listing publishes its odometer" is true
  of all nine listings in source, so it stands as a general claim; its repair/condition claims are
  phrased as what listings say about a car, not as a dealership-wide guarantee.
- **No social metric laundered into a trust claim**: no follower count, post count or review score
  appears in any form, reworded or otherwise.
- **No dated one-off events**: Auto Center Point exhibition, the Port Said teaser, and the Grand
  Opening highlight were all excluded.

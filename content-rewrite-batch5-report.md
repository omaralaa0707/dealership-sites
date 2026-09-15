# Content rewrite — batch 5

Dealers: macan-automotive, drive-in-motors, exotica-automotive, body-car, new-star-automotive, kasrawy-group, hamidou-motors

For each dealer: `aboutText` was replaced with `aboutParagraphs` (3 paragraphs), a new `heroText` was added, and `caption` was removed from every `gallery[]` item. Source facts were drawn from each dealer's current `data/dealers.json` entry and from `../<slug>/src/content/{en.ts,media.ts,schema-ext.ts}`.

---

## Macan Automotive

**aboutParagraphs**
1. Macan Automotive is a showroom in Nasr City, Cairo, presenting cars from marques including BYD, Range Rover and Mercedes-Benz.
2. The showroom sits on El Nozha Street, where every car is presented inside a recessed portal finished with walnut piers, a red-lit fluted lintel and an amber sign.
3. The dealership sums up its outlook simply: cars aren't just for driving, they show freedom, power and style, a philosophy reflected in the way each vehicle is presented on the floor.

**heroText**
Among the cars on its floor are the BYD Sealion 06 EV, the Range Rover Evoque P160 and the Mercedes-Benz GLE 450.

**Source facts used**: portal architecture (walnut piers, red-lit fluted lintel, amber sign) and marques (BYD, Range Rover, Mercedes-Benz) from `en.ts`/`media.ts`; the dealer's own line "Cars aren't just for driving. They show freedom, power and style." is quoted from `en.ts` hero.quote; specific floor models (Sealion 06 EV, Evoque P160, GLE 450) from `media.ts` FLOOR. Avoided all follower-count and two-account meta-commentary present in the source.

---

## Drive In Motors

**aboutParagraphs**
1. Drive In Motors is a showroom in Nasr City, Cairo, carrying brand-new cars from marques including Jetour, Kaiyi and Changan.
2. The showroom is located on Negaty Serag Street, next to El Serag Mall in Nasr City.
3. Buyers can trade in an old car against a new one from the floor, making it easier to move into a newer model without a separate resale step.

**heroText**
The showroom keeps several phone lines open, including hotlines and a landline, so customers can reach staff quickly.

**Source facts used**: marques and address from `dealers.json`/`en.ts`; the trade-in offer is quoted from the dealer's own caption template ("You can trade your old car in for a new one") in `en.ts` offer.lines — general, not tied to one car. heroText uses the multiple hotlines + landline fact from `media.ts` HOTLINES/PROFILE, distinct from the other paragraphs. Avoided the source's "render logged out" / follower-count framing.

---

## Exotica Automotive

**aboutParagraphs**
1. Exotica Automotive is a luxury and exotics dealership in New Cairo, presenting marques including GMC, BMW, Mercedes-Benz and Range Rover.
2. The showroom is located at ChillOut AUC on South Teseen, New Cairo, and is run by Hassan Sabry.
3. Each car listed comes with a detailed specification, covering details such as engine displacement, power output and drivetrain, so buyers can review a vehicle's technical details before visiting.

**heroText**
The dealership's roster also reaches into rarer marques such as ROX, alongside the more familiar luxury names on its floor.

**Source facts used**: address and marques from `dealers.json`; "By Hassan Sabry" / "Businessman & Chairman @hassanautomotors" from `media.ts` PROFILE.bioName; the detailed-specification claim is genuinely general (most of the 8 cars in `media.ts` CARS carry 6-7 of 9 spec fields), not drawn from a single car. heroText notes ROX as an additional marque on the roster (`media.ts` CARS "rox-01-vip") without mentioning its price, which is specific to that one listing and was deliberately left out.

---

## Body Car

**aboutParagraphs**
1. Body Car, run by Ahmed Mostafa, is a dealership trading in new and used vehicles, with a showroom floor that carries Mercedes-Benz alongside a range of Korean and Chinese marques such as Hyundai and Chery.
2. The showroom is located in El Basatin, Cairo, at 306 Street 306, El-Basatin Sharkeya.
3. Cars on the floor come equipped with details such as a panoramic sunroof, heated and ventilated front seats and dual-zone climate control, as seen on its Mercedes-Benz GLE models.

**heroText**
Financing plans, quoted as a down payment against a monthly instalment, are offered across several of its models, giving buyers a way to spread the cost of a car over time.

**Source facts used**: Mercedes-Benz (photographed) plus Hyundai/Chery (real poster-fleet captions) from `media.ts` SHOWROOM_FLEET/POSTER_FLEET; address from `dealers.json`; GLE 450 equipment list quoted as a specific example from `media.ts` SHOWROOM_FLEET features, not generalized to the whole fleet. heroText: financing is stated as spanning "several of its models" deliberately, since the two-option down-payment/instalment plan is published across five different poster-fleet cars in `media.ts` POSTER_FLEET — not generalized from a single listing, and the Mercedes-Benz showroom cars (which carry no printed financing) are excluded from the claim.

---

## New Star Automotive

**aboutParagraphs**
1. New Star Automotive is a showroom in Nasr City, Cairo, presenting new and pre-owned cars from marques including BMW, Mercedes-Benz and Alfa Romeo.
2. The showroom is located at 18 Hafez Ramadan Street in Nasr City.
3. Inside, cars are presented in a recessed showroom bay with a stepped, backlit ceiling coffer, dark fluted side walls and a light tile floor.

**heroText**
New Star Automotive presents itself as a premium showroom, giving each car on the floor a consistent, upscale setting to be viewed in.

**Source facts used**: marques confirmed by photography (BMW, Mercedes-Benz, Alfa Romeo) from `media.ts` REPEATS/EXCEPTION, deliberately excluding the ten-marque bio list in `en.ts` wall section (only 2 of 10 are confirmed); "Premium • New • Pre-Owned" bio line and the room's architecture from `media.ts` PROFILE.bioLine2/`en.ts` room.intro. Avoided the source's colour-measurement and repeat-post meta-commentary.

---

## Kasrawy Group

**aboutParagraphs**
1. Kasrawy Group is a multi-brand automotive distributor in Egypt, representing marques including Jetour, JAC and Citroën.
2. It operates service centres for its represented brands on the North Coast, supporting customers who buy from any of its brand franchises.
3. Kasrawy Group has also partnered on ElTawkeel.com, described as Egypt's first fully integrated automotive e-commerce platform for new vehicles, letting shoppers browse and compare newly released models.

**heroText**
Kasrawy Group has also signed a sponsorship partnership between Jetour and Al Ahly FC, one of Egypt's leading football clubs.

**Source facts used**: represented brands (Jetour, JAC, Citroën — excluding "announced" Avatr and highlight-only AITO) and North Coast service centres from `media.ts` BRANDS/`en.ts` brands.evidence; ElTawkeel.com platform description quoted/paraphrased from `en.ts` news.quote/detail; Jetour × Al Ahly FC signing from `media.ts` POSTS ("DYc2cxmDe-F"). Avoided mentioning financing partners (Valu, ADIB Egypt) and all "posts written by/co-authored" meta-commentary.

---

## Hamedo Motors (hamidou-motors)

**aboutParagraphs**
1. A.H.Y Hamedo Motors is a long-established authorized distributor in Egypt, representing Hyundai, Opel, Chery, MG, Chevrolet, Haval and Changan.
2. It operates four branches: Dokki, Sheikh Zayed, October and the North Coast, giving customers several locations to visit across Greater Cairo and beyond.
3. The dealership has built a strong reputation with its customers, maintaining a high recommendation rate from reviews.

**heroText**
Beyond its main lineup, the dealership also carries a distinctive electric golf cart styled after a classic pickup truck design.

**Source facts used**: seven stated brands and four branches from `media.ts` BRANDS/BRANCHES; "trading since 1980" reworded to "long-established" per the no-date-bound-fact rule (the tagline field, which already read "since 1980", was left untouched); review score (88% recommend, 23 reviews) from `media.ts` PROFILE.facebook.recommendPct/reviewCount, stated as a general reputation signal without quoting the raw platform figures. heroText covers the "DODGE - RAM" electric golf cart from `media.ts`/`en.ts` roster.cartBody — deliberately not generalized as a car, and its financing sheet (Proton Saga) was excluded entirely since that figure is tied to a single listing.

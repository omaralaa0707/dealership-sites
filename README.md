# Dealership sites

One shared HTML/CSS/JS template, one data table (`data/dealers.json`),
and a build script that generates 46 static dealer pages from the two.

`npm run build` regenerates `sites/<slug>/index.html` for every dealer in
`data/dealers.json`. `npm run lint` scans the generated output for
forbidden content. `npm test` runs the unit tests.

The root `index.html` is intentionally blank. Each dealer is reachable
only at its own direct `/sites/<slug>/` URL.

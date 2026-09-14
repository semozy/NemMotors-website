# NEM Motors

## Structuur

```text
public/
  images/
    cars/
    services/
    logo/
  favicon.ico
src/
  app/
    aanbod/
      [id]/page.jsx
      page.jsx
    diensten/page.jsx
    over-ons/page.jsx
    contact/page.jsx
    layout.jsx
    page.jsx
    globals.css
  components/
    layout/
      Header.jsx
      Navbar.jsx
      Footer.jsx
    cars/
      CarCard.jsx
      CarList.jsx
      CarFilter.jsx
      CarGallery.jsx
    home/
      Hero.jsx
      FeaturedCars.jsx
      ServicesSection.jsx
    ui/
      Button.jsx
      Input.jsx
      Container.jsx
  data/
    cars.js
  lib/
    cars.js
    utils.js
  constants/
    navigation.js
.env.local
.gitignore
eslint.config.mjs
jsconfig.json
next.config.mjs
package.json
README.md
```

## Waar wijzig je iets?

- Homepagina en eigen secties: `src/app/page.jsx`.
- Hero en diensten: `src/components/home/`.
- Algemene opmaak en metadata: `src/app/layout.jsx`.
- Header, menu en footer: `src/components/layout/`.
- Bedrijfsgegevens: de constante `siteGegevens` in `src/components/layout/Footer.jsx`.
- Navigatielinks: `src/constants/navigation.js`.
- Voertuiggegevens: `src/data/cars.js`; ophalen via `src/lib/cars.js`.
- Algemene styling: `src/app/globals.css`.

De bestaande homepagina blijft behouden. Contact, diensten en over ons hebben een basispagina.
Het aanbod is leeg en onbekende auto-ID?s tonen een 404. De zoekbalk is nog uitgeschakeld.
Formulieren, database en verdere functionaliteit worden ??n voor ??n ge?mplementeerd.
De bestaande contactgegevens en reviews moeten voor publicatie worden gecontroleerd.

## Lokaal starten

1. Installeer dependencies: `npm install --package-lock=false`.
2. Stel eventueel `NEXT_PUBLIC_SITE_URL=https://nemmotors.be` in `.env.local` in.
3. Start met `npm run dev`.
4. Controleer wijzigingen met `npm run check` (ESLint en productiebuild).

`.env.local` blijft buiten Git. PostCSS en Tailwind worden via `package.json` geconfigureerd.
Er zijn daarom geen losse PostCSS- of Tailwind-configuratiebestanden.

De mappen `.git`, `node_modules`, `.next` en `.next-dev` zijn beheer- of gegenereerde mappen,
geen bronbestanden. Next.js kan tijdens `next dev` automatisch `AGENTS.md` en `CLAUDE.md`
aanmaken. Lege afbeeldingsmappen worden niet door Git bewaard.

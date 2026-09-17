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

## Wagenaanbod met Supabase

Zonder Supabase-configuratie gebruikt de website `src/data/cars.js` als lokale ontwikkelfallback.
Zodra de drie Supabase-variabelen zijn ingesteld, wordt het publieke aanbod uit PostgreSQL en
Supabase Storage gelezen.

1. Maak een Supabase-project aan.
2. Pas alle migraties in `supabase/migrations` op volgorde toe via de Supabase CLI.
3. Kopieer `.env.example` naar `.env.local` en vul de Supabase URL, publishable key en secret key in.
4. Herstart de ontwikkelserver.

Publiek lezen gebruikt uitsluitend de publishable key en RLS. Schrijfbewerkingen lopen via beveiligde serverroutes,
gebruiken de secret key uitsluitend op de server en vereisen een geldige beheeraccount. De oudere
`NEXT_PUBLIC_SUPABASE_ANON_KEY` en `SUPABASE_SERVICE_ROLE_KEY` blijven als tijdelijke fallback ondersteund.

- `GET /api/admin/vehicles`: alle wagens voor beheer ophalen.
- `POST /api/admin/vehicles`: wagen toevoegen.
- `PATCH /api/admin/vehicles/:id`: wagen, prijs, kenmerken of status aanpassen.
- `DELETE /api/admin/vehicles/:id`: wagen en gekoppelde afbeeldingen verwijderen.
- `POST /api/admin/vehicles/:id/images`: afbeelding als multipart uploaden (`file`, optioneel `position` en `altText`).
- `DELETE /api/admin/vehicles/:id/images/:imageId`: afbeelding verwijderen.

Gebruik voor `status`: `concept`, `beschikbaar`, `gereserveerd` of `verkocht`. Conceptwagens zijn
door RLS nooit publiek zichtbaar.

### Beheerdashboard

Open `/beheer/login` en log in met een actieve Supabase Auth-beheeraccount. Na een correcte login
wordt een HttpOnly, SameSite Strict sessie van maximaal één uur geplaatst. Het toegangstoken wordt
niet in localStorage of browser-JavaScript bewaard. Via `/beheer/wagens` kunt u voertuigen toevoegen,
aanpassen, verwijderen, publiceren en maximaal vijftien foto's uploaden. Na vijf mislukte pogingen
wordt de combinatie van account en client gedurende vijftien minuten geblokkeerd. Deze blokkering
wordt centraal in PostgreSQL bijgehouden en blijft daardoor actief na een serverherstart.

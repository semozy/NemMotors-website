<<<<<<< HEAD
# NEM Motors Website

Professionele Next.js website voor NEM Motors, met aanbodpagina's, voertuigdetails, FAQ, reviews en contactformulieren.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check
```

## Contactformulieren

De formulieren versturen e-mail via Resend. Maak voor lokale ontwikkeling een `.env.local` met:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=NEM Motors <website@uw-geverifieerd-domein.be>
CONTACT_TO_EMAIL=info@nemmotors.be
NEXT_PUBLIC_SITE_URL=https://nemmotors.be
```

`CONTACT_FROM_EMAIL` moet bij Resend als afzender zijn geverifieerd. Zonder deze configuratie toont het formulier een duidelijke melding en wordt geen ontvangst gesimuleerd.

## Projectstructuur

```text
src/
  app/
    page.tsx
    HomePage.tsx
    voorraad/
      page.tsx
      VoorraadPage.tsx
      [slug]/
        page.tsx
        AutoDetailPage.tsx
    over-ons/
      page.tsx
      OverOnsPage.tsx
    contact/
      page.tsx
      ContactPage.tsx
    ...                     Overige bestaande pagina's op dezelfde manier
    api/contact/route.ts    Contactendpoint
  components/               Gedeelde React-componenten, zoals Header en AutoKaart
  lib/                      Voorraadgegevens, sitegegevens en hulpfuncties
  types/
    auto.ts                 Voertuigtypes
    inhoud.ts               Types voor FAQ, reviews en diensten
public/
  logo/nemmotors.png
  favicon.svg
```

Elke publieke pagina heeft een kleine `page.tsx` die de benoemde paginacomponent en eventuele metadata exporteert. De pagina-inhoud staat ernaast, bijvoorbeeld in `ContactPage.tsx`. Gedeelde componenten staan rechtstreeks in `components` en gebruiken PascalCase met Nederlandse namen. De verplichte Next.js-bestanden zoals `layout.tsx`, `error.tsx`, `sitemap.ts` en `route.ts` behouden hun frameworknaam.

De voorraad staat op `/voorraad` en voertuigdetails op `/voorraad/[slug]`. Oude `/aanbod`-links worden permanent doorgestuurd. Interne links, canonieke URL's en de sitemap gebruiken de nieuwe routes.

Veelvoorkomende wijzigingen:

- Bedrijfsgegevens: `src/lib/site.ts`.
- Voorraad: `src/lib/autos.ts`.
- Navigatie: `src/components/Header.tsx`.
- Formulieren: `src/components/ContactFormulier.tsx` en `AutoVerkoopFormulier.tsx`.
- Voertuigselectie: `src/lib/useAutoSelectie.ts`.

Dit project gebruikt momenteel vaste gegevens en e-mailformulieren. Er is geen adminportaal, Prisma-database of apart afsprakenbeheer. Diensten worden op de homepage getoond. Nieuwe functies krijgen pas bestanden wanneer ze worden gebouwd.

Configuratiebestanden blijven in de projectroot. `node_modules`, `.next` en `.next-dev` worden automatisch gegenereerd en staan buiten Git.
=======
# NemMotors-website
Website voor auto garage Nem Motors
>>>>>>> 247133e8843cf3ad0f4e740b02b65808238e354d

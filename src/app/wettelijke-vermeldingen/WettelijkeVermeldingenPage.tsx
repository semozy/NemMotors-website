import JuridischePagina from "@/components/JuridischePagina";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Wettelijke vermeldingen" };

export default function WettelijkeVermeldingenPage() {
  return <JuridischePagina title="Wettelijke vermeldingen" intro="Identificatie- en contactgegevens van NEM Motors.">
    <section><h2>Onderneming</h2><p><strong>{siteConfig.name}</strong><br />{siteConfig.address}<br /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br /><a href={`tel:${siteConfig.phoneNumber.replace(/\s/g, "")}`}>{siteConfig.phoneNumber}</a></p></section>
    <section><h2>Ondernemingsgegevens</h2>{siteConfig.enterpriseNumber && siteConfig.vatNumber ? <p>Ondernemingsnummer: {siteConfig.enterpriseNumber}<br />Btw-nummer: {siteConfig.vatNumber}</p> : <p>Het ondernemingsnummer en btw-nummer moeten vóór publicatie door de beheerder worden ingevuld.</p>}</section>
    <section><h2>Inhoud</h2><p>Wij stellen de informatie op deze website zorgvuldig samen. Beschikbaarheid, uitrusting en voertuiggegevens worden bij een concrete aanvraag of overeenkomst opnieuw bevestigd.</p></section>
  </JuridischePagina>;
}

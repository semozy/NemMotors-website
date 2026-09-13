import JuridischePagina from "@/components/JuridischePagina";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Verkoopvoorwaarden" };

export default function VoorwaardenPage() {
  return <JuridischePagina title="Verkoopvoorwaarden" intro="De definitieve voorwaarden worden bij ieder voertuig en vóór ondertekening duidelijk meegedeeld.">
    <section><h2>Aanbod en prijs</h2><p>Een online voertuigpresentatie is informatief. Beschikbaarheid, uitrusting, kilometerstand, prijs en inbegrepen diensten worden bevestigd in het concrete aanbod en de verkoopovereenkomst.</p></section>
    <section><h2>Garantie en levering</h2><p>De toepasselijke wettelijke garantie en eventuele commerciële garantie worden per voertuig schriftelijk toegelicht. Levering vindt plaats volgens de afspraken in de ondertekende overeenkomst.</p></section>
    <section><h2>Reservering en betaling</h2><p>Een voertuig is pas gereserveerd wanneer beide partijen dit uitdrukkelijk bevestigen en de afgesproken voorwaarden zijn vervuld. Betaal nooit op basis van uitsluitend een bericht; controleer betaalgegevens rechtstreeks via {siteConfig.phoneNumber}.</p></section>
    <section><h2>Klachten</h2><p>Neem bij een vraag of klacht eerst contact op via <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Wij zoeken samen naar een duidelijke en passende oplossing.</p></section>
  </JuridischePagina>;
}

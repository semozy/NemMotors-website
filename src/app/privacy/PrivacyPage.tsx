import JuridischePagina from "@/components/JuridischePagina";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Privacybeleid", description: `Hoe ${siteConfig.name} persoonsgegevens verwerkt.` };

export default function PrivacyPage() {
  return <JuridischePagina title="Privacybeleid" intro="Hier leest u welke persoonsgegevens wij verwerken wanneer u contact met ons opneemt.">
    <section><h2>Verantwoordelijke</h2><p>{siteConfig.name}, gevestigd te {siteConfig.address}, is verantwoordelijk voor de verwerking. Vragen kunt u sturen naar <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></section>
    <section><h2>Welke gegevens en waarom?</h2><p>Wanneer u een contact-, proefrit- of waardebepalingsaanvraag verstuurt, verwerken wij uw naam, contactgegevens, bericht, voertuiggegevens en vrijwillig toegevoegde foto&apos;s. Wij gebruiken die gegevens uitsluitend om uw aanvraag te beantwoorden, een afspraak te plannen en waar nodig aan wettelijke verplichtingen te voldoen.</p></section>
    <section><h2>Grondslag en bewaartermijn</h2><p>Wij verwerken aanvragen om vóór een mogelijke overeenkomst op uw verzoek stappen te nemen en op basis van ons gerechtvaardigd belang om vragen te beantwoorden. We bewaren gegevens niet langer dan nodig voor de aanvraag en de toepasselijke wettelijke bewaartermijnen.</p></section>
    <section><h2>Delen en beveiliging</h2><p>Wij delen gegevens alleen met dienstverleners die nodig zijn voor hosting en e-mailbezorging, of wanneer de wet dit vereist. We nemen passende technische en organisatorische maatregelen om gegevens te beschermen.</p></section>
    <section><h2>Uw rechten</h2><p>U kunt vragen om inzage, correctie, verwijdering, beperking of overdracht van uw gegevens en in toepasselijke gevallen bezwaar maken. Neem daarvoor contact op via {siteConfig.email}. U kunt ook een klacht indienen bij de Gegevensbeschermingsautoriteit.</p></section>
  </JuridischePagina>;
}

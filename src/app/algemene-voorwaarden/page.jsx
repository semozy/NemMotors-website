import { siteGegevens } from "@/components/layout/Footer";

export const metadata = {
  title: "Algemene Voorwaarden | NEM Motors",
  description: "Lees de uitgebreide algemene voorwaarden van NEM Motors. Transparante afspraken over onze diensten, voertuigen, garanties en websitegebruik.",
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="bg-[#fafaf9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-[800px] px-5 sm:px-8 lg:px-12">
        <header className="mb-12 border-b border-neutral-200 pb-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Algemene Voorwaarden</h1>
          <p className="mt-4 text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}
          </p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-7 prose-p:text-neutral-600 prose-li:text-sm prose-li:text-neutral-600 prose-a:font-semibold prose-a:text-black">
          <p className="text-base font-medium leading-relaxed text-neutral-800">
            Welkom bij <strong>{siteGegevens.name}</strong>. Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, diensten, producten en online activiteiten via onze website. Wij raden u aan deze voorwaarden zorgvuldig door te lezen, zodat u precies weet waar u aan toe bent.
          </p>

          <h2>1. Bedrijfsgegevens</h2>
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm text-sm">
            <strong>Maatschappelijke benaming:</strong> {siteGegevens.name}<br />
            <strong>Adres / Vestiging:</strong> {siteGegevens.address}<br />
            <strong>Ondernemingsnummer (BTW):</strong> {siteGegevens.vatNumber || "In aanvraag"}<br />
            <br />
            <strong>Telefoon:</strong> <a href={`tel:${siteGegevens.phoneNumber}`}>{siteGegevens.phoneNumber}</a><br />
            <strong>E-mailadres:</strong> <a href={`mailto:${siteGegevens.email}`}>{siteGegevens.email}</a>
          </div>

          <h2>2. Toepasselijkheid</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op ieder bezoek aan de website van {siteGegevens.name}, op alle online aanvragen en op alle (latere) overeenkomsten die voortvloeien uit contact dat is gestart via dit platform. Afwijkingen op deze voorwaarden zijn enkel geldig indien deze vooraf uitdrukkelijk en schriftelijk zijn overeengekomen.
          </p>

          <h2>3. Ons online aanbod en specificaties</h2>
          <p>
            Wij besteden de grootst mogelijke zorg aan de creatie en het onderhoud van onze online showroom. Foto's, kilometerstanden, bouwjaren, specificaties en optielijsten worden zorgvuldig samengesteld. Echter:
          </p>
          <ul>
            <li>Het online aanbod is louter informatief en vormt <strong>geen bindend aanbod</strong>. Fouten of kennelijke vergissingen in de weergave van een voertuig (zoals een onjuiste prijs of ontbrekende optie) binden {siteGegevens.name} op geen enkele manier.</li>
            <li>De werkelijke staat van het voertuig, inclusief eventuele zichtbare of onzichtbare gebruikssporen passend bij een tweedehandswagen, kan enkel fysiek in onze showroom 100% worden geverifieerd.</li>
            <li>Wij behouden ons het recht voor om zonder voorafgaande waarschuwing de prijzen, uitrustingen of specificaties van het aanbod te wijzigen, of voertuigen van de website te verwijderen indien deze verkocht zijn.</li>
          </ul>

          <h2>4. Reserveringen en aankoop</h2>
          <p>
            Het invullen van een formulier (zoals een verzoek om informatie of een proefrit) op onze website creëert <strong>geen definitieve reservering of verkoopovereenkomst</strong>. 
          </p>
          <ul>
            <li>Een reservering of de daadwerkelijke verkoop van een wagen komt pas formeel en juridisch tot stand op het moment dat er een fysieke, schriftelijke verkoopovereenkomst wordt opgesteld en door beide partijen (verkoper en koper) wordt ondertekend.</li>
            <li>Indien een voorschot wordt overeengekomen, wordt de wagen pas definitief gereserveerd op het moment dat het overeengekomen voorschotbedrag effectief op de rekening van {siteGegevens.name} is ontvangen, tenzij schriftelijk anders afgesproken.</li>
          </ul>

          <h2>5. Inruil en overname van uw huidige wagen</h2>
          <p>
            Via de website kunt u een richtprijs of overnamevoorstel aanvragen voor uw huidige voertuig. Dit gebeurt op basis van de gegevens en foto's die u digitaal aan ons bezorgt.
          </p>
          <p>
            Elke schatting of richtprijs is louter indicatief. Een definitieve overname- of inruilwaarde kan door ons uitsluitend worden vastgesteld en gegarandeerd <strong>na een grondige, fysieke expertise</strong> van het voertuig op de locatie van {siteGegevens.name}. Eventuele verborgen gebreken, technische mankementen of schade die niet vermeld werden in de online aanvraag, zullen leiden tot een herziening van de overnameprijs.
          </p>

          <h2>6. Garantie (Tweedehandswagens)</h2>
          <p>
            Op alle tweedehandswagens die door {siteGegevens.name} worden verkocht aan particuliere kopers (consumenten) rust een <strong>wettelijke garantie van minimaal 1 jaar</strong>, tenzij op de factuur of in het contract uitdrukkelijk een langere termijn (of fabrieksgarantie) is overeengekomen.
          </p>
          <p>De garantie dekt uitsluitend technische defecten die reeds in de kiem aanwezig waren bij aankoop. Uitsluitingen van garantie zijn onder andere:</p>
          <ul>
            <li>Normale slijtageonderdelen (zoals banden, remblokken, ruitenwissers en batterijen).</li>
            <li>Schade veroorzaakt door verkeerd gebruik, ongeval, nalatig onderhoud of herstellingen uitgevoerd door een niet-erkende derde partij zonder voorafgaande toestemming van {siteGegevens.name}.</li>
          </ul>
          <p>Voor verkopen aan zakelijke klanten (B2B/professionals) wordt het voertuig doorgaans verkocht in de staat waarin het zich bevindt, zonder garantie, tenzij schriftelijk anders afgesproken.</p>

          <h2>7. Prijzen en betalingsvoorwaarden</h2>
          <p>
            Alle vermelde prijzen op de website zijn in Euro (€) en inclusief 21% BTW, tenzij expliciet vermeld staat dat het om een 'marge-auto' of exclusief BTW gaat (bijvoorbeeld bij specifieke lichte vrachtwagens). 
          </p>
          <p>
            Bij aankoop dient het volledige openstaande factuurbedrag te zijn overgeschreven en zichtbaar te zijn op onze bankrekening alvorens het voertuig wordt overgedragen en de officiële documenten (zoals het inschrijvingsbewijs) worden overhandigd. Wij accepteren geen grote contante bedragen die de wettelijke limieten (anti-witwaswetgeving) overschrijden.
          </p>

          <h2>8. Aansprakelijkheid websitegebruik</h2>
          <p>
            {siteGegevens.name} stelt alles in het werk om de website toegankelijk, veilig en virusvrij te houden. Desondanks kunnen wij niet aansprakelijk worden gesteld voor eventuele schade (zowel direct als indirect) die voortvloeit uit:
          </p>
          <ul>
            <li>Het gebruik van onze website, inclusief mogelijke foutmeldingen of tijdelijke onbeschikbaarheid.</li>
            <li>Het openen van externe links op onze website (bijvoorbeeld de link naar Google Maps).</li>
            <li>Acties die de gebruiker onderneemt louter op basis van de informatie op deze website.</li>
          </ul>

          <h2>9. Intellectuele eigendom</h2>
          <p>
            Alle inhoud op deze website, inclusief maar niet beperkt tot logo's, teksten, voertuigfoto's, huisstijl en lay-out, is eigendom van {siteGegevens.name} of haar respectievelijke partners. Het is ten strengste verboden om (delen van) deze website te kopiëren, te reproduceren of voor commerciële doeleinden te gebruiken zonder voorafgaande schriftelijke toestemming van de directie.
          </p>

          <h2>10. Toepasselijk recht en bevoegde rechtbank</h2>
          <p>
            Op al onze aanbiedingen, overeenkomsten en op het gebruik van deze website is uitsluitend het Belgisch recht van toepassing. Eventuele geschillen, van welke aard dan ook, behoren tot de exclusieve bevoegdheid van de rechtbanken van het arrondissement waar de maatschappelijke zetel van {siteGegevens.name} is gevestigd, tenzij dwingende wetsbepalingen (bijv. consumentenbescherming) een andere rechtbank aanwijzen.
          </p>
        </div>
      </div>
    </main>
  );
}

import { siteGegevens } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacybeleid | NEM Motors",
  description: "Uitgebreid privacybeleid van NEM Motors. Lees hoe wij zorgvuldig, transparant en veilig omgaan met uw persoonsgegevens conform de AVG/GDPR wetgeving.",
};

export default function PrivacybeleidPage() {
  return (
    <main className="bg-[#fafaf9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-[800px] px-5 sm:px-8 lg:px-12">
        <header className="mb-12 border-b border-neutral-200 pb-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Privacyverklaring</h1>
          <p className="mt-4 text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}
          </p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-7 prose-p:text-neutral-600 prose-li:text-sm prose-li:text-neutral-600 prose-a:font-semibold prose-a:text-black">
          <p className="text-base font-medium leading-relaxed text-neutral-800">
            Bij <strong>{siteGegevens.name}</strong> dragen we privacy en de bescherming van uw persoonsgegevens hoog in het vaandel. We willen volledig transparant zijn over welke gegevens we verzamelen, waarom we dat doen, hoe we deze beschermen en welke rechten u heeft.
          </p>
          <p>
            Dit privacybeleid is van toepassing op alle diensten, producten en activiteiten van {siteGegevens.name}, inclusief uw bezoek aan onze website en het gebruik van onze online contact- en aanvraagformulieren. Wij verwerken uw persoonsgegevens in overeenstemming met de Europese Algemene Verordening Gegevensbescherming (AVG/GDPR).
          </p>

          <h2>1. Verwerkingsverantwoordelijke</h2>
          <p>
            De verantwoordelijke voor de verwerking van uw persoonsgegevens (zoals gedefinieerd in de privacywetgeving) is:
          </p>
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm text-sm">
            <strong>{siteGegevens.name}</strong><br />
            {siteGegevens.address}<br />
            <br />
            <strong>Telefoon:</strong> <a href={`tel:${siteGegevens.phoneNumber}`}>{siteGegevens.phoneNumber}</a><br />
            <strong>E-mailadres:</strong> <a href={`mailto:${siteGegevens.email}`}>{siteGegevens.email}</a>
          </div>

          <h2>2. Welke persoonsgegevens verzamelen wij?</h2>
          <p>Wij verzamelen en verwerken enkel de persoonsgegevens die strikt noodzakelijk zijn voor de uitvoering van onze diensten. Dit omvat onder andere:</p>
          <ul>
            <li><strong>Identificatie- en contactgegevens:</strong> Uw voornaam, achternaam, e-mailadres, telefoonnummer en eventueel uw bedrijfsnaam wanneer u een contactformulier, interesse-aanvraag of proefrit aanvraagt.</li>
            <li><strong>Voertuiggegevens:</strong> Informatie over uw huidige voertuig (merk, model, bouwjaar, kilometerstand, vraagprijs) wanneer u een inruil- of overnamevoorstel aanvraagt via het formulier "Auto Verkopen".</li>
            <li><strong>Communicatiegegevens:</strong> De inhoud van de berichten, vragen of opmerkingen die u aan ons richt via e-mail of de webformulieren.</li>
            <li><strong>Technische gegevens:</strong> Informatie over uw apparaat en browser (zoals IP-adres, besturingssysteem, browsertype) om de veiligheid en werking van onze website te garanderen (essentiële loggegevens).</li>
          </ul>

          <h2>3. Voor welke doeleinden gebruiken wij uw gegevens?</h2>
          <p>Uw gegevens worden uitsluitend verzameld en verwerkt voor specifieke, uitdrukkelijk omschreven en gerechtvaardigde doeleinden:</p>
          <ul>
            <li><strong>Klantenservice en communicatie:</strong> Om uw vragen of verzoeken via het contactformulier adequaat te kunnen beantwoorden en verdere opvolging te bieden.</li>
            <li><strong>Dienstverlening en verkoop:</strong> Om afspraken voor proefritten of bezichtigingen in te plannen, uw aanvragen voor een specifieke wagen te verwerken en offertes of inruilvoorstellen te kunnen opmaken.</li>
            <li><strong>Administratieve en wettelijke verplichtingen:</strong> Voor het opstellen van verkoopovereenkomsten, facturatie, garantie-afhandeling en om te voldoen aan fiscale wet- en regelgeving.</li>
            <li><strong>Website-optimalisatie en beveiliging:</strong> Om misbruik, fraude of spam te detecteren (bijv. via onzichtbare 'honeypot'-velden in formulieren) en ter verbetering van de werking van onze website.</li>
          </ul>

          <h2>4. Wat is de wettelijke basis voor deze verwerking?</h2>
          <p>Wij baseren ons voor de verwerking van uw gegevens op de volgende rechtsgronden zoals omschreven in de AVG/GDPR:</p>
          <ul>
            <li><strong>Uitvoering van een overeenkomst:</strong> Gegevensverwerking die nodig is om voorbereidende stappen te nemen voor een aankoop, verkoop of proefrit op uw verzoek.</li>
            <li><strong>Gerechtvaardigd belang:</strong> Voor het beveiligen van onze website, het voorkomen van fraude en het onderhouden van klantrelaties.</li>
            <li><strong>Wettelijke verplichting:</strong> Om te voldoen aan administratieve en fiscale bewaarplichten na een verkoop of aankoop.</li>
            <li><strong>Toestemming:</strong> Voor specifieke gevallen (zoals het ontvangen van marketingcommunicatie, indien wij dit aanbieden) zullen wij voorafgaand uw expliciete toestemming vragen. U kunt deze te allen tijde weer intrekken.</li>
          </ul>

          <h2>5. Hoelang bewaren wij uw gegevens?</h2>
          <p>
            Wij bewaren uw persoonsgegevens niet langer dan strikt noodzakelijk is om de doelen te realiseren waarvoor uw gegevens worden verzameld, of om te voldoen aan wettelijke verplichtingen:
          </p>
          <ul>
            <li><strong>Aanvragen (proefritten, contact, interesse):</strong> Gegevens gerelateerd aan vragen of aanvragen die niet leiden tot een transactie worden maximaal 12 maanden na het laatste contact bewaard om eventuele latere communicatie te faciliteren.</li>
            <li><strong>Klanten en facturatie:</strong> Gegevens gerelateerd aan een daadwerkelijke aan- of verkoop worden minimaal 7 jaar bewaard ter voldoening aan de wettelijke boekhoudkundige en fiscale verplichtingen.</li>
          </ul>

          <h2>6. Delen van persoonsgegevens met derden</h2>
          <p>
            <strong>Wij verkopen of verhuren uw persoonsgegevens onder geen enkele voorwaarde aan derden.</strong> Uw gegevens worden uitsluitend gedeeld met zorgvuldig geselecteerde verwerkers indien dit noodzakelijk is voor onze dienstverlening. Denk hierbij aan:
          </p>
          <ul>
            <li>Onze IT-dienstverleners en website hostingpartners (voor het veilig opslaan van websitegegevens en formulieren in onze databases).</li>
            <li>Overheidsinstanties en toezichthouders, uitsluitend wanneer daartoe een dwingende wettelijke verplichting bestaat.</li>
          </ul>
          <p>Met partijen die in onze opdracht uw gegevens verwerken, sluiten wij verwerkersovereenkomsten om eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens te garanderen.</p>

          <h2>7. Beveiliging van uw persoonsgegevens</h2>
          <p>
            Wij nemen de bescherming van uw gegevens uiterst serieus en nemen passende fysieke, technische en organisatorische maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Enkele van onze beveiligingsmaatregelen zijn:
          </p>
          <ul>
            <li>Volledige versleuteling van websiteverkeer via een beveiligde SSL/TLS-verbinding (HTTPS).</li>
            <li>Beperkte toegang tot onze databases (enkel bevoegd personeel heeft toegang op basis van het "need-to-know" principe).</li>
            <li>Gebruik van anti-spam en anti-bot technologieën op al onze webformulieren ter voorkoming van kwaadaardig verkeer.</li>
          </ul>

          <h2>8. Uw rechten omtrent uw gegevens</h2>
          <p>Onder de AVG/GDPR wetgeving heeft u uitgebreide rechten over de verwerking van uw persoonsgegevens:</p>
          <ul>
            <li><strong>Recht op inzage:</strong> U heeft het recht om de persoonsgegevens die wij van u verwerken in te zien.</li>
            <li><strong>Recht op rectificatie:</strong> Indien uw gegevens onjuist of onvolledig zijn, kunt u ons vragen deze aan te passen of aan te vullen.</li>
            <li><strong>Recht op gegevenswissing ("right to be forgotten"):</strong> U kunt ons in bepaalde gevallen verzoeken om uw gegevens te verwijderen.</li>
            <li><strong>Recht op beperking van de verwerking:</strong> U kunt vragen om de verwerking van uw gegevens tijdelijk stil te leggen.</li>
            <li><strong>Recht op overdraagbaarheid (dataportabiliteit):</strong> U kunt ons vragen uw digitale gegevens in een leesbaar formaat aan u of een derde partij over te dragen.</li>
            <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen de verwerking van uw gegevens op basis van onze gerechtvaardigde belangen.</li>
          </ul>
          <p>
            Wilt u gebruik maken van een van deze rechten? Stuur dan een e-mail naar <strong>{siteGegevens.email}</strong>. Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan, kunnen wij u vragen om een kopie van uw identiteitsbewijs mee te sturen (waarbij u uw pasfoto en rijksregisternummer onleesbaar mag maken ter bescherming van uw privacy). We reageren zo snel mogelijk, maar uiterlijk binnen 30 dagen, op uw verzoek.
          </p>

          <h2>9. Klachten en toezichthouder</h2>
          <p>
            Heeft u een klacht over de manier waarop wij met uw gegevens omgaan? Dan helpen wij u uiteraard graag persoonlijk verder. Daarnaast wijzen wij u op uw recht om een klacht in te dienen bij de nationale toezichthouder. Voor België is dit de Gegevensbeschermingsautoriteit (GBA):
          </p>
          <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
            <strong>Gegevensbeschermingsautoriteit</strong><br />
            Drukpersstraat 35, 1000 Brussel<br />
            Tel: +32 (0)2 274 48 00<br />
            E-mail: contact@apd-gba.be<br />
            Website: <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">www.gegevensbeschermingsautoriteit.be</a>
          </div>

          <h2>10. Wijzigingen in deze privacyverklaring</h2>
          <p>
            Wij behouden ons het recht voor om dit privacybeleid te allen tijde te wijzigen. Dit kan nodig zijn wanneer we nieuwe diensten toevoegen of wanneer de wetgeving verandert. We raden u daarom aan deze pagina regelmatig te raadplegen om op de hoogte te blijven van eventuele wijzigingen. De datum van de laatste wijziging staat altijd bovenaan dit document.
          </p>
        </div>
      </div>
    </main>
  );
}

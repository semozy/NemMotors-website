import { siteGegevens } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacybeleid",
  description: "Lees hoe NEM Motors omgaat met uw persoonlijke gegevens.",
};

export default function PrivacybeleidPage() {
  return (
    <main className="bg-[#f8f9f9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-7 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Privacybeleid</h1>
        <p className="mt-2 text-sm text-neutral-500">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}</p>
        
        <div className="prose prose-sm mt-10 max-w-none text-neutral-700 prose-headings:font-black prose-headings:text-neutral-950 prose-a:text-neutral-950">
          <h2>1. Verwerkingsverantwoordelijke</h2>
          <p>
            {siteGegevens.name} is de verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verzameld.<br />
            <strong>Adres:</strong> {siteGegevens.address}<br />
            <strong>E-mail:</strong> <a href={`mailto:${siteGegevens.email}`}>{siteGegevens.email}</a><br />
            <strong>Telefoon:</strong> {siteGegevens.phoneNumber}
          </p>

          <h2>2. Welke gegevens verzamelen wij?</h2>
          <p>Wij verzamelen enkel de gegevens die u vrijwillig aan ons verstrekt via onze contact-, proefrit- of verkoopformulieren, zoals:</p>
          <ul>
            <li>Naam, e-mailadres en telefoonnummer.</li>
            <li>Voorkeursdata voor afspraken en gegevens van inruilwagens.</li>
            <li>Berichten en opmerkingen die u met ons deelt.</li>
          </ul>

          <h2>3. Doeleinden van de verwerking</h2>
          <p>Uw gegevens worden uitsluitend gebruikt om:</p>
          <ul>
            <li>Uw vragen of verzoeken via het contactformulier te beantwoorden.</li>
            <li>Proefritten in te plannen en te bevestigen.</li>
            <li>Een voorstel te maken voor uw inruilwagen.</li>
          </ul>

          <h2>4. Delen met derden</h2>
          <p>Wij verkopen uw persoonsgegevens nooit aan derden. Gegevens worden alleen gedeeld indien dit nodig is voor de uitvoering van onze dienstverlening of om te voldoen aan een wettelijke verplichting.</p>

          <h2>5. Uw rechten (AVG/GDPR)</h2>
          <p>U heeft te allen tijde het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact met ons op via {siteGegevens.email}.</p>
        </div>
      </div>
    </main>
  );
}


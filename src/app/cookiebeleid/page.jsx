import { CookieSettingsButton } from "@/components/privacy/CookieConsent";
import { siteGegevens } from "@/components/layout/Footer";

export const metadata = {
  title: "Cookiebeleid | NEM Motors",
  description: "Uitgebreid cookiebeleid van NEM Motors. Ontdek welke cookies wij gebruiken, waarom wij dit doen en hoe u zelf de controle over uw gegevens behoudt.",
};

export default function CookiebeleidPage() {
  return (
    <main className="bg-[#fafaf9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-[800px] px-5 sm:px-8 lg:px-12">
        <header className="mb-12 border-b border-neutral-200 pb-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Cookiebeleid</h1>
          <p className="mt-4 text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}
          </p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-7 prose-p:text-neutral-600 prose-li:text-sm prose-li:text-neutral-600 prose-a:font-semibold prose-a:text-black">
          <p className="text-base font-medium leading-relaxed text-neutral-800">
            Bij <strong>{siteGegevens.name}</strong> vinden we transparantie belangrijk. Daarom leggen we in dit cookiebeleid graag tot in detail uit wat cookies zijn, welke technologieën wij op deze website gebruiken en hoe u als bezoeker de volledige controle over uw privacy behoudt.
          </p>
          <p>
            Dit beleid is opgesteld in overeenstemming met de Belgische telecommunicatiewetgeving en de Europese Algemene Verordening Gegevensbescherming (AVG/GDPR).
          </p>

          <h2>1. Wat zijn cookies en vergelijkbare technologieën?</h2>
          <p>
            Cookies zijn kleine, eenvoudige tekstbestandjes die uw computer, tablet of smartphone opslaat wanneer u onze website bezoekt. Ze zorgen er bijvoorbeeld voor dat de website goed functioneert en dat u bij een volgend bezoek wordt herkend.
          </p>
          <p>Naast "klassieke" cookies maken wij ook gebruik van <strong>Local Storage</strong>. Dit is een moderne browsertechnologie die in de basis hetzelfde doet als een cookie, maar waarbij gegevens direct lokaal in uw eigen browser worden bewaard. We gebruiken de term 'cookies' in dit beleid als verzamelnaam voor al deze vergelijkbare technologieën.</p>

          <h2>2. Hoelang blijven cookies bewaard?</h2>
          <p>Cookies hebben een vervaldatum. We maken onderscheid tussen twee soorten:</p>
          <ul>
            <li><strong>Sessiecookies:</strong> Deze worden tijdelijk opgeslagen en direct verwijderd zodra u uw browser of het tabblad afsluit.</li>
            <li><strong>Permanente cookies:</strong> Deze blijven op uw apparaat staan totdat de vooraf ingestelde vervaldatum is verstreken, of totdat u ze zelf handmatig verwijdert via uw browserinstellingen.</li>
          </ul>

          <h2>3. Welke cookies gebruiken wij precies?</h2>
          
          <div className="mt-6 space-y-6">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mt-0 text-lg font-black text-neutral-950">A. Strikt noodzakelijke (essentiële) cookies</h3>
              <p className="mb-0 mt-2 text-xs text-neutral-500">Toestemming vereist: Nee</p>
              <p className="text-sm">
                Deze cookies en lokale opslag zijn technisch noodzakelijk om de website goed te laten werken. Ze onthouden bijvoorbeeld de wagens die u in uw vergelijkingslijst heeft gezet, uw favoriete zoekfilters en of u wel of niet akkoord bent gegaan met bepaalde andere cookies. Zonder deze technologieën is het niet mogelijk om de website correct te gebruiken, vandaar dat u deze niet kunt weigeren.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mt-0 text-lg font-black text-neutral-950">B. Analytische cookies (Performance)</h3>
              <p className="mb-0 mt-2 text-xs text-neutral-500">Toestemming vereist: Ja (indien actief)</p>
              <p className="text-sm">
                Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken. Door anoniem gegevens te verzamelen en te rapporteren (bijvoorbeeld hoe lang men op een voertuigpagina blijft, of tegen welke foutmeldingen men aanloopt), kunnen we onze website en het aanbod blijven optimaliseren voor de beste gebruikerservaring.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mt-0 text-lg font-black text-neutral-950">C. Externe diensten (Derde partijen / Marketing)</h3>
              <p className="mb-0 mt-2 text-xs text-neutral-500">Toestemming vereist: Ja</p>
              <p className="text-sm">
                Sommige functionaliteiten op onze website maken gebruik van diensten van derden. Het belangrijkste voorbeeld hiervan is <strong>Google Maps</strong> voor de weergave van onze interactieve routekaart. Bedrijven zoals Google kunnen via deze integraties eigen cookies plaatsen om uw surfgedrag over verschillende websites heen te volgen. Wij laden deze kaarten en bijbehorende cookies pas <strong>nádat u daar uitdrukkelijk toestemming voor heeft gegeven</strong>.
              </p>
            </div>
          </div>

          <h2>4. Uw toestemming beheren (Voorkeuren wijzigen)</h2>
          <p>
            U bent de baas over uw eigen gegevens. Bij uw eerste bezoek aan onze website hebben we u gevraagd om uw cookievoorkeuren op te geven. Heeft u zich bedacht? Dan kunt u deze te allen tijde eenvoudig aanpassen of intrekken via het onderstaande privacypaneel.
          </p>
          
          <div className="not-prose my-8 rounded-xl bg-neutral-50 p-6 text-center border border-neutral-200">
            <h3 className="text-base font-black text-neutral-950">Pas uw instellingen aan</h3>
            <p className="mt-2 text-sm text-neutral-600 mb-6">Klik op de onderstaande knop om het voorkeurenvenster opnieuw te openen en uw keuzes direct te overschrijven.</p>
            <div className="inline-block [&>button]:flex [&>button]:h-12 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-md [&>button]:bg-neutral-950 [&>button]:px-8 [&>button]:text-xs [&>button]:font-bold [&>button]:text-white [&>button]:transition hover:[&>button]:bg-neutral-800">
              <CookieSettingsButton />
            </div>
          </div>

          <h2>5. Cookies uitschakelen of verwijderen via uw browser</h2>
          <p>
            Naast onze eigen instellingen, kunt u er ook voor kiezen om cookies in zijn geheel te blokkeren of te verwijderen via de instellingen van uw internetbrowser. Wees er echter van bewust dat wanneer u alle cookies (inclusief essentiële cookies) blokkeert in uw browser, sommige onderdelen van onze website (zoals het bewaren van wagens) mogelijk niet meer correct functioneren.
          </p>
          <p>Meer informatie omtrent het in- en uitschakelen en het verwijderen van cookies vindt u in de instructies en/of met behulp van de Help-functie van uw specifieke browser (zoals Google Chrome, Safari, Firefox of Microsoft Edge).</p>

          <h2>6. Vragen of meer informatie?</h2>
          <p>
            Heeft u na het lezen van dit cookiebeleid nog vragen? Dan kunt u uiteraard altijd contact met ons opnemen. Voor meer informatie over hoe wij in het algemeen met uw persoonsgegevens omgaan, en welke rechten u heeft, verwijzen wij u graag naar ons <a href="/privacybeleid">Privacybeleid</a>.
          </p>
          <p>
            <strong>{siteGegevens.name}</strong><br />
            {siteGegevens.address}<br />
            E-mail: <a href={`mailto:${siteGegevens.email}`}>{siteGegevens.email}</a><br />
            Tel: {siteGegevens.phoneNumber}
          </p>
        </div>
      </div>
    </main>
  );
}

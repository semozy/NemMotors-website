import { CookieSettingsButton } from "@/components/privacy/CookieConsent";

export const metadata = {
  title: "Cookiebeleid",
  description: "Lees meer over hoe NEM Motors cookies gebruikt.",
};

export default function CookiebeleidPage() {
  return (
    <main className="bg-[#f8f9f9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-7 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Cookiebeleid</h1>
        <p className="mt-2 text-sm text-neutral-500">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}</p>
        
        <div className="prose prose-sm mt-10 max-w-none text-neutral-700 prose-headings:font-black prose-headings:text-neutral-950 prose-a:text-neutral-950">
          <h2>1. Wat zijn cookies?</h2>
          <p>Cookies zijn kleine tekstbestandjes die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze helpen de website om uw apparaat te herkennen en bepaalde informatie te onthouden (bijv. uw taalkeuze of opgeslagen voertuigen).</p>

          <h2>2. Welke cookies gebruiken wij?</h2>
          <h3>Essentiële (noodzakelijke) opslag</h3>
          <p>Deze zijn nodig om de basisfuncties van de website te laten werken, zoals het opslaan van uw cookievoorkeur, uw vergelijkingslijst en uw favoriete wagens. Hiervoor gebruiken we de lokale opslag (localStorage) van uw browser. Omdat deze strikt noodzakelijk zijn, kunnen ze niet worden uitgeschakeld.</p>

          <h3>Externe diensten (Marketing & Analyse)</h3>
          <p>Onze website maakt gebruik van externe diensten, specifiek <strong>Google Maps</strong> voor de interactieve routekaart. Google Maps kan cookies plaatsen om uw locatiegegevens en surfgedrag te verwerken volgens hun eigen privacybeleid.</p>
          <p>Wij laden deze externe diensten <strong>enkel nadat u daar expliciet toestemming voor heeft gegeven</strong> via onze cookiebanner of direct op de kaart.</p>

          <h2>3. Uw toestemming beheren</h2>
          <p>U bent altijd in controle. U kunt uw voorkeuren op elk moment wijzigen via de knop hieronder:</p>
          <div className="not-prose my-6">
            <span className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-5 text-xs font-bold text-white transition hover:bg-neutral-800 [&>button]:h-full [&>button]:w-full">
              <CookieSettingsButton />
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}


import { siteGegevens } from "@/components/layout/Footer";

export const metadata = {
  title: "Algemene Voorwaarden",
  description: "Algemene voorwaarden van NEM Motors.",
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="bg-[#f8f9f9] py-16 text-neutral-950 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-7 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Algemene Voorwaarden</h1>
        <p className="mt-2 text-sm text-neutral-500">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE")}</p>
        
        <div className="prose prose-sm mt-10 max-w-none text-neutral-700 prose-headings:font-black prose-headings:text-neutral-950 prose-a:text-neutral-950">
          <h2>1. Bedrijfsgegevens</h2>
          <p>
            <strong>Naam:</strong> {siteGegevens.name}<br />
            <strong>Adres:</strong> {siteGegevens.address}<br />
            <strong>Ondernemingsnummer / BTW:</strong> {siteGegevens.vatNumber || "In aanvraag"}<br />
            <strong>E-mail:</strong> <a href={`mailto:${siteGegevens.email}`}>{siteGegevens.email}</a><br />
            <strong>Telefoon:</strong> {siteGegevens.phoneNumber}
          </p>

          <h2>2. Aanbod en Prijzen</h2>
          <p>Alle voertuigen en prijzen op deze website worden met de grootste zorg weergegeven, maar zijn vrijblijvend en informatief. Fouten in de specificaties of prijsweergave binden {siteGegevens.name} niet. Prijzen zijn inclusief BTW tenzij anders vermeld.</p>

          <h2>3. Reserveringen en Aankoop</h2>
          <p>Een aanvraag via de website vormt geen bindende koopovereenkomst. De uiteindelijke koop en levering van een voertuig gebeurt altijd na ondertekening van een fysieke koopovereenkomst in onze garage.</p>

          <h2>4. Inruil</h2>
          <p>Voorstellen voor inruilwagens via de website zijn louter indicatief. Een definitieve overnameprijs wordt pas vastgesteld na een fysieke expertise van het voertuig op onze locatie.</p>

          <h2>5. Aansprakelijkheid website</h2>
          <p>{siteGegevens.name} streeft ernaar de website continu beschikbaar te houden, maar kan niet aansprakelijk worden gesteld voor eventuele storingen, fouten, of schade voortvloeiend uit het gebruik van deze website of externe links (zoals Google Maps).</p>

          <h2>6. Toepasselijk Recht</h2>
          <p>Op deze voorwaarden is het Belgisch recht van toepassing. Bij eventuele geschillen zijn enkel de rechtbanken van het arrondissement bevoegd waar de maatschappelijke zetel van {siteGegevens.name} is gevestigd.</p>
        </div>
      </div>
    </main>
  );
}


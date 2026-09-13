import JuridischePagina from "@/components/JuridischePagina";

export const metadata = { title: "Cookiebeleid", description: "Informatie over cookies op de website van NEM Motors." };

export default function CookiebeleidPage() {
  return <JuridischePagina title="Cookiebeleid" intro="Deze website gebruikt momenteel geen analytische of marketingcookies.">
    <section><h2>Noodzakelijke techniek</h2><p>De website kan strikt noodzakelijke technische gegevens verwerken om pagina&apos;s veilig en correct te leveren. Hiervoor is geen marketingprofiel nodig.</p></section>
    <section><h2>Externe websites</h2><p>Links naar onder meer WhatsApp en Google Maps openen een externe website. Vanaf dat moment geldt het cookie- en privacybeleid van die aanbieder. Externe inhoud wordt op deze website niet automatisch geladen.</p></section>
    <section><h2>Wijzigingen</h2><p>Als later statistieken, marketingdiensten of andere niet-noodzakelijke cookies worden toegevoegd, wordt dit beleid aangepast en vragen we vooraf toestemming waar dat verplicht is.</p></section>
  </JuridischePagina>;
}

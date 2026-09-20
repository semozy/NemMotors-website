"use server";

import { getCars } from "@/lib/cars";
import { siteGegevens } from "@/components/layout/Footer";

export async function askAssistant(message) {
  // Simulate a slight network delay to feel like an AI is thinking
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

  const text = message.toLowerCase();
  const cars = await getCars();

  // 1. GREETINGS
  if (/^(hallo|hoi|hey|goeiemorgen|goeiedag|goedenavond)/i.test(text)) {
    return "Hallo! Hoe kan ik je vandaag helpen bij NEM Motors?";
  }

  // 2. STOCK / BRANDS (Voorraad & Merken)
  const brands = [...new Set(cars.map(c => c.brand.toLowerCase()))];
  
  // Controleer of de gebruiker naar een specifiek merk vraagt dat in stock is
  for (const brand of brands) {
    if (text.includes(brand)) {
      const brandCars = cars.filter(c => c.brand.toLowerCase() === brand);
      if (brandCars.length === 1) {
        const car = brandCars[0];
        return `Ja hoor! We hebben momenteel 1 ${car.brand} op voorraad: de ${car.brand} ${car.model} (${car.year}). Je vindt alle details en foto's op onze aanbod-pagina!`;
      } else {
        const modelsList = brandCars.map(c => c.model).join(", ");
        return `Zeker weten! We hebben momenteel ${brandCars.length} ${brandCars[0].brand}'s op voorraad. Modellen: ${modelsList}. Neem snel een kijkje bij ons aanbod!`;
      }
    }
  }

  // Controleer op populaire merken die NIET in stock zijn
  const popularBrands = ["audi", "bmw", "mercedes", "volkswagen", "vw", "porsche", "peugeot", "renault", "opel", "ford", "toyota", "volvo"];
  for (const pBrand of popularBrands) {
    if (text.includes(pBrand)) {
      return `Momenteel hebben we helaas geen ${pBrand.toUpperCase()} op voorraad. Ons aanbod wisselt echter snel! Hou onze website in de gaten of neem contact op met je wensen.`;
    }
  }

  // Algemene voorraad vraag
  if (text.includes("voorraad") || text.includes("aanbod") || text.includes("welke auto")) {
    return `We hebben momenteel ${cars.length} betrouwbare tweedehandswagens op voorraad, direct uit voorraad leverbaar. Ga naar 'Aanbod' in het menu om ze allemaal te bekijken!`;
  }

  // 3. PROEFRIT (Testrit)
  if (text.includes("proefrit") || text.includes("testrit") || text.includes("testen")) {
    return "Een proefrit plannen is super makkelijk! Ga gewoon naar de auto die je leuk vindt in ons aanbod, en klik op de knop 'Plan een proefrit'. Kies je favoriete moment en wij zetten de koffie (en de auto) voor je klaar.";
  }

  // 4. INRUILEN / OVERNAME
  if (text.includes("inruil") || text.includes("overname") || text.includes("mijn auto verkopen")) {
    return "Ja, wij nemen graag je huidige wagen over! Op de detailpagina van de auto die je wilt kopen, kun je via de knop 'Interesse' aangeven dat je een inruilvoorstel wenst. Wij bezorgen je dan een eerlijke overnameprijs.";
  }

  // 5. OPENINGSUREN & LOCATIE
  if (text.includes("open") || text.includes("uur") || text.includes("wanneer")) {
    return `Onze openingsuren zijn:\nMa t/m Za: 10:00 - 18:00\nZondag: 10:00 - 15:00\nKom gerust langs, we zijn open!`;
  }
  
  if (text.includes("waar") || text.includes("locatie") || text.includes("adres")) {
    return `Je vindt ons op volgend adres: ${siteGegevens.address}. Spring gerust eens binnen!`;
  }

  // 6. FINANCIERING
  if (text.includes("financiering") || text.includes("lenen") || text.includes("krediet")) {
    return "Voor financiering werken we samen met gespecialiseerde partners. Neem even contact met ons op via telefoon of e-mail, dan bekijken we samen de mogelijkheden voor jouw nieuwe wagen.";
  }

  // 7. CONTACT / TELEFOON
  if (text.includes("bellen") || text.includes("telefoon") || text.includes("contact") || text.includes("email")) {
    return `Je kan ons bellen of WhatsAppen op ${siteGegevens.phoneNumber}, of een mailtje sturen naar ${siteGegevens.email}. We helpen je met plezier verder!`;
  }

  // DEFAULT
  return "Goede vraag! Ik ben nog aan het leren, dus ik kan dit niet met 100% zekerheid beantwoorden. Je kan ons altijd bellen op +32 473 56 34 04 of een berichtje sturen via de contactpagina voor een direct antwoord van ons team!";
}


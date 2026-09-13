import PaginaTitel from "@/components/PaginaTitel";
import Sectie from "@/components/Sectie";
import VeelgesteldeVragen from "@/components/VeelgesteldeVragen";
import { faqs } from "@/lib/veelgestelde-vragen";

export const metadata = {
  title: "FAQ",
  description: "Veelgestelde vragen over aankoop, verkoop, proefritten en contact.",
};

export default function VeelgesteldeVragenPage() {
  return (
    <>
      <PaginaTitel title="FAQ" subtitle="Veelgestelde vragen over aankoop, verkoop, proefritten en contact." />
      <Sectie>
        <VeelgesteldeVragen faqs={faqs} />
      </Sectie>
    </>
  );
}

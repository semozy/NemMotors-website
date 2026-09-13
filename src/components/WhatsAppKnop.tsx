import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export default function WhatsAppKnop() {
  return (
    <a
      href={whatsappLink("Hallo NEM Motors, ik heb een vraag over jullie wagens.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-950/50 transition hover:scale-110"
      aria-label="WhatsApp NEM Motors"
    >
      <MessageCircle />
    </a>
  );
}

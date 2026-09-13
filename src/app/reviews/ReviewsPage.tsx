import ReviewKaart from "@/components/ReviewKaart";
import Sectie from "@/components/Sectie";
import { reviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews",
  description: "Lees reviews van klanten van NEM Motors.",
};

export default function ReviewsPage() {
  return (
    <div className="bg-white text-neutral-950">
      <Sectie className="py-14">
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-700">Reviews</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Wat klanten zeggen</h1>
          </div>

          <p className="max-w-sm text-sm leading-6 text-neutral-600">Persoonlijke ervaringen van klanten die door NEM Motors zijn aangeleverd.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewKaart key={`${review.name}-${review.text}`} review={review} />
          ))}
        </div>
      </Sectie>
    </div>
  );
}

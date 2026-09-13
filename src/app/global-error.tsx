"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nl">
      <body>
        <main className="min-h-screen bg-white px-4 py-16 font-sans text-slate-950">
          <section className="mx-auto flex max-w-2xl flex-col items-start gap-5 rounded-lg border border-slate-200 p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle aria-hidden="true" className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">De site kon niet laden</h1>
              <p className="text-sm leading-6 text-slate-600">
                Er liep iets fout tijdens het laden van de pagina. Probeer opnieuw of ga terug naar de homepage.
              </p>
              {error.digest ? (
                <p className="text-xs text-slate-500">Foutcode: {error.digest}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-md bg-[#ffc20e] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e6ad00]"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Opnieuw proberen
              </button>
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-slate-950"
              >
                Naar homepage
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}

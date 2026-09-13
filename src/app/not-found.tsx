import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-white px-4 py-16 text-slate-950">
      <section className="mx-auto flex max-w-2xl flex-col items-start gap-5 rounded-lg border border-slate-200 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#b38300]">404</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Pagina niet gevonden</h1>
          <p className="text-sm leading-6 text-slate-600">
            Deze pagina bestaat niet of is verplaatst. Je kunt terug naar de homepage of meteen het aanbod bekijken.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-[#ffc20e] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e6ad00]"
          >
            Naar homepage
          </Link>
          <Link
            href="/voorraad"
            className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-slate-950"
          >
            Bekijk aanbod
          </Link>
        </div>
      </section>
    </main>
  );
}

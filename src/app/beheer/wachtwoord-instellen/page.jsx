import AdminPasswordSetup from "@/components/admin/AdminPasswordSetup";

export const metadata = { title: "Beheerwachtwoord instellen", robots: { index: false, follow: false } };

export default function AdminPasswordSetupPage() {
  return (
    <main className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-[#f4f5f5] px-5 py-14 text-neutral-950">
      <section className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">NEM Motors beheer</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em]">Wachtwoord instellen</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">Kies een uniek wachtwoord van minimaal twaalf tekens.</p>
        <AdminPasswordSetup />
      </section>
    </main>
  );
}

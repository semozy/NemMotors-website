import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { adminCookieName, isValidAdminSessionToken } from "@/lib/admin-auth";

export const metadata = { title: "Beheerlogin", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const token = (await cookies()).get(adminCookieName)?.value;
  if (await isValidAdminSessionToken(token)) redirect("/beheer/wagens");
  return (
    <main className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-[#f4f5f5] px-5 py-14 text-neutral-950">
      <section className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">NEM Motors beheer</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em]">Veilig inloggen</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">Log in met uw persoonlijke beheeraccount. De beveiligde sessie verloopt automatisch.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}

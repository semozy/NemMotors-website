import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Car, MessageSquare, TrendingUp, AlertCircle, Users } from "lucide-react";
import { adminCookieName, isValidAdminSessionToken } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "Dashboard - NEM Motors", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BeheerPage() {
  const token = (await cookies()).get(adminCookieName)?.value;
  if (!(await isValidAdminSessionToken(token))) redirect("/beheer/login");

  const supabase = createAdminSupabaseClient();
  
  // Fetch vehicles
  const { data: vehicles } = await supabase.from("vehicles").select("id, status, updated_at");
  const online = vehicles?.filter(v => v.status === "beschikbaar")?.length || 0;
  
  // Sold this month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const soldThisMonth = vehicles?.filter(v => v.status === "verkocht" && v.updated_at >= firstDayOfMonth)?.length || 0;

  // Fetch open requests
  const { count: openTestDrives } = await supabase.from("test_drive_requests").select("id", { count: "exact" }).eq("status", "nieuw");
  const { count: openContact } = await supabase.from("contact_requests").select("id", { count: "exact" }).eq("status", "nieuw");
  const { count: openSell } = await supabase.from("sell_requests").select("id", { count: "exact" }).eq("status", "nieuw");
  
  const totalOpenRequests = (openTestDrives || 0) + (openContact || 0) + (openSell || 0);

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#f4f5f5] text-neutral-950">
      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">NEM Motors beheer</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/beheer/wagens" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50"><Car className="h-4 w-4" />Wagenaanbod</Link>
            <Link href="/beheer/aanvragen" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50"><MessageSquare className="h-4 w-4" />Aanvragen</Link>
            <Link href="/beheer/accounts" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50"><Users className="h-4 w-4" />Accounts</Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-500">Auto's online</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Car className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 text-4xl font-black">{online}</p>
            <p className="mt-2 text-xs font-medium text-neutral-400">Beschikbaar op de website</p>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-500">Verkocht deze maand</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 text-4xl font-black">{soldThisMonth}</p>
            <p className="mt-2 text-xs font-medium text-neutral-400">Op basis van status wijzigingen</p>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-500">Openstaande aanvragen</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600"><AlertCircle className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 text-4xl font-black">{totalOpenRequests}</p>
            <p className="mt-2 text-xs font-medium text-neutral-400">Nieuwe berichten en proefritten</p>
          </div>
        </div>
        
        <div className="mt-12 text-center text-xs text-neutral-400">
          Kies bovenaan een categorie om wagens of aanvragen te beheren.
        </div>
      </div>
    </main>
  );
}

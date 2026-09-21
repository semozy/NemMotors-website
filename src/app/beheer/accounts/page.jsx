import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Car, MessageSquare, ArrowLeft, Users } from "lucide-react";
import { adminCookieName, getAuthorizedAdmin } from "@/lib/admin-auth";
import LogoutButton from "@/components/admin/LogoutButton";
import AccountManager from "@/components/admin/AccountManager";

import PasswordChanger from "@/components/admin/PasswordChanger";

export const metadata = { title: "Accounts - NEM Motors beheer", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AccountsPage() {
  const token = (await cookies()).get(adminCookieName)?.value;
  const admin = await getAuthorizedAdmin(token);
  if (!admin) redirect("/beheer/login");

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#f4f5f5] text-neutral-950">
      <div className="mx-auto max-w-[1000px] px-5 py-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/beheer" className="mb-2 flex w-max items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950"><ArrowLeft className="h-3 w-3" />Terug naar dashboard</Link>
            <h1 className="text-3xl font-black tracking-[-0.04em]">Accounts</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/beheer/wagens" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50"><Car className="h-4 w-4" />Wagenaanbod</Link>
            <Link href="/beheer/aanvragen" className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50"><MessageSquare className="h-4 w-4" />Aanvragen</Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          <PasswordChanger />
          <AccountManager currentUserEmail={admin.email} />
        </div>
      </div>
    </main>
  );
}


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VehicleManager from "@/components/admin/VehicleManager";
import { adminCookieName, isValidAdminSessionToken } from "@/lib/admin-auth";

export const metadata = { title: "Wagenbeheer", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function VehicleAdminPage() {
  const token = (await cookies()).get(adminCookieName)?.value;
  if (!(await isValidAdminSessionToken(token))) redirect("/beheer/login");
  return <main className="min-h-[calc(100vh-70px)] bg-[#f4f5f5] text-neutral-950"><VehicleManager /></main>;
}

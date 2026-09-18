"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/beheer/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={logout} className="flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-xs font-bold text-white hover:bg-neutral-800">
      <LogOut className="h-4 w-4" />
      Uitloggen
    </button>
  );
}


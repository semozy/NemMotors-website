"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Inloggen mislukt.");
      router.push("/beheer/wagens");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <label className="block text-xs font-bold text-neutral-700">E-mailadres
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-100" />
      </label>
      <label className="block text-xs font-bold text-neutral-700">Wachtwoord
        <span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="h-11 w-full rounded-md border border-neutral-300 pl-10 pr-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-100" /></span>
      </label>
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-60">{loading ? "Bezig met inloggen…" : "Inloggen"}<ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}
